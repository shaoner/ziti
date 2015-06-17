'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var ForeignKey = require('./type/foreign-key');
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
 * @constructor
 * @alias Instance
 */
var ModelInstance = function (model, row, options) {
    options = options || { };
    this.model = model;
    this.db = model.db;
    this._name = model._name;
    this._table = model._table;
    this._where = null;
    this._isNew = options.new !== false;
    this._realValues = { };
    this._newAttr = [ ];
    this._references = { };
    this._setMethods(model.methods);
    this.set(row);
    this._setDefault(model._core);
    this._setDefault(model._references);
    this._newAttr.length = 0;
    if (this._where === null) {
        this._buildWhere();
    }
};

ModelInstance.prototype._setDefault = function (core) {
    for (var name in core) {
        if (name in this._realValues) {
            continue;
        }
        var value = core[name]._default;
        if (_.isUndefined(value)) {
            continue;
        }
        if (_.isFunction(value)) {
            value = value();
        }
        this.set(name, value);
    }
};

/**
 * Set custom methods
 * @private
 * @param {Object} methods
 */
ModelInstance.prototype._setMethods = function (methods) {
    for (var name in methods) {
        this[name] = methods[name].bind(this);
    }
};

/**
 * Assign attributes that match a foreign key
 * @private
 * @param {Reference} reference - The foreign key
 * @param {Object} data - The associated data
 */
ModelInstance.prototype._setForeignKey = function (reference, data) {
    if (!(reference instanceof ForeignKey)) {
        return;
    }
    var fk = this.model._fks[reference._name];
    if (fk) {
        var fields = fk.fields;
        var refFields = fk.refFields;
        for (var i = 0, len = fields.length; i < len; ++i) {
            if (refFields[i] in data && !(fields[i] in this._realValues)) {
                this.set(fields[i], data[refFields[i]]);
            }
        }
    }
};

/**
 * Set a reference attribute
 * @private
 * @param {Reference} ref - The reference
 * @param {string} name - Name of the reference
 * @param {Object} value - Data to build the reference model instance
 */
ModelInstance.prototype._setReference = function (name, value) {
    var reference = this.model._references[name];
    var target = reference._target;
    if (_.isArray(value)) {
        this._references[name] = [ ];
        this._realValues[name] = [ ];
        for (var i = 0, len = value.length; i < len; ++i) {
            if (value[i] instanceof ModelInstance) {
                this._references[name].push(value[i]);
                this._realValues[name].push(value[i].raw());
            } else {
                this._references[name].push(target.build(value[i], { new: false }));
                this._realValues[name].push(value[i]);
            }
        }
    } else {
        if (value instanceof ModelInstance) {
            var raw = value.raw();
            this._references[name] = value;
            this._realValues[name] = raw;
            this._setForeignKey(reference, raw);
        } else {
            this._references[name] = target.build(value, { new: false });
            this._realValues[name] = value;
            this._setForeignKey(reference, value);
        }
    }
};

/**
 * Build the WHERE condition necessary to identify the instance
 * @private
 */
ModelInstance.prototype._buildWhere = function () {
    var model = this.model;
    var aiColumn = model._aiColumn;
    if (aiColumn && aiColumn in this._realValues) {
        this._where = { };
        this._where[aiColumn] = this._realValues[aiColumn];
        return;
    }
    if (model._pk.length > 0) {
        this._where = _.pick(this._realValues, model._pk);
        if (!_.isEmpty(this._where)) { return; }
    }
    this._where = _.pick(model._realValues, _.union(_.keys(model._realValues),
                                                           model._attributes));
};

/**
 * Give the data relative to the instance in an object of the form { fieldName: value }
 * @returns {Object}
 */
ModelInstance.prototype.raw = function () {
    return this._realValues;
};

/**
 * JSON representation of the instance
 * @returns {string}
 */
ModelInstance.prototype.toJSON = function () {
    return JSON.stringify(this._realValues);
};

/**
 * Get the raw value of a field
 * @param {string} name - The name of the field
 * @returns {*}
 */
ModelInstance.prototype.getValue = function (name) {
    return this._realValues[name];
};

/**
 * Set the raw value of a field
 * @param {string} name - The name of the field
 * @param {(string|Number)} value - The value of the field
 */
ModelInstance.prototype.setValue = function (attr, value) {
    this._realValues[attr] = value;
};

/**
 * Get the value of a field using the getter if provided in the model.
 * If the field is a reference it returns the according model instance.
 * If no name is provided it returns an object filled with all values the same way
 * @param {string} [name] - The name of the field
 * @returns {*}
 */
ModelInstance.prototype.get = function (name) {
    if (name) {
        var core = this.model._core;
        if ((name in core) && core[name]._getter) {
            return core[name]._getter.bind(this)(name);
        } else if (name in this._references) {
            return this._references[name];
        }
        return this._realValues[name];
    }
    var o = { };
    for (name in this._realValues) {
        o[name] = this.get(name);
    }
    return o;
};

/**
 * Set the value of a field using the setter if provided in the model.
 * If you pass an object as first argument then it calls set on each key / value.
 * It is possible to set a reference by giving a model instance value or an object.
 * @param {string|Object} name - The name of the field
 * @param {*} [value] - The value of the field
 */
ModelInstance.prototype.set = function (name, value) {
    var core = this.model._core;
    if (arguments.length > 1) {
        if (name in this.model._references) {
            this._setReference(name, value);
            return;
        }
        if (this._newAttr.indexOf(name) < 0) {
            this._newAttr.push(name);
        }
        if ((name in core) && core[name]._setter) {
            return core[name]._setter.bind(this)(value);
        }
        this.setValue(name, value);
        if (this.model._pk.indexOf(name)) {
            this._buildWhere();
        }
    } else if (_.isPlainObject(name)) {
        for (var attrName in name) {
            this.set(attrName, name[attrName]);
        }
    }
};

/**
 * Update the instance with new data and save them in the database.
 * This is equivalent to calling [set](#Instance+set) + [save](#Instance+save)
 * @param {Object} data - The updated data as { fieldName: value }
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
ModelInstance.prototype.update = function (data, options) {
    this.set(data);
    return this.save(options);
};

/**
 * Remove the instance in database and reset it as new
 * This means you can call still use this instance
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
ModelInstance.prototype.remove = function (options) {
    return this.db.query(Sql.delete(this._table, this._name, { where: this._where }), options)
        .bind(this)
        .spread(function (result) {
            if (result.affectedRows > 0) {
                this._isNew = true;
            }
            return this;
        });
};

/**
 * Refresh the instance by fetching data from the database.
 * This does not affect references.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
ModelInstance.prototype.refresh = function (options) {
    var fields = { };
    fields[this._name] = _.keys(this._realValues);
    return this.db.query(Sql.select(this._table, this._name, fields, [ ], {
        where: this._where,
        limit: 1
    }), options).bind(this).spread(function (rows) {
        if (rows.length > 0) {
            this.set(rows[0][this._name]);
        }
        return this;
    });
};

/**
 * Save the instance in the database.
 * If the instance is marked as new it is inserted, otherwise it is updated.
 * The updated data are only the fields that have been explicitly set.
 * @param {Object} [options]
 * @param {external:PoolConnection} [options.using] - Use this connection
 * @returns {external:Promise}
 */
ModelInstance.prototype.save = function (options) {
    var query, p, values;
    if (this._isNew) {
        // insert
        values = _.pick(this._realValues, this.model._attributes);
        query = Sql.insert(this._table, values);
        p = this.db.query(query, options).bind(this)
            .spread(function (res) {
                if (res.insertId > 0 && this.model._aiColumn) {
                    this.set(this.model._aiColumn, res.insertId);
                }
                return this;
            });
    } else if (this._newAttr.length > 0) {
        // update
        values = _.pick(this._realValues, _.intersection(this.model._attributes, this._newAttr));
        query = Sql.update(this._table, this._name, values, { where: this._where });
        p = this.db.query(query, options).return(this);
    } else {
        // Nothing to update
        p = Promise.resolve(this);
    }
    this._newAttr.length = 0;
    return p;
};

module.exports = ModelInstance;
