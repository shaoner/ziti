'use strict';

var inherits = require('util').inherits;
var Reference = require('./reference');
var ForeignKey = require('./foreign-key');
var Utils = require('../query/utils');

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
inherits(One, Reference);

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
    if (!(attribute in this._target._fks)) {
        this._target._addForeignKey(attribute, fk);
    }
    this._joins.push(Utils.buildJoin(this._joinType || 'LEFT JOIN',
                                     this._source._name, fk.refFields,
                                     this._target._table, this._name,
                                     fk.fields));
};

module.exports = One;
