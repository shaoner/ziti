'use strict';

var _ = require('lodash');
var QueryToSql = require('./query-to-sql');

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
 * @see {@link /api/model/}
 */

/**
 * @constructor
 */
var Query = function (model) {
    this._connection = null;
    this._model = model;
    this._callback = null;
    this._table = model._table;
    this._name = model._name;
    this._sqlFunction = null;
    this._thisArg = null;
    this._where = null;
    this._limit = null;
    this._asc = [ ];
    this._desc = [ ];
    this._scope = '__default__';
    this._attributes = null;
    this._fields = { };
    this._joins = [ ];
    this._column = null;
};

/**
 * Select only the provided list of attributes.
 * This overrides any scope
 * @param {...string} [attributes] - Attributes to select
 * @returns {Query} this
 * @example
 * User.at({ id: 42 }).only('name', 'age')
 *     .then(function (user) {
 *         // SELECT `User`.`name`, `User`.`age` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.only = function () {
    if (arguments.length > 0) {
        if (_.isArray(arguments[0])) {
            this._attributes = arguments[0];
        } else {
            this._attributes = Array.prototype.slice.call(arguments);
        }
    }
    return this;
};

/**
 * Set the scope of the query, so it selects only attributes within the scope
 * @param {string} scope - The scope to choose
 * @returns {Query} this
 * @example
 * var User = ziti.define('User', {
 *    id: ziti.Int().primaryKey().autoIncrement().$([ 'account', 'profile' ]),
 *    username: ziti.String().$('profile'),
 *    age: ziti.Int(),
 *    sex: ziti.Enum('M', 'F').$('profile'),
 *    email: ziti.String().$('account')
 * });
 *
 * User.at({ age: { $ge: 18 } }).$('profile')
 *    .then(function (user) {
 *        // SELECT `User`.`id`, `User`.`username`, `User`.`sex` FROM `user` `User`
 *        // WHERE `User`.`age` >= 18
 *        // LIMIT 1
 *    })
 *
 * User.at({ age: { $ge: 18 } }).$('account')
 *    .then(function (user) {
 *        // SELECT `User`.`id`, `User`.`email` FROM `user` `User`
 *        // WHERE `User`.`age` >= 18
 *        // LIMIT 1
 *    })
 */
Query.prototype.$ = function (scope) {
    this._scope = scope;
    return this;
};

/**
 * Specify the WHERE expression to apply
 * @param {Object} where - Query expression for the WHERE condition.
 * @returns {Query} this
 * @example
 * User.at({ id: 42 })
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.at = function (where) {
    this._where = where || null;
    return this;
};

/**
 * Limit the number of rows to select.
 * @param {?Number} max - The limit to set, if null it does not set any limit
 * @returns {Query} this
 * @example
 * User.at({ age: { $ge: 18 } }).all().limit(10)
 *     .then(function (users) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`age` >= 18
 *         // LIMIT 10
 *     });
 */
Query.prototype.limit = function (max) {
    this._limit = max;
    return this;
};

/**
 * Specify columns to sort in ascending order
 * @param {...string} columns - Columns to sort
 * @returns {Query} this
 */
Query.prototype.asc = function () {
    this._asc = this._asc.concat(Array.prototype.slice.call(arguments));
    return this;
};

/**
 * Specify columns to sort in descending order
 * @param {...string} columns - Columns to sort
 * @returns {Query} this
 */
Query.prototype.desc = function () {
    this._desc = this._desc.concat(Array.prototype.slice.call(arguments));
    return this;
};

/**
 * Set the query as update
 * @param {Object} data - The data to update
 * @param {Object} [where] - Query expression to find the row.
 * @returns {Query} this
 * @example
 * User.at({ age: { $ge: 18 } }).update({ status: 'major' })
 *     .then(function (user) {
 *         // UPDATE `user` `User` SET `User`.`status` = 'major'
 *         // WHERE `User`.`age` >= 18
 *     });
 *
 * // OR
 *
 * User.update({ name: 'alex' }, { age: { $ge: 18 } })
 *     .then(function (user) {
 *         // UPDATE `user` `User` SET `User`.`status` = 'major'
 *         // WHERE `User`.`age` >= 18
 *     });
 */
Query.prototype.update = function (data, where) {
    this._sqlFunction = QueryToSql.update;
    this._fields = data;
    if (where) { this.at(where); }
    this._callback = null;
    return this;
};

/**
 * Set the query as delete
 * @param {Object} [where] - Query expression to find the row.
 * @returns {Query} this
 * @example
 * User.at({ id: 42 }).remove()
 *     .then(function (user) {
 *         // DELETE FROM `User` USING `user` `User`
 *         // WHERE `User`.`id` = 42
 *     });
 *
 * // OR
 *
 * User.remove({ id: 42 })
 *     .then(function (user) {
 *         // DELETE FROM `User` USING `user` `User`
 *         // WHERE `User`.`id` = 42
 *     });
 */
Query.prototype.remove = function (where) {
    this._sqlFunction = QueryToSql.delete;
    if (where) { this.at(where); }
    this._callback = null;
    return this;
};

/**
 * Set the query as select one.
 * Note that this is the default query, so it's not necessary to call it.
 * @params {...string} [attributes] - Attributes to select (overrides #only)
 * @returns {Query} this
 * @example
 * User.at({ id: 42 }).select()
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 *
 * // OR
 *
 * User.at({ id: 42 })
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.select = function () {
    if (arguments.length > 0) { this.only.apply(this, arguments); }
    this._sqlFunction = QueryToSql.select;
    this._limit = 1;
    this._callback = this._model._buildInstanceFromRow;
    return this;
};

/**
 * Set the query as select all
 * @param {Object} [where] - Query expression to find the row.
 * @returns {Query} this
 * @example
 * User.at({ age: { $ge: 18 } }).all().limit(10)
 *     .then(function (users) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`age` >= 18
 *         // LIMIT 10
 *     });
 *
 * // OR
 *
 * User.all({ age: { $ge: 18 } }).limit(10)
 *     .then(function (users) {
 *         // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
 *         // WHERE `User`.`age` >= 18
 *         // LIMIT 10
 *     });
 */
Query.prototype.all = function (where) {
    if (where) { this.at(where); }
    this._sqlFunction = QueryToSql.select;
    this._callback = this._model._buildMultiInstanceFromRow;
    return this;
};

function getResult(res) {
    return res[0].$_result;
}

/**
 * Get the sum of the numeric values of the column
 * @param {string} column - The numeric column
 * @returns {Query} this
 * @example
 * User.sum('age').at({ username: { $not: null } })
 *     .then(function (sum) {
 *          // SELECT SUM(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.sum = function (column) {
    this._sqlFunction = QueryToSql.sum;
    this._column = column || null;
    this._callback = getResult;
    return this;
};

/**
 * Get the minimum numeric values of the column
 * @param {string} column - The numeric column
 * @returns {Query} this
 * @example
 * User.min('age').at({ username: { $not: null } })
 *     .then(function (min) {
 *          // SELECT MIN(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.min = function (column) {
    this._sqlFunction = QueryToSql.min;
    this._column = column;
    this._callback = getResult;
    return this;
};

/**
 * Get the maximum numeric values of the column
 * @param {string} column - The numeric column
 * @returns {Query} this
 * @example
 * User.max('age').at({ username: { $not: null } })
 *     .then(function (max) {
 *          // SELECT MAX(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.max = function (column) {
    this._sqlFunction = QueryToSql.max;
    this._column = column;
    this._callback = getResult;
    return this;
};

/**
 * Count the number of rows.
 * If a column is provided, it counts only the non-NULL values.
 * @param {string} [column] - The column
 * @returns {Query} this
 * @example
 * User.count().at({ username: { $not: null } })
 *     .then(function (count) {
 *          // SELECT COUNT(*) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.count = function (column) {
    this._sqlFunction = QueryToSql.count;
    this._column = column || null;
    this._callback = getResult;
    return this;
};

/**
 * Use this connection instead
 * @param {external:PoolConnection} connection - Use this connection
 * @returns {Query} this
 * @example
 * ziti.withConnection(function (connection) {
 *     User.at({ id: 42 }).use(connection).run();
 * });
 */
Query.prototype.use = function (connection) {
    this._connection = connection;
    return this;
};

/**
 * Bind the query to thisArg.
 * This is useful to bind a callback.
 * @param {*} thisArg
 * @returns {Query} this
 * @example
 * User.at({ id: 42 }).bind(this).then(this.callback);
 */
Query.prototype.bind = function (thisArg) {
    this._thisArg = thisArg;
    return this;
};

Query.prototype._setCallback = function (fn) {
    this._callback = fn;
    return this;
};

/**
 * Set the fields to select from an attribute list
 * @private
 */
Query.prototype._setFields = function (attributes) {
    var target, ref, attrName, model = this._model, fields = this._fields;
    this._fields[this._name] = [ ];
    for (var i = 0, len = attributes.length; i < len; ++i) {
        attrName = attributes[i];
        if (model._attributes.indexOf(attrName) > -1) {
            fields[this._name].push(attrName);
        } else if (attrName in model._references) {
            ref = model._references[attrName];
            target = ref._target;
            if (ref._name in fields) { continue; }
            if (this._scope in target._scopes) {
                fields[ref._name] = _.intersection(target._attributes,
                                                   target._scopes[this._scope]);
            } else {
                fields[ref._name] = target._attributes;
            }
            this._joins = this._joins.concat(ref._joins);
        }
    }
};

/**
 * Run the query and returns a promise than the query has been run
 * @returns {external:Promise}
 * @example
 * User.at({ id: 42 }).run().then(function (user) {
 *    console.log(user.raw());
 * });
 */
Query.prototype.run = function () {
    if (this._sqlFunction === null) {
        this.select();
    }
    var sql = this._sqlFunction(this);
    var query = this._model.query(sql, { using: this._connection })
        .bind(this._model);
    if (this._callback !== null) {
        query = query.spread(this._callback);
    } else {
        query = query.get(0);
    }
    if (this._thisArg !== null) {
        query = query.bind(this._thisArg);
    }
    return query;
};

/**
 * Shortcut for `query.run().then(resolve, reject)`
 * @param {Function} resolve - Promise fulfilledHandler
 * @param {Function} reject - Promise rejectedHandler
 * @returns {external:Promise}
 */
Query.prototype.then = function (resolve, reject) {
    return this.run().then(resolve, reject);
};

/**
 * Shortcut for `query.run().finally(handler)`
 * @param {Function} handler - Promise handler
 * @returns {external:Promise}
 */
Query.prototype.finally = function (handler) {
    return this.run().finally(handler);
};

/**
 * Set options using an object instead, mainly for retro compatibility
 * @param {Object} [options]
 * @param {Array.<string>} [options.attributes] - Select only the provided list of attributes.
 * @param {Number} [options.limit] - Limit the number of rows to select
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {Query} this
 */
Query.prototype.setOptions = function (options) {
    options = options || { };
    if (options.using) {
        this.use(options.using);
    }
    if (options.limit) {
        this.limit(options.limit);
    }
    if (options.attributes) {
        this.only(options.attributes);
    }
    return this;
};

module.exports = Query;