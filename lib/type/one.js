'use strict';

var _ = require('lodash');
var util = require('util');
var Reference = require('./reference');
var ForeignKey = require('./foreign-key');

/**
 * One to one association
 * @constructor
 * @extends Reference
 * @param {(string|Model)} target
 */
var One = function (target) {
    Reference.call(this, target);
    this._unique = true;
    this._relatedName = null;
};

util.inherits(One, Reference);

/**
 * The name to use for the back reference in the target
 * This is useful when setting a One attribute in the source related
 * to an existing ForeignKey attribute in the target
 * @param {string} name - Name of the attribute
 * @returns {One}
 */
One.prototype.relatedName = function (name) {
    this._relatedName = name;
    return this;
};

One.prototype._build = function () {
    var attribute = this._relatedName || this._source._table;
    var fk = ForeignKey.generate(attribute, this._source,
                                 this._refFields, this._fields);
    if (!(('fk_' + attribute) in this._target._fks)) {
        this._target._addForeignKey(attribute, fk);
    }
    // if (!this._attributes) {
    //     this._attributes = _.difference(this._target._attributes, fk.fields);
    // }
    this._joins.push({
        type: this._joinType || 'LEFT JOIN',
        leftName: this._source._name,
        leftFields: fk.refFields,
        rightTable: this._target._table,
        rightName: this._name,
        rightFields: fk.fields
    });
};

module.exports = One;
