'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var Promise = require('bluebird');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var QueryBuilder = require('./query-builder');
var ModelManager = require('./model-manager');
var Model = require('./model');

/**
 * @external Promise
 * @see {@link https://github.com/petkaantonov/bluebird}
 */

/**
 * @external PoolConnection
 * @see {@link https://github.com/felixge/node-mysql#pooling-connections}
 */

/**
 * @constructor
 * @alias ziti
 */
var Db = function () {
    this._config = { };
    this._pool = null;
    this.manager = new ModelManager(this);
    this._statics = { };
    this._methods = { };
};

/**
 * Configure the mysql handler by creating the connection pool
 * @param {Object} [config] - The MySQL config
 * @param {string} [config.host=localhost] - The hostname of the database you are connecting to
 * @param {Number} [config.port=3306] - The port number to connect to
 * @param {string} [config.user] - The MySQL user to authenticate as
 * @param {string} [config.password] - The password of that MySQL user
 * @param {string} [config.database] - The database to use for the connection
 * @see {@link https://github.com/felixge/node-mysql#connection-options|Node MySQL connection options}
 */
Db.prototype.configure = function (config) {
    _.assign(this._config, config);
    this._pool = mysql.createPool(this._config);
};

/**
 * Synchronizes models with the database
 * @param {Object} [options]
 * @param {boolean} [options.autoCreateModels=true]
 * Create models automatically when used as a reference dependency
 * (useful for many to many relationships)
 * @param {boolean} [options.dropTable=false] - Drop all model tables
 * @param {boolean} [options.createTable=true] - Create all model tables
 * @param {boolean} [options.autoMigrate.addColumns=true] Add missing table columns
 * @param {boolean} [options.autoMigrate.delColumns=false] - Remove missing table columns
 * @returns {external:Promise}
 */
Db.prototype.sync = function (options) {
    options = _.assign({
        autoCreateModels: true,
        dropTable: false,
        createTable: true,
        autoMigrate: { addColumns: true, delColumns: false },
    }, options);
    return this.manager.sync(options);
};

/**
 * End all connections
 * @returns {external:Promise}
 */
Db.prototype.end = function () {
    return this._pool.endAsync();
};

/**
 * Get a connection from the pool
 * @private
 * @returns {external:Promise}
 */
Db.prototype.getConnection = function () {
    return this._pool.getConnectionAsync()
        .disposer(function(connection, promise) {
            connection.release();
        });
};

/**
 * Get a connection from the pool and start a transaction
 * @private
 * @returns {external:Promise}
 */
Db.prototype.getTx = function () {
    return this._pool.getConnectionAsync()
        .disposer(function(tx, promise) {
            var p = promise.isFulfilled() ? tx.commitAsync() : tx.rollbackAsync();
            return p.finally(function () { tx.release(); });
        });
};

/**
 * Provide a connection from the pool to the callback
 * @param {Function} fn - The callback
 * @returns {external:Promise}
 */
Db.prototype.withConnection = function (fn) {
    return Promise.using(this.getConnection(), fn);
};

/**
 * Provide a transaction from the pool to the callback starting a transaction.
 * It commits the change when the callback returns.
 * If something goes wrong in the callback (exception or a promise rejected), it rollbacks instead.
 * @example
 * ```javascript
 * ziti.withTx(function (tx) {
 *   return ziti.query('INSERT INTO Animal SET `type` = \'cat\'', { using: tx })
 *     .then(function () {
 *       return ziti.query('INSERT INTO Animal SET `type` = \'dog\'', { using: tx })
 *     });
 * }).then(function () {
 *   console.log('Animals have been inserted!');
 * });
 * // START TRANSACTION
 * // INSERT INTO Animal SET `type` = 'cat'
 * // INSERT INTO Animal SET `type` = 'dog'
 * // COMMIT
 * // Animals have been inserted!
 * ```
 * @param {Function} fn - The callback
 * @returns {external:Promise}
 */
Db.prototype.withTx = function (fn) {
    return Promise.using(this.getTx(), function (tx) {
        return tx.beginTransactionAsync().return(fn(tx));
    });
};

/**
 * Send a SQL query
 * @example
 * ```javascript
 * ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? = ?', values: [ 'id', 'user', 'id', 42 ] });
 * // SELECT `id` FROM `user` WHERE `id` = 42
 * ziti.query({ sql: 'INSERT INTO ?? SET ??', values: [ 'user', { name: 'Heisenberg', age: 42 } ] });
 * // INSERT INTO `user` SET `name` = 'Heisenberg', `age` = 42
 * ```
 * @param {Object|string} query - The query
 * @param {string} query.sql - A query with parameters defined as ?
 * @param {Array.<*>} query.values - An array of values to pass
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Db.prototype.query = function (q, options) {
    if (options && options.using) {
        return options.using.queryAsync(q);
    }
    return Promise.using(this.getConnection(), function (connection) {
        return connection.queryAsync(q);
    });
};

/**
 * Create a new Model
 * @param {string} name - The name of the model
 * @param {Object} core - core of the model in the form { fieldName: fieldType }
 * @param {Object} [options]
 * @param {boolean} [options.createTable=true] - Create the table during synchronization
 * @param {string} [options.tableName] - Name of the table, by default the name of the model in [snakeCase](https://lodash.com/docs#snakeCase)
 * @param {string} [options.engine=InnoDB] - Engine to use when creating the table
 * @param {(string|boolean)} [options.autoId=true] - Create a primary key auto increment 'id' pr using the provided field name
 * @returns {external:Promise}
 */
Db.prototype.define = function (name, core, options) {
    return new Model(this, name, core, options);
};

/**
 * Add a static method global to all models
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 */
Db.prototype.setStatic = function (name, fn) {
    this.manager.setStatic(name, fn);
};

/**
 * Add a method global to all model instances
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 */
Db.prototype.setMethod = function (name, fn) {
    this.manager.setMethod(name, fn);
};

/**
 * Get a Model from its name
 * @param {string} name - Name of the model
 * @returns {Model}
 */
Db.prototype.get = function (name) {
    return this.manager._models[name];
};

module.exports = Db;
