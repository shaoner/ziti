'use strict';

var inherits = require('util').inherits;
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
inherits(One, Reference);

/**
 * The name to use for the back reference in the target
 * This is useful when setting a One attribute in the source related
 * to an existing ForeignKey attribute in the target
 * @param {string} name - Name of the attribute
 * @chainable
 */
One.prototype.relatedName = function (name) {
    this._relatedName = name;
    return this;
};

One.prototype._build = function () {
    if (!this._relatedName) {
        this._relatedName = this._source._table;
    }
    var name = this._relatedName, target = this._target, fk;
    if (!(name in target._references) && !(name in target._core)) {
        fk = new ForeignKey(this._source);
        fk._leftFields = this._rightFields;
        fk._rightFields = this._leftFields;
        fk._target = this._source;
        target._addReference(name, fk);
        fk._build();
    } else if (name in target._references &&
               target._references[name] instanceof ForeignKey) {
        fk = target._references[name];
    } else {
        throw new Error('Cannot add a new Foreign Key named ' + name + ' in ' +
                        target._name + ' another field has the same name. ' +
                        'Use relatedName(\'somethingElse\') to fix that');
    }
    if (this._leftFields.length < 1 || this._rightFields.length < 1) {
        this._leftFields = fk._rightFields;
        this._rightFields = fk._leftFields;
    }
};

module.exports = One;
