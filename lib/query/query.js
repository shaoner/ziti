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

var QueryType = {
    NONE:            0,
    SELECTONE:       1,
    SELECTALL:       2,
    UPDATE:          3,
    REMOVE:          4,
    SELECTOPERATION: 5
};

/**
 * @constructor
 */
var Query = function (model) {
    this._connection = null;
    this._model = model;
    this._queryType = QueryType.NONE;
    this._callback = null;
    this._table = model._table;
    this._name = model._name;
    this._sqlFunction = null;
    this._thisArg = null;
    this._where = null;
    this._limit = null;
    this._asc = [ ];
    this._desc = [ ];
    this._group = [ ];
    this._scope = '__default__';
    this._attributes = [ ];
    this._fields = { };
    this._keys = { };
    this._joins = {
        structure: { },
        order: [ ]
    };
    this._column = null;
    this._isRaw = false;
    this.$(this._scope);
};

/**
 * Select only the provided list of attributes.
 * This overrides any scope
 * @param {...string} [attributes] - Attributes to select
 * @chainable
 * @example
 * User.at({ id: 42 }).only('name', 'age')
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`name`, `User`.`age` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.only = function () {
    this._attributes = Array.prototype.slice.call(arguments);
    this._scope = null;
    return this;
};

/**
 * Append the provided attributes
 * @param {...string} [attributes] - Attributes to append
 * @chainable
 * @example
 * User.at({ id: 42 }).only('name').with('age')
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`name`, `User`.`age` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.with = function () {
    this._attributes = _.union(this._attributes, Array.prototype.slice.call(arguments));
    return this;
};

/**
 * Remove the provided attributes
 * @param {...string} [attributes] - Attributes to remove
 * @chainable
 * @example
 * User.at({ id: 42 }).only('id', 'name', 'age').without('name')
 *     .then(function (user) {
 *         // SELECT `User`.`id`, `User`.`age` FROM `user` `User`
 *         // WHERE `User`.`id` = 42
 *         // LIMIT 1
 *     });
 */
Query.prototype.without = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this._attributes);
    this._attributes = _.without.apply(_, args);
    return this;
};

/**
 * Set the scope of the query, so it selects only attributes within the scope
 * @param {string} scope - The scope to choose
 * @chainable
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
    if (scope in this._model._scopes) {
        this._scope = scope;
        this._attributes = this._model._scopes[scope];
    }
    return this;
};

/**
 * Specify the WHERE expression to apply
 * @param {Object} where - Query expression for the WHERE condition.
 * @chainable
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
 * @chainable
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
 * @chainable
 */
Query.prototype.asc = function () {
    this._asc = this._asc.concat(Array.prototype.slice.call(arguments));
    return this;
};

/**
 * Specify columns to sort in descending order
 * @param {...string} columns - Columns to sort
 * @chainable
 */
Query.prototype.desc = function () {
    this._desc = this._desc.concat(Array.prototype.slice.call(arguments));
    return this;
};

/**
 * Speficy how to group the result-set by one or more columns
 * @param {...string} columns - Columns to group
 * @chainable
 */
Query.prototype.group = function () {
    this._group = this._group.concat(Array.prototype.slice.call(arguments));
    return this;
};

/**
 * When retrieving data, it returns raw data instead of Model instance(s)
 * @chainable
 */
Query.prototype.raw = function () {
    if (this._queryType === QueryType.SELECTALL) {
        this._callback = this._buildMultiRaw;
    } else if (this._queryType === QueryType.SELECTONE) {
        this._callback = this._buildOneRaw;
    }
    this._isRaw = true;
    return this;
};

/**
 * Set the query as update
 * @param {Object} data - The data to update
 * @param {Object} [where] - Query expression to find the row.
 * @chainable
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
 * @chainable
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
 * @chainable
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
    this._queryType = QueryType.SELECTONE;
    this._sqlFunction = QueryToSql.select;
    this._limit = 1;
    this._callback = this._isRaw === true ? this._buildOneRaw : this._buildOneInstance;
    return this;
};

/**
 * Set the query as select all
 * @param {Object} [where] - Query expression to find the row.
 * @chainable
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
    this._queryType = QueryType.SELECTALL;
    this._sqlFunction = QueryToSql.select;
    this._callback = this._isRaw === true ? this._buildMultiRaw : this._buildMultiInstance;
    return this;
};

function getResult(res) {
    return res[0].$_result;
}

/**
 * Get the sum of the numeric values of the column
 * @param {string} column - The numeric column
 * @chainable
 * @example
 * User.sum('age').at({ username: { $not: null } })
 *     .then(function (sum) {
 *          // SELECT SUM(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.sum = function (column) {
    this._queryType = QueryType.SELECTOPERATION;
    this._sqlFunction = QueryToSql.sum;
    this._column = column || null;
    this._callback = getResult;
    return this;
};

/**
 * Get the minimum numeric values of the column
 * @param {string} column - The numeric column
 * @chainable
 * @example
 * User.min('age').at({ username: { $not: null } })
 *     .then(function (min) {
 *          // SELECT MIN(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.min = function (column) {
    this._queryType = QueryType.SELECTOPERATION;
    this._sqlFunction = QueryToSql.min;
    this._column = column;
    this._callback = getResult;
    return this;
};

/**
 * Get the maximum numeric values of the column
 * @param {string} column - The numeric column
 * @chainable
 * @example
 * User.max('age').at({ username: { $not: null } })
 *     .then(function (max) {
 *          // SELECT MAX(`User.`age`) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.max = function (column) {
    this._queryType = QueryType.SELECTOPERATION;
    this._sqlFunction = QueryToSql.max;
    this._column = column;
    this._callback = getResult;
    return this;
};

/**
 * Count the number of rows.
 * If a column is provided, it counts only the non-NULL values.
 * @param {string} [column] - The column
 * @chainable
 * @example
 * User.count().at({ username: { $not: null } })
 *     .then(function (count) {
 *          // SELECT COUNT(*) FROM `user` `User`
 *          // WHERE `User`.`username` NOT NULL
 *     });
 */
Query.prototype.count = function (column) {
    this._queryType = QueryType.SELECTOPERATION;
    this._sqlFunction = QueryToSql.count;
    this._column = column || null;
    this._callback = getResult;
    return this;
};

/**
 * Use this connection instead
 * @param {external:PoolConnection} connection - Use this connection
 * @chainable
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
 * @chainable
 * @example
 * User.at({ id: 42 }).bind(this).then(this.callback);
 */
Query.prototype.bind = function (thisArg) {
    this._thisArg = thisArg;
    return this;
};

/**
 * Add a join to the current query
 * @private
 * @param {string} leftName - name from which to join
 * @param {string} rightName - name of the join table
 * @param {Reference} reference - The reference
 */
Query.prototype._addJoin = function (leftName, rightName, reference) {
    var structure = this._joins.structure;
    if (!(rightName in structure)) {
        if (reference._throughTarget) {
            var intermediate = reference._throughTarget;
            var fk = intermediate._references[reference._relatedName];
            var intRightName = leftName + '.' + intermediate._name;
            structure[intRightName] = {
                leftName: leftName,
                table: intermediate._table,
                leftFields: fk._rightFields,
                rightFields: fk._leftFields,
                type: reference._joinType
            };
            this._joins.order.push(intRightName);
            fk = intermediate._references[reference._throughRelatedName];
            this._addJoin(intRightName, rightName, fk);
        } else {
            structure[rightName] = {
                leftName: leftName,
                table: reference._target._table,
                leftFields: reference._leftFields,
                rightFields: reference._rightFields,
                type: reference._joinType
            };
            this._joins.order.push(rightName);
        }
    }
};

/**
 * Set a field and join associated to an attribute
 * @private
 * @param {Model} model - The model the attribute comes from
 * @param {string} name - The pathname of the attribute
 * @param {string} attr - The attribute name
 */
Query.prototype._setFieldFromAttribute = function (model, name, attr) {
    var rAttr = attr.split('.'), attrName, ref;
    attr = rAttr.shift();
    if (rAttr.length < 1) {
        if (attr in model._core) {
            // Simple attribute
            if (!(name in this._fields)) {
                this._fields[name] = { };
                this._fields[name].key = model._pk.length > 0 ? model._pk : model._attributes;
                this._fields[name].attributes = this._fields[name].key.slice(0);
            }
            if (this._fields[name].attributes.indexOf(attr) < 0) {
                this._fields[name].attributes.push(attr);
            }
        } else if (attr in model._references) {
            // Reference i.e. all the reference sub attributes
            attrName = name + '.' + attr;
            ref = model._references[attr];
            var subAttrs = ref._target._attributes;
            this._addJoin(name, attrName, ref);
            for (var i = 0, len = subAttrs.length; i < len; ++i) {
                this._setFieldFromAttribute(ref._target, attrName, subAttrs[i]);
            }
            this._fields[attrName].reference = ref;
        }
    } else {
        // A reference attribute
        if (attr in model._references) {
            attrName = name + '.' + attr;
            ref = model._references[attr];
            this._addJoin(name, attrName, ref);
            this._setFieldFromAttribute(ref._target, attrName, rAttr.join('.'));
            this._fields[attrName].reference = ref;
        }
    }
};

/**
 * Set all fields from all attributes
 * @private
 */
Query.prototype._setFields = function () {
    for (var i = 0, len = this._attributes.length; i < len; ++i) {
        this._setFieldFromAttribute(this._model, this._name, this._attributes[i]);
    }
};

function isEmpty(data) {
    if (data === null) {
        return true;
    }
    return _.every(data, _.isNull);
}

/**
 * Group rows in order by the ident key of the row item
 * @private
 * @param {Object[]} rows
 * @param {string} name - Name of the field to group
 * @returns {Array.<Object[]>}
 */
Query.prototype._groupRows = function (rows, name) {
    var groups = [ ], idx = { };
    // Groups rows by data values in order
    for (var i = 0, len = rows.length; i < len; ++i) {
        var row = rows[i];
        var k = _.at(row[name], this._fields[name].key).join('_');
        if (k in idx) {
            groups[idx[k]].push(row);
        } else {
            groups.push([ row ]);
            idx[k] = groups.length - 1;
        }
    }
    return groups;
};

/**
 * Group & merge rows into an array
 * @private
 * @param {Object[]} rows
 * @param {string} name - Name of the field to group
 * @returns {Object[]}
 */
Query.prototype._formatMultiRaw = function (rows, name) {
    if (rows.length < 1) {
        return rows;
    }
    var groups = this._groupRows(rows, name);
    var out = [ ];
    for (var i = 0, len = groups.length; i < len; ++i) {
        var group = groups[i];
        var o = group[0][name];
        var tmp;
        for (var attr in this._fields) {
            if (attr === name || !(attr in group[0])) { continue; }
            var attrName = attr.substr(name.length + 1);
            var reference = this._fields[attr].reference;
            if (reference._unique === true) {
                tmp = group[0][attr];
                o[attrName] = isEmpty(tmp) ? null : tmp;
            } else if (reference._unique === false) {
                // Array of attr only
                var subRows = _.reduce(group, function (res, item) {
                    var sub = { }, tmp, isSubEmpty = true;
                    for (var k in item) {
                        if (_.startsWith(k, attr)) {
                            tmp = item[k];
                            if (!isEmpty(tmp)) {
                                sub[k] = tmp;
                                isSubEmpty = false;
                            }
                        }
                    }
                    if (!isSubEmpty) {
                        res.push(sub);
                    }
                    return res;
                }, [ ]);
                // Regroup the attr and its sub attr
                o[attrName] = this._formatMultiRaw(subRows, attr);
            }
        }
        out.push(o);
    }
    return out;
};

/**
 * Get only one object from rows
 * @private
 * @param {Object[]} rows
 * @returns {?Object}
 */
Query.prototype._buildOneRaw = function (rows) {
    var o = this._formatMultiRaw(rows, this._name);
    if (o.length > 0) {
        return o[0];
    }
    return null;
};

/**
 * Get multiple objects from rows
 * @private
 * @param {Object[]} rows
 * @returns {Object[]}
 */
Query.prototype._buildMultiRaw = function (rows) {
    return this._formatMultiRaw(rows, this._name);
};

/**
 * Build a model instance using multiple sql rows
 * @private
 * @param {Object[]} rows
 * @return {ModelInstance}
 */
Query.prototype._buildOneInstance = function (rows) {
    return this._model.build(this._buildOneRaw(rows), { new: false });
};

/**
 * Build a model instance using one row
 * @private
 * @param {Object} rows
 * @return {?ModelInstance}
 */
Query.prototype._buildInstance = function (row) {
    return this._model.build(row, { new: false });
};

/**
 * Build an array of model instances using multiple sql rows
 * @private
 * @param {Object[]} rows
 * @return {Array.<ModelInstance>}
 */
Query.prototype._buildMultiInstance = function (rows) {
    return _.map(this._formatMultiRaw(rows, this._name),
                 this._buildInstance, this);
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
    var query = this._model.query(sql, { using: this._connection });

    if (this._callback !== null) {
        query = query.spread(this._callback.bind(this));
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
 * @see {@link https://github.com/petkaantonov/bluebird/blob/master/API.md#thenfunction-fulfilledhandler--function-rejectedhandler----promise|Bluebird#then}
 */
Query.prototype.then = function (resolve, reject) {
    return this.run().then(resolve, reject);
};

/**
 * Shortcut for `query.run().finally(handler)`
 * @param {Function} handler - Promise handler
 * @returns {external:Promise}
 * @see {@link https://github.com/petkaantonov/bluebird/blob/master/API.md#finallyfunction-handler---promise|Bluebird#finally}
 */
Query.prototype.finally = function (handler) {
    return this.run().finally(handler);
};

/**
 * Shortcut for `query.run().tap(handler)`
 * @param {Function} handler - Promise handler
 * @returns {external:Promise}
 * @see {@link https://github.com/petkaantonov/bluebird/blob/master/API.md#tapfunction-handler---promise|Bluebird#tap}
 */
Query.prototype.tap = function (handler) {
    return this.run().tap(handler);
};


/**
 * Set options using an object instead, mainly for retro compatibility
 * @param {Object} [options]
 * @param {Array.<string>} [options.attributes] - Select only the provided list of attributes.
 * @param {Number} [options.limit] - Limit the number of rows to select
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @chainable
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
        this.only.apply(this, options.attributes);
    }
    return this;
};

module.exports = Query;
