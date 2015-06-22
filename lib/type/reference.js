'use strict';

var inherits = require('util').inherits;
var _ = require('lodash');
var AbstractType = require('./abstract-type');

/**
 * @ignore
 * @constructor
 * @extends AbstractType
 */
var Reference = function (target) {
    AbstractType.call(this);
    this._dependencies = [ ];
    this._target = null;
    this._fields = [ ];
    this._refFields = [ ];
    this._joins = [ ];
    this._joinType = 'LEFT JOIN';
    this._isBuild = false;
    this._addDependency(target);
};
inherits(Reference, AbstractType);

Reference.prototype._addDependency = function (target) {
    this._dependencies.push(target);
};

Reference.prototype._resolveDependency = function (target) {
    this._target = target;
    _.pullAt(this._dependencies, 0);
    this._build();
};

/**
 * Set a link between source and target using { sourceField: targetField }
 * @param {Object} link
 * @chainable
 */
Reference.prototype.on = function (link) {
    if (_.size(link) > 0) {
        this._fields = _.keys(link);
        this._refFields = _.values(link);
    }
    return this;
};

/**
 * Override the join type which is 'LEFT JOIN' by default
 * @param {string} type
 * @chainable
 */
Reference.prototype.joinType = function (type) {
    this._joinType = type;
    return this;
};

module.exports = Reference;
