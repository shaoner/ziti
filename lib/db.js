'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var Promise = require('bluebird');
var util = require('util');
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

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
 * @external Model
 * @see {@link /api/model}
 */

/**
 * @constructor

 */
var Db = function () {
    this._config = { };
    this._pool = null;
    this.manager = new ModelManager(this);
};

/**
 * Configure the mysql handler by creating the connection pool.
 * Of course you cannot query the database if ziti is not configured.
 * @param {Object} [config] - The MySQL config
 * @param {string} [config.host=localhost] - The hostname of the database you are connecting to
 * @param {Number} [config.port=3306] - The port number to connect to
 * @param {string} [config.user] - The MySQL user to authenticate as
 * @param {string} [config.password] - The password of that MySQL user
 * @param {string} [config.database] - The database to use for the connection
 * @see {@link https://github.com/felixge/node-mysql#connection-options|Node MySQL connection options}
 * @example
 * var ziti = require('ziti');
 * // You can define models before configuring ziti
 * var User = ziti.define('User', {
 *     name: ziti.String,
 *     photos: [ 'Photo' ]
 * });
 * ziti.configure({ host: 'localhost', user: 'root', database: 'test' });
 * // Or after
 * var Photo = ziti.define('Photo', {
 *     path: ziti.String().unique()
 * });
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
 * @example
 * ziti.sync({ dropTable: true, createTable: true, autoMigrate: false })
 *    .then(function (models) {
 *        models.forEach(function (modelName) {
 *            console.log('* %s Model has been synchronized', modelName);
 *        });
 *    });
 * // * User Model has been synchronized
 * // * Photo Model has been synchronized
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
 * Create a new Model
 * @param {string} name - The name of the model
 * @param {Object} core - core of the model in the form { fieldName: fieldType }
 * @param {Object} [options]
 * @param {boolean} [options.createTable=true] - Create the table during synchronization
 * @param {string} [options.tableName] - Name of the table, by default the name of the model in [snakeCase](https://lodash.com/docs#snakeCase)
 * @param {string} [options.engine=InnoDB] - Engine to use when creating the table
 * @param {(string|boolean)} [options.autoId=true] - Create a primary key auto increment 'id' pr using the provided field name
 * @returns {external:Promise}
 * @example
 * var User = ziti.define('User', {
 *    email: ziti.String().unique().notNull(),
 *    password: ziti.Varbinary(16).notNull(),
 *    age: ziti.Int,
 *    fullname: ziti.String,
 *    photos: [ Photo ]
 * }, { autoId: 'user_id', engine: 'InnoDb', tableName: 'user' });
 */
Db.prototype.define = function (name, core, options) {
    return new Model(this, name, core, options);
};

/**
 * Get a Model from its name
 * @param {string} name - Name of the model
 * @returns {external:Model}
 */
Db.prototype.get = function (name) {
    return this.manager._models[name];
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
Db.prototype._getConnection = function () {
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
Db.prototype._getTx = function () {
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
    return Promise.using(this._getConnection(), fn);
};

/**
 * Provide a transaction from the pool to the callback starting a transaction.
 * It commits the change when the callback returns.
 * If something goes wrong in the callback (exception or a promise rejected), it rollbacks instead.
 * @param {Function} fn - The callback
 * @returns {external:Promise}
 * @example
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
 */
Db.prototype.withTx = function (fn) {
    return Promise.using(this._getTx(), function (tx) {
        return tx.beginTransactionAsync().return(fn(tx));
    });
};

/**
 * Send a SQL query
 * @param {(Array.<*>|Object|string)} query - The query
 * @param {string} query.sql - A query with parameters defined as ?
 * @param {Array.<*>} query.values - An array of values to pass
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 * @example
 * ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? = ?', values: [ 'id', 'user', 'id', 42 ] });
 * // SELECT `id` FROM `user` WHERE `id` = 42
 *
 * ziti.query({ sql: 'INSERT INTO ?? SET ?', values: [ 'user', { name: 'Heisenberg', age: 42 } ] });
 * // INSERT INTO `user` SET `name` = 'Heisenberg', `age` = 42
 *
 * ziti.query('SELECT id FROM `user` WHERE `id` = 42');
 * // SELECT `id` FROM `user` WHERE `id` = 42
 *
 * ziti.query([ 'SELECT ?? FROM ?? WHERE ?? = ?', 'id', 'user', 'id', 42 ]);
 * // SELECT `id` FROM `user` WHERE `id` = 42
 */
Db.prototype.query = function (q, options) {
    if (_.isArray(q)) {
        q = { sql: q.shift(), values: q };
    }
    if (options && options.using) {
        return options.using.queryAsync(q);
    }
    return Promise.using(this._getConnection(), function (connection) {
        return connection.queryAsync(q);
    });
};

/**
 * Add a static method global to all models
 * @name statics
 * @memberof Db.prototype
 */
Object.defineProperty(Db.prototype, 'statics', {
    get: function () { return this.manager._statics; }
});

/**
 * Add a method global to all model instances
 * @name methods
 * @memberof Db.prototype
 */
Object.defineProperty(Db.prototype, 'methods', {
    get: function () { return this.manager._methods; }
});

/**
 * Add a static method global to all models
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 * @deprecated since version 0.1.0, use `ziti.statics.name = fn`
 */
Db.prototype.setStatic = util.deprecate(function (name, fn) {
    this.manager._statics[name] = fn;
}, 'ziti.setStatic: Use `ziti.statics.name = fn` instead');

/**
 * Add a method global to all model instances
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 * @deprecated since version 0.1.0, use `ziti.methods.name = fn`
 */
Db.prototype.setMethod = util.deprecate(function (name, fn) {
    this.manager._methods[name] = fn;
}, 'ziti.setMethod: Use `ziti.methods.name = fn` instead');

/**
 * Create a new connection.
 * This is helpful when dealing with multiple databases.<br>
 * *Note that you cannot use a reference (one, many or foreignkey) to a Model from another database.*
 * @param {Object} [config] - The MySQL config
 * @param {string} [config.host=localhost] - The hostname of the database you are connecting to
 * @param {Number} [config.port=3306] - The port number to connect to
 * @param {string} [config.user] - The MySQL user to authenticate as
 * @param {string} [config.password] - The password of that MySQL user
 * @param {string} [config.database] - The database to use for the connection
 * @see {@link https://github.com/felixge/node-mysql#connection-options|Node MySQL connection options}
 * @returns {Db}
 * @example
 * var db = ziti.create({ host: 'localhost', user: 'root', database: 'test' });
 * var User = db.define('User', {
 *     name: ziti.String
 * });
 */
Db.prototype.create = function (config) {
    var db = new Db();
    if (config) {
        db.configure(config);
    }
    return db;
};

module.exports = Db;
