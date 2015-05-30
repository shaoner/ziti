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

var QueryBuilder = { };

function parseJoin (join) {
    var rightName = join.rightName;
    var sql = ' ' + join.type + ' ?? ?? ON ??.?? = ??.??';
    var values = [ join.rightTable, rightName, rightName, join.rightFields[0],
                   join.leftName, join.leftFields[0] ];
    for (var i = 1, len = join.leftFields.length; i < len; ++i) {
        sql += ' AND ??.?? = ??.??';
        values.push(rightName, join.rightFields[i],
                    join.leftName, join.leftFields[i]);
    }
    return { sql: sql, values: values };
}

function columnDefinition (name, type) {
    var sql = '?? ' + type._typeName;
    var values = [ name ];
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
}

QueryBuilder.createDatabase = function (name) {
    return { sql: 'CREATE DATABASE IF NOT EXISTS ??', values: [ name ] };
};

QueryBuilder.dropDatabase = function (name) {
    return { sql: 'DROP SCHEMA IF EXISTS ??', values: [ name ] };
};

QueryBuilder.createTable = function (table, core, options) {
    options = _.assign({ pks: [ ], fks: { }, indexes: { }, engine: 'InnoDb' }, options);
    var sql = 'CREATE TABLE IF NOT EXISTS ?? (',
        values = [ table ], name, colDef, idx, fk;
    for (name in core) {
        colDef = columnDefinition(name, core[name]);
        sql += colDef.sql + ',';
        values = values.concat(colDef.values);
    }
    // Primary key
    if (options.pks.length > 0) {
        sql += ' PRIMARY KEY (??),';
        values.push(options.pks);
    }
    // Indexes
    for (name in options.indexes) {
        idx = options.indexes[name];
        if (idx.unique === true) { sql += ' UNIQUE'; }
        else if (idx.fulltext === true) { sql += ' FULLTEXT'; }
        else if (idx.spacial === true) { sql += ' SPACIAL'; }
        sql += idx.using ? ' INDEX USING ' + idx.using : ' INDEX';
        sql += ' (??),';
        values.push(idx.fields);
    }
    // Foreign keys
    for (name in options.fks) {
        fk = options.fks[name];
        sql += ' FOREIGN KEY (??) REFERENCES ?? (??)';
        values.push(fk.fields, fk.refTable, fk.refFields);
        if (_.isString(fk.onDelete)) {
            sql += ' ON DELETE ' + fk.onDelete;
        }
        if (_.isString(fk.onUpdate)) {
            sql += ' ON UPDATE ' + fk.onUpdate;
        }
        sql += ',';
    }
    sql = sql.slice(0, -1) + ') ENGINE=' + options.engine;
    return { sql: sql, values: values };
};

QueryBuilder.dropTable = function (table) {
    return { sql: 'DROP TABLE IF EXISTS ??', values: [ table ] };
};

QueryBuilder.showColumns = function (table) {
    return { sql: 'SHOW COLUMNS FROM ??', values: [ table ] };
};

QueryBuilder.alterTable = function (table, options) {
    var sql = 'ALTER TABLE ??';
    var values = [ table ];
    var colDef;

    if (_.isPlainObject(options.add)) {
        for (var attrName in options.add) {
            colDef = columnDefinition(attrName, options.add[attrName]);
            sql += ' ADD COLUMN ' + colDef.sql + ',';
            values = values.concat(colDef.values);
        }
    }

    if (_.isArray(options.drop)) {
        for (var i = 0, len = options.drop.length; i < len; ++i) {
            sql += ' DROP COLUMN ??,';
        }
        values = values.concat(options.drop);
    }
    sql = sql.slice(0, -1);
    return { sql: sql, values: values };
};

QueryBuilder.select = function (attrs, table, options) {
    options = options || { };
    var name = options.as || table;
    var selectFields = QueryBuilder.parseFields(attrs);
    var sql = 'SELECT ' + selectFields.sql;
    var values = selectFields.values;
    sql += ' FROM ?? ??';
    values.push(table, name);
    if (options.joins) {
        var join, i, len = options.joins.length;
        // Append joins
        for (i = 0; i < len; ++i) {
            join = parseJoin(options.joins[i]);
            sql += join.sql;
            values = values.concat(join.values);
        }
    } else {
        sql += ' FROM ?? ??';
        values.push(table, name);
    }
    if (options.where) {
        var expr = QueryBuilder.parseExpr(name, options.where);
        sql += ' WHERE ' + expr.sql;
        values = values.concat(expr.values);
    }
    if (options.limit) {
        sql += ' LIMIT ?';
        values.push(options.limit);
    }
    return { sql: sql, values: values, nestTables: true };
};

QueryBuilder.insert = function (table, data) {
    if (_.isPlainObject(data)) {
        return { sql: 'INSERT INTO ?? SET ?', values: [ table, data ] };
    }
    var sql = 'INSERT INTO ?? (??) VALUES ';
    var fields = [ ], values = [ table ];
    var i, len, j, jlen;
    for (i = 0, len = data.length; i < len; ++i) {
        fields = _.union(fields, _.keys(data[i]));
    }
    values.push(fields);
    var row, dataValues = [ ];
    for (i = 0; i < len; ++i) {
        row = [ ];
        for (j = 0, jlen = fields.length; j < jlen; ++j) {
            if (fields[j] in data[i]) {
                row.push('?');
                values.push(data[i][fields[j]]);
            } else {
                row.push('DEFAULT');
            }
        }
        dataValues.push('(' + row.join(', ') + ')');
    }
    sql += dataValues.join(', ');
    return { sql: sql, values: values };
};

QueryBuilder.update = function (table, name, data, options) {
    var sql = 'UPDATE ?? ?? SET ?';
    var values = [ table, name, data ];
    if (options.where) {
        var expr = QueryBuilder.parseExpr(name, options.where);
        sql += ' WHERE ' + expr.sql;
        values = values.concat(expr.values);
    }
    return { sql: sql, values: values };
};

QueryBuilder.remove = function (table, name, options) {
    var sql = 'DELETE FROM ?? USING ?? ??';
    var values = [ name, table, name ];
    if (options.where) {
        var expr = QueryBuilder.parseExpr(name, options.where);
        sql += ' WHERE ' + expr.sql;
        values = values.concat(expr.values);
    }
    return { sql: sql, values: values };
};

QueryBuilder.parseFields = function (fields) {
    var sql = [ ], values = [ ];
    for (var name in fields) {
        var attribute = fields[name];
        for (var i = 0, len = attribute.length; i < len; ++i) {
            sql.push('??.??');
            values.push(name, attribute[i]);
        }
    }
    return { sql: sql.join(', '), values: values };
};

QueryBuilder.parseExpr = function (name, expr) {
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
                expr = QueryBuilder.parseExpr(name, subExpr[i]);
                aSql.push(expr.sql);
                values = values.concat(expr.values);
            }
            return { sql: aSql.join(exprBinOps[key]), values: values };
        } else if (_.isPlainObject(subExpr) && _.size(subExpr) === 1) {
            var subKey = _.keys(subExpr)[0];
            var value = subExpr[subKey];
            if (key in fieldBinOps) {
                // { $operator: { field: value } }
                return { sql: '??.' + fieldBinOps[key], values: [ name, subKey, value ] };
            } else if (subKey in fieldBinOps) {
                // { field: { $operator: value } }
                return { sql: '??.' + fieldBinOps[subKey], values: [ name, key, value ] };
            }
        } else {
            // { field1: value1, field2: value2, ... }
            var sql = '??.?? = ?';
            values = [ name, key, subExpr ];
            for (i = 1, len = keys.length; i < len; ++i) {
                var field = keys[i];
                sql += ' AND ??.?? = ?';
                values.push(name, field, expr[field]);
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

module.exports = QueryBuilder;
