'use strict';

var util = require('util');
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

util.inherits(StringType, BaseType);

/**
 * Set this field charset
 * @returns {StringType}
 */
StringType.prototype.charset = function (charsetName) {
    this._charset = charsetName;
    return this;
};


/**
 * Set this field a collation name
 * @returns {StringType}
 */
StringType.prototype.collate = function (collationName) {
    this._collate = collationName;
    return this;
};

module.exports = StringType;
