'use strict';

var _ = require('lodash');
var BaseType = require('./type/base-type');
var NumericType = require('./type/numeric-type');
var StringType = require('./type/string-type');
var One = require('./type/one');
var Many = require('./type/many');
var ForeignKey = require('./type/foreign-key');

function genType (typeName, Type, defaultArgs) {
    defaultArgs = defaultArgs || [ ];
    return function () {
        var args;
        if (arguments.length > 0) {
            args = Array.prototype.slice.call(arguments);
        } else {
            args = defaultArgs.slice(0);
        }
        args.map(function (arg) {
            if (_.isString(arg)) {
                return '\'' + arg + '\'';
            }
            return arg;
        });
        return new Type(typeName, args);
    };
}

function genReference (Class) {
    return function (target) {
        return new Class(target);
    };
}

/** @namespace */
var types = {
    /**
     * @returns {BaseType}
     */
    Bit:        genType('BIT', BaseType),
    /**
     * @returns {NumericType}
     */
    Tinyint:    genType('TINYINT', NumericType),
    /**
     * @returns {NumericType}
     */
    Smallint:   genType('SMALLINT', NumericType),
    /**
     * @returns {NumericType}
     */
    Mediumint:  genType('MEDIUMINT', NumericType),
    /**
     * @returns {NumericType}
     */
    Int:        genType('INT', NumericType),
    /**
     * @returns {NumericType}
     */
    Integer:    genType('INTEGER', NumericType),
    /**
     * @returns {NumericType}
     */
    Bigint:     genType('BIGINT', NumericType),
    /**
     * @returns {NumericType}
     */
    Real:       genType('REAL', NumericType),
    /**
     * @returns {NumericType}
     */
    Double:     genType('DOUBLE', NumericType),
    /**
     * @returns {NumericType}
     */
    Decimal:    genType('DECIMAL', NumericType),
    /**
     * @returns {NumericType}
     */
    Numeric:    genType('FLOAT', NumericType),
    /**
     * @returns {BaseType}
     */
    Date:       genType('DATE', BaseType),
    /**
     * @returns {BaseType}
     */
    Time:       genType('TIME', BaseType),
    /**
     * @returns {BaseType}
     */
    Timestamp:  genType('TIMESTAMP', BaseType),
    /**
     * @returns {BaseType}
     */
    Datetime:   genType('DATETIME', BaseType),
    /**
     * @returns {StringType}
     */
    Char:       genType('CHAR', StringType),
    /**
     * @returns {StringType}
     */
    Varchar:    genType('VARCHAR', StringType, [ 255 ]),
    /**
     * @returns {BaseType}
     */
    Binary:     genType('BINARY', BaseType),
    /**
     * @returns {BaseType}
     */
    Varbinary:  genType('VARBINARY', BaseType, [ 255 ]),
    /**
     * @returns {BaseType}
     */
    Tinyblob:   genType('TINYBLOB', BaseType),
    /**
     * @returns {BaseType}
     */
    Blob:       genType('BLOB', BaseType),
    /**
     * @returns {BaseType}
     */
    Mediumblob: genType('MEDIUMBLOB', BaseType),
    /**
     * @returns {BaseType}
     */
    Longblob:   genType('LONGBLOB', BaseType),
    /**
     * @returns {StringType}
     */
    Tinytext:   genType('TINYTEXT', StringType),
    /**
     * @returns {StringType}
     */
    Text:       genType('TEXT', StringType),
    /**
     * @returns {StringType}
     */
    Mediumtext: genType('MEDIUMTEXT', StringType),
    /**
     * @returns {StringType}
     */
    Longtext:   genType('LONGTEXT', StringType),
    /**
     * @returns {StringType}
     */
    Enum:       genType('ENUM', StringType),
    /**
     * @returns {StringType}
     */
    Set:        genType('SET', StringType),
    /**
     * @param {(string|Model)} target
     * @returns {One}
     */
    One:        genReference(One),
    /**
     * @param {(string|Model)} target
     * @returns {Many}
     */
    Many:       genReference(Many),
    /**
     * @param {(string|Model)} target
     * @returns {ForeignKey}
     */
    ForeignKey: genReference(ForeignKey)
};

// Aliases
types.Boolean = types.Bool = genType('TINYINT(1)', NumericType);
types.String = types.Varchar;

module.exports = types;
