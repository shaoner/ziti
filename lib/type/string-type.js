'use strict';

var inherits = require('util').inherits;
var BaseType = require('./base-type');

/**
 * @constructor
 * @extends BaseType
 */
var StringType = function (typeName, args) {
    BaseType.call(this, typeName, args);
    this._charset = null;
    this._collate = null;
};
inherits(StringType, BaseType);

/**
 * Set this field charset
 * @chainable
 */
StringType.prototype.charset = function (charsetName) {
    this._charset = charsetName;
    return this;
};


/**
 * Set this field a collation name
 * @chainable
 */
StringType.prototype.collate = function (collationName) {
    this._collate = collationName;
    return this;
};

module.exports = StringType;
