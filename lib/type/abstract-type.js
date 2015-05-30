'use strict';

var _ = require('lodash');

/**
 * @constructor
 */
var AbstractType = function () {
    this._name = null;
    this._source = null;
    this._typeName = null;
    this._primaryKey = false;
    this._unique = false;
    this._autoIncrement = false;
    this._notNull = false;
    this._default = undefined;
    this._scopes = [ '__default__' ];
};

/**
 * Initialize a type
 * @private
 * @param {Model} source - The source model
 * @param {string} name - The name of the attribute
 */
AbstractType.prototype._init = function (source, name) {
    this._source = source;
    this._name = name;
};

/**
 * Set this field as primary key
 * @returns {AbstractType}
 */
AbstractType.prototype.primaryKey = function () {
    this._primaryKey = true;
    return this;
};

/**
 * Set this field as unique
 * @returns {AbstractType}
 */
AbstractType.prototype.unique = function () {
    this._unique = true;
    return this;
};

/**
 * Set this field as auto increment
 * @returns {AbstractType}
 */
AbstractType.prototype.autoIncrement = function () {
    this._autoIncrement = true;
    return this;
};

/**
 * Set this field as not null
 * @returns {AbstractType}
 */
AbstractType.prototype.notNull = function () {
    this._notNull = true;
    return this;
};

/**
 * Set a default value for this field
 * If the value is a function, it's evaluated during the insertion
 * @param {(string|Number|Function)} value
 * @returns {AbstractType}
 */
AbstractType.prototype.default = function (value) {
    this._default = value;
    return this;
};

/**
 * Set a getter
 * @param {Function} fn
 * @returns {AbstractType}
 */
AbstractType.prototype.get = function (fn) {
    this._getter = fn;
    return this;
};

/**
 * Set a setter
 * @param {Function} fn
 * @returns {AbstractType}
 */
AbstractType.prototype.set = function (fn) {
    this._setter = fn;
    return this;
};

/**
 * Set a typename
 * @private
 * @param {string} typeName
 */
AbstractType.prototype._setTypename = function (typeName) {
    this._typeName = typeName;
};

/**
 * Clone this field
 * @private
 * @returns {AbstractType}
 */
AbstractType.prototype._clone = function () {
    var type = new this.constructor(this._typeName);
    if (this._primaryKey === true) {
        type.primaryKey();
    }
    return type;
};

/**
 * Add this field to a scope or multiple scopes
 * @param {(string|Array.<string>)} scope
 * @returns {AbstractType}
 */
AbstractType.prototype.$ = function (scope) {
    if (_.isArray(scope)) {
        for (var i = 0, len = scope.length; i < len; ++i) {
            this._scopes.push(scope[i]);
        }
    } else {
        this._scopes.push(scope);
    }
    return this;
};

module.exports = AbstractType;
