'use strict';

var _ = require('lodash');
var util = require('util');
var One = require('./one');
var ForeignKey = require('./foreign-key');

/**
 * (One|many) to many association
 * @constructor
 * @extends One
 * @param {(string|Model)} target - The referenced model
 */
var Many = function (target) {
    One.call(this, target);
    this._unique = false;
    this._throughTarget = null;
};

util.inherits(Many, One);

Many.prototype._resolveDependency = function (model) {
    var idx = this._dependencies.indexOf(model._name);
    if (idx < 0) {
        throw new Error('Cannot find dependency ' + model._name + ' for ' +
                        this._source._name + ':' + this._name);
    }
    if (idx === 0 && this._target === null) {
        this._target = model;
    } else {
        this._throughTarget = model;
    }
    _.pullAt(this._dependencies, idx);
    if (this._dependencies.length === 0) {
        this._build();
    }
};

/**
 * Set an intermediary target when using a many to many association
 * @param {(string|Model)} target - The intermediary model
 * @returns {Many}
 */
Many.prototype.through = function(target) {
    this._addDependency(target);
    this.through = undefined;
    return this;
};

Many.prototype._build = function () {
    if (this._throughTarget === null) {
        return One.prototype._build.call(this);
    }
    var fk;
    var attribute = this._relatedName || this._source._table;
    fk = ForeignKey.generate(this._throughTarget, this._source,
                             this._refFields, this._fields);
    if (!(('fk_' + attribute) in this._throughTarget._fks)) {
        this._throughTarget._addForeignKey(attribute, fk);
    }
    this._joins.push({
        type: this._joinType || 'LEFT JOIN',
        leftName: this._source._name,
        leftFields: fk.refFields,
        rightTable: this._throughTarget._table,
        rightName: this._throughTarget._name,
        rightFields: fk.fields
    });
    fk = ForeignKey.generate(this._throughTarget, this._target, [ ], [ ]);
    if (!(('fk_' + this._name) in this._throughTarget._fks)) {
        this._throughTarget._addForeignKey(this._name, fk);
    }
    this._joins.push({
        type: this._joinType || 'LEFT JOIN',
        leftName: this._throughTarget._name,
        leftFields: fk.fields,
        rightTable: this._target._table,
        rightName: this._name,
        rightFields: fk.refFields
    });
};

module.exports = Many;
