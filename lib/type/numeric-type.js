'use strict';

var inherits = require('util').inherits;
var BaseType = require('./base-type');

/**
 * @constructor
 * @extends BaseType
 */
var NumericType = function (typeName, args) {
    BaseType.call(this, typeName, args);
    this._zerofill = false;
    this._unsigned = false;
};
inherits(NumericType, BaseType);

/**
 * Set this field as zerofill
 * @chainable
 */
NumericType.prototype.zerofill = function () {
    this._zerofill = true;
    return this;
};

/**
 * Set this field as unsigned
 * @chainable
 */
NumericType.prototype.unsigned = function () {
    this._unsigned = true;
    return this;
};

module.exports = NumericType;
