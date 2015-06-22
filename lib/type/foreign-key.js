'use strict';

var inherits = require('util').inherits;
var Reference = require('./reference');
var Utils = require('../query/utils');

/**
 * One to one association
 * @constructor
 * @extends Reference
 * @param {(string|Model)} target
 */
var ForeignKey = function (target) {
    Reference.call(this, target);
};
inherits(ForeignKey, Reference);

/**
 * Build a foreign key
 * @private
 * @static
 * @param {Model} source
 * @param {Model} target
 * @param {Array.<string>} fields
 * @param {Array.<string>} refFields
 * @returns {Object}
 */
ForeignKey.generate = function (prefix, target, fields, refFields) {
    var i, len, fk = {
        model: target,
        fields: [ ],
        fieldsType: [ ],
        refTable: target._table,
        refFields: [ ]
    };
    if (fields.length === 0) {
        len = target._pk.length;
        if (len === 0) {
            throw new Error('Cannot create foreign key for ' +
                            target._name + ', provide a primary key or foreign fields');
        }
        for (i = 0; i < len; ++i) {
            var pk = target._pk[i];
            fields.push(prefix + '_' + pk);
            refFields.push(pk);
        }
    }
    for (i = 0, len = fields.length; i < len; ++i) {
        var field = fields[i];
        var refField = refFields[i];
        var refFieldType = target._core[refField]._clone();
        if (refFieldType) {
            fk.fields.push(field);
            fk.refFields.push(refField);
            fk.fieldsType.push(refFieldType);
        }
    }
    return fk;
};

ForeignKey.prototype._build = function () {
    var fk = ForeignKey.generate(this._name, this._target,
                                 this._fields, this._refFields);
    if (this._primaryKey === true) {
        // Set Foreign key fields to primary keys
        for (var i = 0, len = fk.fields.length; i < len; ++i) {
            fk.fieldsType[i].primaryKey();
        }
    }
    this._source._addForeignKey(this._name, fk);
    this._joins.push(Utils.buildJoin(this._joinType,
                                     this._source._name, fk.fields,
                                     this._target._table, this._name,
                                     fk.refFields));
};

module.exports = ForeignKey;
