'use strict';

var util = require('util');
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

util.inherits(BaseType, AbstractType);

module.exports = BaseType;
