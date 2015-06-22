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

/**
 * @external Model
 * @see {@link /api/model}
 */

/** @mixin */
var Types = {
    /**
     * A bit-field type
     * @param {Number} [M=1] - The number of bits per value, from 1 to 64
     * @returns {BaseType}
     */
    Bit:        genType('BIT', BaseType),
    /**
     * A very small integer. The signed range is -128 to 127. The unsigned range is 0 to 255. 
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Tinyint:    genType('TINYINT', NumericType),
    /**
     * A small integer. The signed range is -32768 to 32767. The unsigned range is 0 to 65535. 
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Smallint:   genType('SMALLINT', NumericType),
    /**
     * A medium-sized integer. The signed range is -8388608 to 8388607. The unsigned range is 0 to 16777215.
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Mediumint:  genType('MEDIUMINT', NumericType),
    /**
     * A normal-size integer. The signed range is -2147483648 to 2147483647. The unsigned range is 0 to 4294967295.
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Int:        genType('INT', NumericType),
    /**
     * Synonym for INT
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Integer:    genType('INTEGER', NumericType),
    /**
     * A large integer. The signed range is -9223372036854775808 to 9223372036854775807. The unsigned range is 0 to 18446744073709551615.
     * @param {Number} [M] - The maximum display width
     * @returns {NumericType}
     */
    Bigint:     genType('BIGINT', NumericType),
    /**
     * A normal-size (double-precision) floating-point number. Permissible values are -1.7976931348623157E+308 to -2.2250738585072014E-308, 0, and 2.2250738585072014E-308 to 1.7976931348623157E+308. 
     * @param {Number} [M] - The total number of digits
     * @param {Number} [D] - The number of digits following the decimal point
     * @returns {NumericType}
     */
    Double:     genType('DOUBLE', NumericType),
    /**
     * Synonym for Double
     * @param {Number} [M] - The total number of digits
     * @param {Number} [D] - The number of digits following the decimal point
     * @returns {NumericType}
     */
    Real:       genType('REAL', NumericType),
    /**
     * A packed "exact" fixed-point number.
     * @param {Number} [M] - The total number of digits (the precision)
     * @param {Number} [D] - The number of digits after the decimal point (the scale)
     * @returns {NumericType}
     */
    Decimal:    genType('DECIMAL', NumericType),
    /**
     * Synonym for Decimal
     * @param {Number} [M] - The total number of digits (the precision)
     * @param {Number} [D] - The number of digits after the decimal point (the scale)
     * @returns {NumericType}
     */
    Numeric:    genType('NUMERIC', NumericType),
    /**
     * A small (single-precision) floating-point number. Permissible values are -3.402823466E+38 to -1.175494351E-38, 0, and 1.175494351E-38 to 3.402823466E+38.
     * @param {Number} [M] - The total number of digits
     * @param {Number} [D] - The number of digits after the decimal point
     * @returns {NumericType}
     */
    Float:    genType('FLOAT', NumericType),
    /**
     * A date
     * @returns {BaseType}
     */
    Date:       genType('DATE', BaseType),
    /**
     * A time
     * @returns {BaseType}
     */
    Time:       genType('TIME', BaseType),
    /**
     * A timestamp
     * @returns {BaseType}
     */
    Timestamp:  genType('TIMESTAMP', BaseType),
    /**
     * A date and time combination
     * @returns {BaseType}
     */
    Datetime:   genType('DATETIME', BaseType),
    /**
     * A fixed-length string that is always right-padded with spaces to the specified length when stored.
     * @param {Number} [M=1] - The column length in characters
     * @returns {StringType}
     */
    Char:       genType('CHAR', StringType),
    /**
     * A variable-length string.
     * @param {Number} [M=255] - The column length in characters
     * @returns {StringType}
     */
    Varchar:    genType('VARCHAR', StringType, [ 255 ]),
    /**
     * Similar to the CHAR type, but stores binary byte strings rather than nonbinary character strings.
     * @param {Number} [M=1] - The column length in characters
     * @returns {BaseType}
     */
    Binary:     genType('BINARY', BaseType),
    /**
     * Similar to the VARCHAR type, but stores binary byte strings rather than nonbinary character strings.
     * @param {Number} [M=255] - The column length in characters
     * @returns {BaseType}
     */
    Varbinary:  genType('VARBINARY', BaseType, [ 255 ]),
    /**
     * A BLOB column with a maximum length of 255 bytes
     * @returns {BaseType}
     */
    Tinyblob:   genType('TINYBLOB', BaseType),
    /**
     * A BLOB column with a maximum length of 65,535 bytes
     * @param {Number} [M] - A maximum length of bytes
     * @returns {BaseType}
     */
    Blob:       genType('BLOB', BaseType),
    /**
     * A BLOB column with a maximum length of 16,777,215 bytes
     * @returns {BaseType}
     */
    Mediumblob: genType('MEDIUMBLOB', BaseType),
    /**
     * A BLOB column with a maximum length of 4GB
     * @returns {BaseType}
     */
    Longblob:   genType('LONGBLOB', BaseType),
    /**
     * A TEXT column with a maximum length of 255 characters
     * @returns {StringType}
     */
    Tinytext:   genType('TINYTEXT', StringType),
    /**
     * A TEXT column with a maximum length of 65,535 characters
     * @returns {StringType}
     */
    Text:       genType('TEXT', StringType),
    /**
     * A TEXT column with a maximum length of 16,777,215 characters
     * @returns {StringType}
     */
    Mediumtext: genType('MEDIUMTEXT', StringType),
    /**
     * A TEXT column with a maximum length of 4GB characters
     * @returns {StringType}
     */
    Longtext:   genType('LONGTEXT', StringType),
    /**
     * An enumeration. A string object that can have only one value, chosen from the list of values
     * @param {...string} values - The list of values
     * @returns {StringType}
     */
    Enum:       genType('ENUM', StringType),
    /**
     * A set. A string object that can have zero or more values, each of which must be chosen from the list of values
     * @param {...string} values - The list of values
     * @returns {StringType}
     */
    Set:        genType('SET', StringType),
    /**
     * A reference to one other Model. This create a foreign key in the target Model matching the primary key of the source model. This reference is retrieved as a Model Instance.
     * @param {(string|external:Model)} target
     * @returns {One}
     */
    One:        genReference(One),
    /**
     * A reference to multiple other Models. This create a foreign key in the target Model matching the primary key of the source model. This reference is retrieved as an Array of Model Instances.
     * @param {(string|external:Model)} target
     * @returns {Many}
     */
    Many:       genReference(Many),
    /**
     * A foreign key matching the primary key of the target Model
     * @param {(string|external:Model)} target
     * @returns {ForeignKey}
     */
    ForeignKey: genReference(ForeignKey)
};

// Aliases

/**
 * Synonym for Tinyint(1)
 * @returns {NumericType}
 */
Types.Boolean = Types.Bool = genType('TINYINT(1)', NumericType);

/**
 * Synonym for Varchar
 * @param {Number} [M=255] - The column length in characters
 * @returns {StringType}
 */
Types.String = Types.Varchar;

/**
 * The current date, this is mainly used when you want to set a default new date
 * @returns {Function}
 * @example
 * var User = ziti.define('User', {
 *     signup_date: ziti.Datetime().default(ziti.NOW)
 * });
 */
Types.NOW = function () { return new Date(); };

/**
 * A shortcut for ziti.Int().primaryKey().autoIncrement().notNull()
 * @returns {NumericType}
 */
Types.Id = function () {
    return this.Int().primaryKey().autoIncrement().notNull();
};

module.exports = Types;
