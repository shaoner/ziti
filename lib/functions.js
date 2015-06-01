'use strict';

var _ = require('lodash');

function simpleFunc (name) {
    return function (column) {
        if (_.isArray(column)) {
            return [ name + '(' + column.shift() + ')' ].concat(column);
        }
        return [ name + '(??)', column ];
    };
}

function opFunc (op) {
    return function (column, value) {
        if (arguments.length < 2) {
            value = 1;
        }
        if (_.isArray(column)) {
            column[0] = column[0] + ' ' + op + ' ?';
            column.push(value);
            return column;
        }
        return [ '?? ' + op + ' ?', column, value ];
    };
}

/**
 * @namespace
 */
var Functions = { };

/**
 * Increment a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The value to add
 */
Functions.$inc = opFunc('+');

/**
 * Decrement a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The value to substract
 */
Functions.$dec = opFunc('-');

/**
 * Divide a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The denominator
 */
Functions.$div = opFunc('/');


/**
 * Integer division of a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The denominator
 */
Functions.$idiv = opFunc('DIV');

/**
 * Multiply a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The value to multiply with
 */
Functions.$mult = opFunc('*');

/**
 * Set the remainder of the column divided by the value
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {Number} [value=1] - The value
 */
Functions.$mod = opFunc('%');

/**
 * Convert to an uppercase column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$upper = simpleFunc('UPPER');

/**
 * Convert to an lowercase column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$lower = simpleFunc('LOWER');

/**
 * Sets the smallest integer value not less than the column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$ceil = simpleFunc('CEIL');

/**
 * Sets the largest integer value not greater than the column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$floor = simpleFunc('FLOOR');

/**
 * Remove leading space of the column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$ltrim = simpleFunc('LTRIM');

/**
 * Remove trailing space of the column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$rtrim = simpleFunc('RTRIM');

/**
 * Remove leading and trailing space of the column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$trim = simpleFunc('TRIM');

/**
 * Sets a random floating-point value between 0 and 1.0.
 * If the value is specified, it is used as the seed value.
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 * @param {*} [seed] - Seed
 */
Functions.$rand = function (seed) {
    if (arguments.length > 0) {
        if (_.isArray(seed)) {
            return [ 'RAND(' + seed.shift() + ')' ].concat(seed);
        }
        return [ 'RAND(?)', seed ];
    }
    return [ 'RAND()' ];
};

/**
 * Sets a hexadecimal string representation of a column
 * @function
 * @param {(string|Array.<*>)} column - Name of the column or the result of another function
 */
Functions.$hex = simpleFunc('HEX');

/**
 * Sets the value of pi
 * @function
 */
Functions.$pi = function () {
    return [ 'PI()' ];
};

/**
 * Sets the current date and time
 * @function
 */
Functions.$now = function () {
    return [ 'NOW()' ];
};

module.exports = Functions;
