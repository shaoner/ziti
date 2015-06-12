'use strict';

var inherits = require('util').inherits;
var AbstractType = require('./abstract-type');

/**
 * @constructor
 * @extends AbstractType
 */
var BaseType = function (typeName, args) {
    AbstractType.call(this);

    if (args && args.length > 0) {
        typeName += '(' + args.join(', ') + ')';
    }
    this._setTypename(typeName);
};
inherits(BaseType, AbstractType);

module.exports = BaseType;
