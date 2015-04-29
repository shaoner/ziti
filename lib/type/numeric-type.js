'use strict';

var util = require('util');
var _ = require('lodash');
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

util.inherits(NumericType, BaseType);

/**
 * Set this field as zerofill
 * @returns {NumericType}
 */
NumericType.prototype.zerofill = function (bool) {
    this._zerofill = true;
    return this;
};

/**
 * Set this field as unsigned
 * @returns {NumericType}
 */
NumericType.prototype.unsigned = function () {
    this._unsigned = true;
    return this;
};

module.exports = NumericType;
