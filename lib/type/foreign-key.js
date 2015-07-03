'use strict';

var inherits = require('util').inherits;
var Reference = require('./reference');

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
 * @returns {Object}
 */
ForeignKey.prototype._generate = function () {
    var prefix = this._name, target = this._target, fields = this._leftFields,
        refFields = this._rightFields;
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
    var fk = this._generate();
    if (this._unique === true && fk.fields.length > 1) {
        this._unique = fk.fields.join('_');
    }
    if (this._primaryKey === true || this._unique !== false) {
        // Set Foreign key fields to primary keys
        for (var i = 0, len = fk.fields.length; i < len; ++i) {
            var type = fk.fieldsType[i];
            type._primaryKey = this._primaryKey;
            type._unique = this._unique;
        }
    }
    this._leftFields = fk.fields;
    this._rightFields = fk.refFields;
    this._source._addForeignKey(this._name, fk);
};

module.exports = ForeignKey;
