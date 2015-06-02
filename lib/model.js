'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var AbstractType = require('./type/abstract-type');
var BaseType = require('./type/base-type');
var Reference = require('./type/reference');
var One = require('./type/one');
var Many = require('./type/many');
var QueryBuilder = require('./query-builder');
var Types = require('./types');
var ModelInstance = require('./model-instance');

/**
 * @external Promise
 * @see {@link https://github.com/petkaantonov/bluebird}
 */

/**
 * @external PoolConnection
 * @see {@link https://github.com/felixge/node-mysql#pooling-connections}
 */

/**
 * @external ModelInstance
 * @see {@link /api/instance/}
 */

/**
 * @constructor
 */
var Model = function (db, name, core, options) {
    this.db = db;
    /**
     * @member
     */
    this.methods = { };
    this._name = name;
    this._options = _.assign({
        createTable: true,
        tableName: _.snakeCase(name),
        engine: 'InnoDB',
        autoId: true
    }, options);
    this._table = this._options.tableName;
    this._attributes = [ ];
    this._core = { };
    this._references = { };
    this._pk = [ ];
    this._fks = { };
    this._aiColumn = null;
    this._synced = false;
    this._indexes = [ ];
    this._scopes = { };
    this._addFields(core);
    this.db.manager.addModel(this);
    for (var attrName in this._references) {
        this.db.manager.pushReference(this._references[attrName]);
    }
};

/**
 * The associated table name
 * @name table
 * @memberof Model.prototype
 */
Object.defineProperty(Model.prototype, 'table', {
    get: function () { return this._table; }
});

/**
 * The model name
 * @name name
 * @memberof Model.prototype
 */
Object.defineProperty(Model.prototype, 'name', {
    get: function () { return this._name; }
});

/**
 * Build a Model instance
 * @param {Object} data - The data to use to build the instance
 * @param {Object} [options]
 * @param {boolean} [options.new=true] - Whether the instance is new or already existing
 * @returns {?external:ModelInstance}
 */
Model.prototype.build = function (data, options) {
    if (data) {
        this._prepareData(data);
        options = _.assign({ new: true }, options);
        return new ModelInstance(this, data, options);
    }
    return null;
};

/**
 * Prepare data addind default values if not provided
 * @private
 * @param {Object} data
 */
Model.prototype._prepareData = function (data) {
    var value;
    for (var attr in this._core) {
        if (attr in data) { continue; }
        value = this._core[attr]._default;
        if (_.isUndefined(value)) { continue; }
        if (_.isFunction(value)) { value = value(); }
        data[attr] = value;
    }
};

/**
 * Create a new object from data. eventually appending the insert id
 * @private
 * @param {Object} row - The result of the insertion
 * @param {Object} data - The data that have been inserted
 * @returns {Object}
 */
Model.prototype._dataWithAi = function (row, data) {
    var o = _.assign({ }, data);
    if (row.insertId > 0 && this._aiColumn) {
        o[this._aiColumn] = row.insertId;
    }
    return o;
};

Model.prototype._multiSave = function (data, options) {
    var co = options.using;
    var queries = [ ], i, len, instances = [ ];
    for (i = 0, len = data.length; i < len; ++i) {
        // Push all query promises
        queries.push(co.queryAsync(QueryBuilder.insert(this._table, data[i])));
    }
    return Promise.all(queries).bind(this).then(function (results) {
        for (i = 0, len = results.length; i < len; ++i) {
            var row = results[i];
            if (row[0].insertId > 0 && this._aiColumn) {
                data[i][this._aiColumn] = row[0].insertId;
            }
            instances.push(this.build(data[i], { new: false }));
        }
        return instances;
    });
};

/**
 * Save new items into the associated model table
 * @param {(Object|Object[])} data - The data to insert
 * @param {Object} [options]
 * @param {boolean} [options.multiple=false]
 * Run multiple insertions using a transaction (or the given connection)
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.save = function (data, options) {
    options = _.assign({ multiple: false }, options);
    var self = this, isArray = _.isArray(data);
    if (isArray) {
        _.forEach(data, this._prepareData, this);
    } else {
        this._prepareData(data);
    }
    if (options.multiple === true && isArray) {
        // Insert each data one after another
        if (!options.using) {
            return this.db.withTx(function (tx) {
                options.using = tx;
                return self._multiSave(data, options);
            });
        }
        return this._multiSave(data, options);
    } else {
        // Insert a bunch of data at once
        return this.query(QueryBuilder.insert(this._table, data), options)
            .then(function (rows) {
                var row = rows[0], instances = [ ], instance;
                if (isArray) {
                    for (var i = 0, len = data.length; i < len; ++i) {
                        instance = self.build(self._dataWithAi(row, data[i]));
                        instances.push(instance);
                        ++row.insertId;
                    }
                    return instances;
                } else {
                    return self.build(self._dataWithAi(row, data));
                }
            });
    }
};

/**
 * Update row(s) with new data
 * @param {Object} data - The data that change
 * @param {Object} where - Query expression for the WHERE condition.
 * If not set or null, it updates each row.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.update = function (data, where, options) {
    options = options || { };
    options.where = where;
    return this.query(QueryBuilder.update(this._table, this._name,
                                          data, options), options);
};

/**
 * Insert data or update the old row if a duplicate key conflict occurs
 * in a UNIQUE index or PRIMARY KEY
 * @param {Object} data - The data to be inserted or updated
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 */
Model.prototype.upsert = function (data, options) {
    options = options || { };
    return this.query(QueryBuilder.upsert(this._table, data), options).get(0);
};

/**
 * Remove row(s) from the associated table
 * @param {Object} where - Query expression for the WHERE condition.
 * If not set or null, it removes all rows in the associated table
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.remove = function (where, options) {
    options = options || { };
    options.where = where;
    return this.query(QueryBuilder.remove(this._table, this._name, options),
                      options).get(0);
};

/**
 * Build a find query using references / scopes
 * @private
 * @param {Object} where - Query expression for the WHERE condition.
 * @param {Object} [options]
 * @param {string[]} [options.attributes] - The attributes to retrieve
 * @param {string} [options.$ ]- The scope to use
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype._find = function (where, options) {
    options = options || { };
    var attributes,  joins = [ ];
    var selectOptions = { where: where, as: this._name };
    var scope = options.$ || '__default__';
    if (options.attributes) {
        attributes = options.attributes;
    } else {
        attributes = this._scopes[scope];
    }
    var tableAttrs = { }, i, len, ref, target, attrName;
    for (i = 0, len = attributes.length; i < len; ++i) {
        attrName = attributes[i];
        if (this._attributes.indexOf(attrName) > -1) {
            tableAttrs[this._name] = tableAttrs[this._name] || [ ];
            tableAttrs[this._name].push(attrName);
        } else if (attrName in this._references) {
            ref = this._references[attrName];
            target = ref._target;
            if (scope in target._scopes) {
                tableAttrs[ref._name] = _.intersection(target._attributes,
                                                       target._scopes[scope]);
            } else {
                tableAttrs[ref._name] = target._attributes;
            }
            joins = joins.concat(ref._joins);
        }
    }
    selectOptions.joins = joins;
    return QueryBuilder.select(tableAttrs, this._table, selectOptions);
};

/**
 * Format multiple data matching a single row
 * @private
 * @param {Object[]} data
 * @returns {Object}
 */
Model.prototype._formatOneRow = function (data) {
    if (data.length > 0) {
        var o = _.assign({ }, data[0][this._name]), tmp;
        for (var attr in this._references) {
            if (attr in data[0]) {
                var ref = this._references[attr];
                if (ref._unique === true) {
                    o[attr] = _.isEmpty(tmp = _.pick(data[0], _.negate(_.isNull))) ? null : tmp;
                } else {
                    o[attr] = _.reduce(_.pluck(data, attr), function (res, obj) {
                        if (!_.isEmpty(obj = _.pick(obj, _.negate(_.isNull)))) {
                            res.push(obj);
                        }
                        return res;
                    }, [ ]);
                }
            }
        }
        return o;
    }
    return null;
};

/**
 * Build a model instance using multiple sql rows
 * @private
 * @param {Object[]} rows
 * @return {ModelInstance}
 */
Model.prototype._buildInstanceFromRow = function (rows) {
    return this.build(this._formatOneRow(rows), { new: false });
};

/**
 * Retrieve a single Model instance
 * @param {Object} where - Query expression to find the row.
 * If not set or null, it returns the first found row.
 * @param {Object} [options]
 * @param {string[]} [options.attributes] - The attributes to retrieve
 * @param {string} [options.$] - The scope to use
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.at = function (where, options) {
    var query = this._find(where, options);
    return this.query(query, options).bind(this).spread(this._buildInstanceFromRow);
};

/**
 * Retrieve a multiple Model instances
 * @param {Object} where - Query expression to find the rows.
 * If not set or null, it retrieves all rows.
 * @param {Object} [options]
 * @param {string[]} [options.attributes] - The attributes to retrieve
 * @param {string} [options.$] - The scope to use
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.all = function (where, options) {
    var query = this._find(where, options);
    var self = this;
    return this.query(query, options).bind(this).spread(function (rows) {
        var groups = _.groupBy(rows, function (row) {
            var id = _.at(row[self._name], self._pk).join('_');
            if (!id) {
                id = _.values(row[self._name]).sort().join('_');
            }
            return id;
        });
        return _.map(groups, this._buildInstanceFromRow, this);
    });
};

/**
 * Get the sum of the numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the sum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.sum = function (column, where, options) {
    if (!(column in this._core)) {
        throw new Error('Unknown column ' + column);
    }
    return this.query(QueryBuilder.sum(this._table, column, where), options)
        .spread(function (res) {
            return res[0].$sum;
        });
};

/**
 * Get the minimum numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the minimum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.min = function (column, where, options) {
    if (!(column in this._core)) {
        throw new Error('Unknown column ' + column);
    }
    return this.query(QueryBuilder.min(this._table, column, where), options)
        .spread(function (res) {
            return res[0].$min;
        });
};

/**
 * Get the maximum numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the maximum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.max = function (column, where, options) {
    if (!(column in this._core)) {
        throw new Error('Unknown column ' + column);
    }
    return this.query(QueryBuilder.max(this._table, column, where), options)
        .spread(function (res) {
            return res[0].$max;
        });
};

/**
 * Count the number of rows
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it counts all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.count = function (where, options) {
    return this.query(QueryBuilder.count(this._table, where), options)
        .spread(function (res) {
            return res[0].$count;
        });
};

/**
 * Expand and add fields to the model
 * @private
 * @param {Object} core - fields in the form { fieldName: fieldType }
 */
Model.prototype._addFields = function (core) {
    var references = [ ], content, attrName, hasPk = false;
    for (attrName in core) {
        content = core[attrName];
        if (_.isString(content) || content instanceof Model) {
            content = new One(content);
        } else if (_.isArray(content)) {
            content = new Many(content[0]);
        } else if (_.isFunction(content)) {
            content = content();
        }
        if (!(content instanceof AbstractType)) {
            throw new Error('Invalid field ' + attrName);
        }
        if (content._primaryKey === true) {
            hasPk = true;
        }
        if (content instanceof BaseType) {
            this._addAttribute(attrName, content);
        } else if (content instanceof Reference) {
            this._addReference(attrName, content);
        }
    }
    if (hasPk === false) {
        this._addAutoPrimaryKey();
    }
};

/**
 * Add a new attribute to the model
 * @private
 * @param {string} name - Name of the attribute
 * @param {BaseType} type - The type (Int(), String(), Varchar(), etc)
 */
Model.prototype._addAttribute = function (name, type) {
    if (!(name in this._core)) {
        type._init(this, name);
        this._addScope(name, type._scopes);
        // Primary key
        if (type._primaryKey === true) {
            this._pk.push(name);
        }
        // Auto increment field
        if (type._autoIncrement === true) {
            if (this._aiColumn !== null) {
                throw new Error('Cannot have two auto increment columns');
            }
            this._aiColumn = name;
        }
        this._core[name] = type;
        this._attributes.push(name);
    }
};

/**
 * Remove an attribute from the model
 * @private
 * @param {string} name - Name of the attribute
 */
Model.prototype._delAttribute = function (name) {
    delete this._core[name];
    _.pull(this._pk, name);
    _.pull(this._attributes, name);
};

/**
 * Add all scopes defined in the field
 * @private
 * @param {string} attribute - Name of the attribute
 */
Model.prototype._addScope = function (attribute, scopes) {
    // Merges scopes attributes by scope name
    var name;
    for (var i = 0, len = scopes.length; i < len; ++i) {
        name = scopes[i];
        this._scopes[name] = this._scopes[name] || [ ];
        if (this._scopes[name].indexOf(attribute) < 0) {
            this._scopes[name].push(attribute);
        }
    }
};

/**
 * Add a new foreign key
 * @private
 * @param {string} name - Name of the foreign key
 * @param {string[]} fk.fields - Fields of the source table
 * @param {string[]} fk.refFields - Fields of the reference table
 * @param {string} fk.refTable - Name of the foreign key table
 * @param {string} fk.model - The source model
 */
Model.prototype._addForeignKey = function (name, fk) {
    var fkName = 'fk_' + name;
    if (fkName in this._fks) {
        this._delForeignKey(fkName);
    }
    var fkFields = fk.fields;
    this.db.manager._sort(this._name, fk.model._name);
    for (var i = 0, len = fkFields.length; i < len; ++i) {
        this._addAttribute(fkFields[i], fk.fieldsType[i]);
    }
    this._fks['fk_' + name] = fk;
};

/**
 * Remove a foreign key
 * @private
 * @param {string} name - Name of the foreign key
 */
Model.prototype._delForeignKey = function (name) {
    if (!(name in this._fks)) {
        return;
    }
    var fk = this._fks[name];
    var fkFields = fk.fields;
    for (var i = 0, len = fkFields.length; i < len; ++i) {
        this._delAttribute(fkFields[i]);
    }
    delete this._fks[name];
};

/**
 * Add a primary key if not defined and if not disabled
 * @private
 */
Model.prototype._addAutoPrimaryKey = function () {
    // Add a primary key if not already defined
    var core = this._core, options = this._options;
    if (this._pk.length === 0 && options.autoId) {
        var idName = _.isBoolean(options.autoId) ? 'id' : options.autoId;
        if (idName in core) {
            core[idName].primaryKey().autoIncrement();
            this._pk.push(idName);
            this._aiColumn = idName;
        } else {
            var type = Types.Int().primaryKey().autoIncrement();
            type._scopes = _.keys(this._scopes);
            this._addAttribute(idName, type);
        }
    }
};

/**
 * Add a new reference field, used for joins
 * @private
 * @param {string} name - Name of the field
 * @param {Reference} reference - The reference type
 */
Model.prototype._addReference = function (name, reference) {
    if (!(name in this._references)) {
        reference._init(this, name);
        this._addScope(name, reference._scopes);
        this._references[name] = reference;
    }
};

/**
 * Add a new index on some fields
 * @param {string[]} fields - Name of the fields
 * @param {Object} [options]
 * @param {string} [options.name] - name of the index,
 * by default it is set to the concatenated fields with a '_'
 * @param {string} [options.using] - method for the index ('hash', 'btree')
 * @param {boolean} [options.unique] - unique index
 * @param {boolean} [options.fulltext] - fulltext index
 * @param {boolean} [options.spacial] - spacial index
 */
Model.prototype.index = function (fields, options) {
    options = options || { };
    options.name = options.name || 'idx_' + fields.join('_');
    options.fields = fields;
    this._indexes[options.name] = options;
};

/**
 * Set a new Model method
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 * @deprecated since version 0.1.0, use `Model.name = fn`
 */
Model.prototype.setStatic = util.deprecate(function (name, fn) {
    this._statics[name] = fn;
    this[name] = fn.bind(this);
}, 'Model.setStatic: Use `Model.name = fn` instead');

/**
 * Set a new Model Instance method
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 * @deprecated since version 0.1.0, use `Model.methods.name = fn`
 */
Model.prototype.setMethod = util.deprecate(function (name, fn) {
    this._methods[name] = fn;
}, 'Model.setMethod: Use `Model.methods.name = fn` instead');

/**
 * Send a SQL query
 * @param {Object|string} query - The query
 * @param {string} query.sql - A query with parameters defined as ?
 * @param {Array.<*>} query.values - An array of values to pass
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.query = function () {
    return this.db.query.apply(this.db, arguments);
};

/**
 * Synchronize the Model with the database
 * @param {Object} [options]
 * @param {boolean} [options.dropTable=false] - Drop the table
 * @param {boolean} [options.createTable=true] - Create the table
 * @param {boolean} [options.autoMigrate.addColumns=true] - Add missing table columns
 * @param {boolean} [options.autoMigrate.delColumns=false] - Remove missing table columns
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.sync = function (options) {
    if (this._synced === true) {
        return;
    }
    options = options || { };
    this._synced = true;
    var p = Promise.resolve(this);
    if (options.dropTable === true) {
        p = p.call('dropTable', options).return(this);
    }
    if (options.createTable === true) {
        p = p.call('createTable', options).return(this);
    }
    if (options.autoMigrate !== false) {
        p = p.call('migrate', options.autoMigrate);
    }
    return p;
};

/**
 * Create the associated table if not exists
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.createTable = function (options) {
    return this.query(QueryBuilder.createTable(this._table, this._core, {
        pks: this._pk,
        fks: this._fks,
        indexes: this._indexes,
        engine: this._options.engine
    }), options);
};

/**
 * Delete the associated table if exists
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.dropTable = function (options) {
    return this.query(QueryBuilder.dropTable(this._table), options);
};

/**
 * Add/remove columns from the table to match the current Model
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.migrate = function (options) {
    return this.query(QueryBuilder.showColumns(this._table), options).bind(this)
        .spread(function (result) {
            var add = { }, drop = [ ], alter = false;
            var resAttr = _.map(result, 'Field');
            var attr;
            if (options.addColumns === true) {
                for (attr in this._core) {
                    if (resAttr.indexOf(attr) < 0) {
                        add[attr] = this._core[attr];
                    }
                }
            }
            if (options.delColumns === true) {
                for (var i = 0, len = result.length; i < len; ++i) {
                    attr = result[i].Field;
                    if (!(attr in this._core)) {
                        drop.push(attr);
                    }
                }
            }
            if (_.size(add) > 0 || _.size(drop) > 0) {
                return this.query(QueryBuilder.alterTable(this._table, {
                    add: add,
                    drop: drop
                }), options);
            }
        });
};

module.exports = Model;
