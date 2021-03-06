'use strict';

var _ = require('lodash');

var exprBinOps = {
    $or: ' OR ',
    $and: ' AND ',
    $xor: ' XOR '
};

var fieldBinOps = {
    $eq: '?? = ?',
    $ne: '?? != ?',
    $lt: '?? < ?',
    $le: '?? <= ?',
    $gt: '?? > ?',
    $ge: '?? >= ?',
    $not: '?? NOT ?',
    $like: '?? LIKE ?',
    $nlike: '?? NOT LIKE ?',
    $in: '?? IN (?)',
    $nin: '?? NOT IN (?)',
    $regexp: '?? REGEXP ?',
    $is: '?? IS ?',
    $nis: '?? IS NOT ?'
};

var Utils = { };

Utils.escape = function (name) {
    return '`' + name.replace(/`/g, '``') + '`';
};

Utils.alias = function (table, name) {
    return '`' + table + '` `' + name + '`';
};

Utils.field = function (name, attribute) {
    return '`' + name + '`.`' + attribute + '`';
};

Utils.fields = function (name, attributes) {
    var sql = '';
    if (attributes.length > 0) {
        sql += Utils.field(name, attributes[0]);
        for (var i = 1, len = attributes.length; i < len; ++i) {
            sql += ', ' + Utils.field(name, attributes[i]);
        }
    }
    return sql;
};

Utils.columnDefinition = function (name, type) {
    var sql = '`' + name + '` ' + type._typeName;
    var values = [ ];
    if (type._unsigned === true) { sql += ' UNSIGNED'; }
    if (type._zerofill === true) { sql += ' ZEROFILL'; }
    if (type._binary === true){ sql += ' BINARY'; }
    if (type._notNull === true) { sql += ' NOT NULL'; }
    if (!_.isUndefined(type._default) && !_.isFunction(type._default)) {
        sql += ' DEFAULT ?';
        values.push(type._default);
    }
    if (type._autoIncrement === true) { sql += ' AUTO_INCREMENT'; }
    if (type._unique === true) { sql += ' UNIQUE'; }
    return { sql: sql, values: values };
};

Utils.parseExpr = function (name, expr) {
    if (_.isPlainObject(expr) && !_.isEmpty(expr)) {
        var keys = _.keys(expr),
            key = keys[0],
            subExpr = expr[key],
            values, i, len;
        if (_.isArray(subExpr) && key in exprBinOps) {
            // Logical operators
            // $operator: [ expr1, expr2, ... ]
            var aSql = [ ];
            values = [ ];
            for (i = 0, len = subExpr.length; i < len; ++i) {
                expr = Utils.parseExpr(name, subExpr[i]);
                aSql.push(expr.sql);
                values = values.concat(expr.values);
            }
            return { sql: '(' + aSql.join(exprBinOps[key]) + ')', values: values };
        } else if (_.isPlainObject(subExpr) && _.size(subExpr) === 1) {
            var subKey = _.keys(subExpr)[0];
            var value = subExpr[subKey];
            if (key in fieldBinOps) {
                // { $operator: { field: value } }
                return {
                    sql: Utils.escape(name) + '.' + fieldBinOps[key],
                    values: [ subKey, value ]
                };
            } else if (subKey in fieldBinOps) {
                // { field: { $operator: value } }
                return {
                    sql: Utils.escape(name) + '.' + fieldBinOps[subKey],
                    values: [ key, value ]
                };
            }
        } else {
            // { field1: value1, field2: value2, ... }
            var prefix = Utils.escape(name);
            var sql = prefix + '.?? = ?';
            values = [ key, subExpr ];
            for (i = 1, len = keys.length; i < len; ++i) {
                var field = keys[i];
                sql += ' AND ' + prefix + '.?? = ?';
                values.push(field, expr[field]);
            }
            return { sql: sql, values: values };
        }
    } else if (_.isArray(expr) && expr.length > 0) {
        // [ sql, arg1, arg2, ... ]
        return { sql: expr[0], values: _.rest(expr) };
    } else if (_.isString(expr)) {
        return { sql: expr, values: [ ] };
    }
    throw new Error('SyntaxError ' + expr);
};

Utils.parseSet = function (data) {
    var sql = [ ], values = [ ];
    for (var attr in data) {
        var value = data[attr];
        if (_.isFunction(value)) {
            value = value(attr);
        }
        if (_.isArray(value)) {
            sql.push('?? = ' + value.shift());
            values.push(attr);
            values = values.concat(value);
        } else {
            sql.push('?? = ?');
            values.push(attr, value);
        }
    }
    return { sql: sql.join(', '), values: values };
};

Utils.buildJoins = function (joins) {
    var sql = '', i, len, j, jlen, structure = joins.structure, values = [ ];
    for (i = 0, len = joins.order.length; i < len; ++i) {
        var rightName = joins.order[i];
        var join = structure[rightName];
        sql += ' ' + join.type + ' ' + Utils.alias(join.table, rightName) + ' ON ' +
            Utils.field(rightName, join.rightFields[0]) + ' = ' +
            Utils.field(join.leftName, join.leftFields[0]);
        for (j = 1, jlen = join.leftFields.length; j < jlen; ++j) {
            sql += ' AND ' + Utils.field(rightName, join.rightFields[j]) + ' = ' +
                Utils.field(join.leftName, join.leftFields[j]);
        }
        if (join.where) {
            var expr = Utils.parseExpr(rightName, join.where);
            sql += ' AND ' + expr.sql;
            values = values.concat(expr.values);
        }
    }
    return { sql: sql, values: values };
};

Utils.parseCondition = function (name, condition) {
    var sql = '', values = [ ], asclen, desclen;
    if (condition.where) {
        var where = Utils.parseExpr(name, condition.where);
        sql += ' WHERE ' + where.sql;
        values = values.concat(where.values);
    }
    if (condition.group && condition.group.length > 0) {
        sql += ' GROUP BY ' + Utils.fields(name, condition.group);
    }
    asclen = condition.asc ? condition.asc.length : 0;
    desclen = condition.desc ? condition.desc.length : 0;
    if (asclen > 0 || desclen > 0) {
        sql += ' ORDER BY ';
        if (asclen > 0) {
            sql += Utils.fields(name, condition.asc) + ' ASC';
        }
        if (desclen > 0) {
            if (asclen > 0) {
                sql += ', ';
            }
            sql += Utils.fields(name, condition.desc) + ' DESC';
        }
    }
    if (condition.limit) {
        sql += ' LIMIT ?';
        values.push(condition.limit);
    }
    return { sql: sql, values: values };
};

module.exports = Utils;
