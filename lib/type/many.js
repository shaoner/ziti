'use strict';

var _ = require('lodash');
var inherits = require('util').inherits;
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
    this._throughRelatedName = null;
};
inherits(Many, One);

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
 * @chainable
 */
Many.prototype.through = function(target) {
    this._addDependency(target);
    this.through = undefined;
    return this;
};


/**
 * The name to use for the back reference in the target
 * This is useful when setting a Many attribute in the source related
 * to an existing ForeignKey attribute in the target
 * Note that if it is used after [through](/api/types/#Many+through),
 * it refers to the intermediary target
 * @param {string} name - Name of the attribute
 * @chainable
 * @example
 * var UserLanguage = ziti.define('UserLanguage', {
 *     lang: ziti.ForeignKey('Language'),
 *     speaker: ziti.ForeignKey('User')
 * });
 *
 * var Language = ziti.define('Language', {
 *     name: ziti.String,
 *     users: ziti.Many('User')
 *                .relatedName('lang')
 *                .through(UserLanguage)
 *                .relatedName('speaker')
 * });
 *
 * var User = ziti.define('User', {
 *     nickname: ziti.String,
 *     langs: ziti.Many(Language)
 *                .relatedName('speaker')
 *                .through(UserLanguage)
 *                .relatedName('lang')
 * });
 */
Many.prototype.relatedName = function (name) {
    if (this._dependencies.length > 1) {
        this._throughRelatedName = name;
    } else {
        this._relatedName = name;
    }
    return this;
};

Many.prototype._build = function () {
    if (this._throughTarget === null) {
        return One.prototype._build.call(this);
    }
    if (!this._relatedName) {
        this._relatedName = this._source._table;
    }
    if (!this._throughRelatedName) {
        this._throughRelatedName = this._target._table;
    }
    var name = this._throughRelatedName, target = this._throughTarget, fk;
    if (!(name in target._references) && !(name in target._core)) {
        fk = new ForeignKey(this._target);
        fk._leftFields = [ ];
        fk._rightFields = [ ];
        fk._target = this._target;
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
    name = this._relatedName;
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

module.exports = Many;
