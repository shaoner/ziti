'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var AbstractType = require('./type/abstract-type');
var BaseType = require('./type/base-type');
var Reference = require('./type/reference');
var One = require('./type/one');
var Many = require('./type/many');
var Types = require('./types');
var ModelInstance = require('./model-instance');
var Query = require('./query/query');
var Sql = require('./query/sql');

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
 * @external Query
 * @see {@link /api/query/}
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
        options = _.assign({ new: true }, options);
        return new ModelInstance(this, data, options);
    }
    return null;
};

/**
 * Assign foreign key fields
 * @private
 * @param {Object} obj - The object to assign values
 * @param {(Object|external:ModelInstance)} value - The value from which the fields are assigned
 * @param {Object} data - The original data object
 * @param {Object} fk - The associated foreign key
 */
function assignForeignKey (obj, value, data, fk) {
    if (value instanceof ModelInstance) {
        value = value.raw();
    }
    var fields = fk.fields, refFields = fk.refFields;
    for (var i = 0, len = fields.length; i < len; ++i) {
        if (refFields[i] in value && !(fields[i] in data)) {
            obj[fields[i]] = value[refFields[i]];
        }
    }
}

/**
 * Prepare data before saving it
 * @private
 * @param {Object} data - Data to save
 * @returns {Object}
 */
Model.prototype._prepareSave = function (data) {
    var o = { }, attr, value;
    // Copy data and add foreign keys from instance / object
    for (attr in data) {
        value = data[attr];
        if (attr in this._references && attr in this._fks) {
            assignForeignKey(o, value, data, this._fks[attr]);
        }
        if (attr in this._core) {
            o[attr] = value;
        }
    }
    // Add default function values
    for (attr in this._core) {
        value = this._core[attr]._default;
        if (_.isFunction(value) && !(attr in o)) {
            o[attr] = value();
        }
    }
    return o;
};

Model.prototype._multiSave = function (data, options) {
    var co = options.using;
    var queries = [ ], i, len, instances = [ ], instance;
    for (i = 0, len = data.length; i < len; ++i) {
        // Push all query promises
        queries.push(co.queryAsync(Sql.insert(this._table, data[i])));
    }
    return Promise.all(queries).bind(this).then(function (results) {
        for (i = 0, len = results.length; i < len; ++i) {
            var row = results[i];
            instance = this.build(data[i], { new: false });
            if (row.insertId > 0 && this._aiColumn) {
                instance.set(this._aiColumn, row.insertId);
            }
            instances.push(instance);
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
        for (var i = 0, len = data.length; i < len; ++i) {
            data[i] = this._prepareSave(data[i]);
        }
    } else {
        data = this._prepareSave(data);
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
        return this.query(Sql.insert(this._table, data), options)
            .spread(function (row) {
                var instances = [ ], instance;
                if (isArray) {
                    for (var i = 0, len = data.length; i < len; ++i) {
                        instance = self.build(data[i]);
                    if (row.insertId > 0 && self._aiColumn) {
                        instance.set(self._aiColumn, row.insertId);
                    }
                        instances.push(instance);
                        ++row.insertId;
                    }
                    return instances;
                } else {
                    instance = self.build(data);
                    if (row.insertId > 0 && self._aiColumn) {
                        instance.set(self._aiColumn, row.insertId);
                    }
                    return instance;
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
 * @returns {external:Query}
 */
Model.prototype.update = function (data, where, options) {
    return new Query(this).update(data, where).setOptions(options);
};

/**
 * Insert data or update the old row if a duplicate key conflict occurs
 * in a UNIQUE index or PRIMARY KEY
 * @param {Object} data - The data to be inserted or updated
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.upsert = function (data, options) {
    return this.query(Sql.upsert(this._table, data), options).get(0);
};

/**
 * Remove row(s) from the associated table
 * @param {Object} where - Query expression for the WHERE condition.
 * If not set or null, it removes all rows in the associated table
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.remove = function (where, options) {
    return new Query(this).remove(where).setOptions(options);
};

function formatReduce (res, obj) {
    if (!_.isEmpty(obj = _.pick(obj, _.negate(_.isNull)))) {
        res.push(obj);
    }
    return res;
}

/**
 * Format multiple data matching a single row
 * @private
 * @param {Object[]} data
 * @returns {Object}
 */
Model.prototype._formatOneRow = function (data) {
    if (data.length < 1) {
        return null;
    }
    var o = _.assign({ }, data[0][this._name]), tmp;
    for (var attr in this._references) {
        if (attr in data[0]) {
            var ref = this._references[attr];
            if (ref._unique === true) {
                o[attr] = _.isEmpty(tmp = _.pick(data[0][attr], _.negate(_.isNull))) ? null : tmp;
            } else {
                o[attr] = _.reduce(_.pluck(data, attr), formatReduce, [ ]);
                }
        }
    }
    return o;
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

Model.prototype._buildMultiInstanceFromRow = function (rows) {
    var groups = [ ], keys = { };
    // Groups rows by data values in order
    for (var i = 0, len = rows.length; i < len; ++i) {
        var row = rows[i];
        var id = _.at(row[this._name], this._pk).join('_');
        if (!id) {
            id = _.values(row).sort().join('_');
        }
        if (id in keys) {
            groups[keys[id]].push(row);
        } else {
            groups.push([ row ]);
            keys[id] = groups.length - 1;
        }
    }
    return _.map(groups, this._buildInstanceFromRow, this);
};

/**
 * Retrieve a single Model instance
 * @param {Object} where - Query expression to find the row.
 * If not set or null, it returns the first found row.
 * @param {Object} [options]
 * @param {string[]} [options.attributes] - The attributes to retrieve
 * @param {string} [options.$] - The scope to use
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.at = function (where, options) {
    return new Query(this).at(where).setOptions(options);
};

/**
 * Retrieve a multiple Model instances
 * @param {Object} where - Query expression to find the rows.
 * If not set or null, it retrieves all rows.
 * @param {Object} [options]
 * @param {string[]} [options.attributes] - The attributes to retrieve
 * @param {string} [options.$] - The scope to use
 * @param {Number} [options.limit] - Limit the results
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.all = function (where, options) {
    return new Query(this).at(where).all().setOptions(options);
};

/**
 * Get the sum of the numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the sum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.sum = function (column, where, options) {
    return new Query(this).sum(column).at(where).setOptions(options);
};

/**
 * Get the minimum numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the minimum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.min = function (column, where, options) {
    return new Query(this).min(column).at(where).setOptions(options);
};

/**
 * Get the maximum numeric values of the column
 * @param {string} column - The numeric column
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it gets the maximum of all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.max = function (column, where, options) {
    return new Query(this).max(column).at(where).setOptions(options);
};

/**
 * Count the number of rows
 * @param {Object} where - Query expression to filter rows.
 * If not set or null, it counts all rows.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Query}
 */
Model.prototype.count = function (where, options) {
    return new Query(this).count(null).at(where).setOptions(options);
};

/**
 * Expand and add fields to the model
 * @private
 * @param {Object} core - fields in the form { fieldName: fieldType }
 */
Model.prototype._addFields = function (core) {
    var content, attrName, hasPk = false;
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
        // Unique keys
        if (_.isString(type._unique)) {
            var options = {
                name: 'uq_' + type._unique,
                unique: true
            };
            if (options.name in this._indexes) {
                this._indexes[options.name].fields.push(name);
            } else {
                this.index([ name ], options);
            }
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
    if (name in this._fks) {
        this._delForeignKey(name);
    }
    var fkFields = fk.fields;
    this.db.manager._sort(this._name, fk.model._name);
    for (var i = 0, len = fkFields.length; i < len; ++i) {
        this._addAttribute(fkFields[i], fk.fieldsType[i]);
    }
    this._fks[name] = fk;
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
    this[name] = fn.bind(this);
}, 'Model.setStatic: Use `Model.name = fn` instead');

/**
 * Set a new Model Instance method
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 * @deprecated since version 0.1.0, use `Model.methods.name = fn`
 */
Model.prototype.setMethod = util.deprecate(function (name, fn) {
    this.methods[name] = fn;
}, 'Model.setMethod: Use `Model.methods.name = fn` instead');

/**
 * Send a SQL query
 * @param {(Array.<*>|Object|string)} query - The query
 * @param {string} query.sql - A query with parameters defined as ?
 * @param {Array.<*>} query.values - An array of values to pass
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 * @example
 * User.query({ sql: 'SELECT ?? FROM ?? WHERE ?? = ?', values: [ 'id', User.table, 'id', 42 ] });
 * // SELECT `id` FROM `user` WHERE `id` = 42
 *
 * User.query({ sql: 'INSERT INTO ?? SET ?', values: [ User.table, { name: 'Heisenberg', age: 42 } ] });
 * // INSERT INTO `user` SET `name` = 'Heisenberg', `age` = 42
 *
 * User.query('SELECT id FROM `user` WHERE `id` = 42');
 * // SELECT `id` FROM `user` WHERE `id` = 42
 *
 * User.query([ 'SELECT ?? FROM ?? WHERE ?? = ?', 'id', User.table, 'id', 42 ]);
 * // SELECT `id` FROM `user` WHERE `id` = 42

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
        if (options.using) {
            options.autoMigrate.using = options.using;
        }
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
    return this.query(Sql.createTable(this._table, this._core, {
        pks: this._pk,
        fks: this._fks,
        indexes: this._indexes,
        engine: this._options.engine
    }), options).get(0);
};

/**
 * Delete the associated table if exists
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.dropTable = function (options) {
    return this.query(Sql.dropTable(this._table), options).get(0);
};

/**
 * Add/remove columns from the table to match the current Model
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
Model.prototype.migrate = function (options) {
    return this.query(Sql.describe(this._table), options).bind(this)
        .spread(function (result) {
            var add = { }, drop = [ ], resAttr = _.map(result, 'Field'), attr;
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
                return this.query(Sql.alterTable(this._table, add, drop), options);
            }
            return null;
        });
};

module.exports = Model;
