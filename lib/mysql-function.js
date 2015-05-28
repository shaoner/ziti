'use strict';

var MysqlFunction = function (name, args) {
    this._name = name + '(';
    if (args) {
        this._name += args.join(', ');
    }
    this._name += ')';
};

MysqlFunction.prototype.toString = function () {
    return this._name;
};

module.exports = MysqlFunction;
