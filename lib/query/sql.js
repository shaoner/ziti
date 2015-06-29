'use strict';

var _  = require('lodash');
var Utils = require('./utils');

var Sql = { };

Sql.createDatabase = function (name) {
    return { sql: 'CREATE DATABASE IF NOT EXISTS `' + name + '`' };
};

Sql.dropDatabase = function (name) {
    return { sql: 'DROP SCHEMA IF EXISTS `' + name + '`' };
};

Sql.createTable = function (table, core, options) {
    options = _.assign({ pks: [ ], fks: { }, indexes: { }, engine: 'InnoDb' }, options);
    var sql = 'CREATE TABLE IF NOT EXISTS `' + table + '` (', values = [ ],
        name, colDef, elt;

    for (name in core) {
        colDef = Utils.columnDefinition(name, core[name]);
        sql += colDef.sql + ',';
        values = values.concat(colDef.values);
    }
    if (options.pks.length > 0) {
        sql += ' PRIMARY KEY (??),';
        values.push(options.pks);
    }
    // Indexes
    for (name in options.indexes) {
        elt = options.indexes[name];
        if (elt.unique === true) { sql += ' UNIQUE'; }
        else if (elt.fulltext === true) { sql += ' FULLTEXT'; }
        else if (elt.spacial === true) { sql += ' SPACIAL'; }
        if (elt.using) {
            sql += ' INDEX `' + name + '` USING ' + elt.using + ' (??),';
        } else {
            sql += ' INDEX `' + name + '` (??),';
        }
        values.push(elt.fields);
    }
    // Foreign keys
    for (name in options.fks) {
        elt = options.fks[name];
        sql += ' FOREIGN KEY (??) REFERENCES ?? (??)';
        values.push(elt.fields, elt.refTable, elt.refFields);
        if (_.isString(elt.onDelete)) {
            sql += ' ON DELETE ' + elt.onDelete;
        }
        if (_.isString(elt.onUpdate)) {
            sql += ' ON UPDATE ' + elt.onUpdate;
        }
        sql += ',';
    }
    sql = sql.slice(0, -1) + ') ENGINE=' + options.engine;
    return { sql: sql, values: values };
};

Sql.dropTable = function (table) {
    return { sql: 'DROP TABLE IF EXISTS `' + table + '`' };
};

Sql.describe = function (table) {
    return { sql: 'DESCRIBE `' + table + '`' };
};

Sql.alterTable = function (table, add, drop) {
    var sql = 'ALTER TABLE `' + table + '`', values = [ ];
    var name, colDef;

    for (name in add) {
        colDef = Utils.columnDefinition(name, add[name]);
        sql += ' ADD COLUMN ' + colDef.sql + ',';
        values = values.concat(colDef.values);
    }
    for (var i = 0, len = drop.length; i < len; ++i) {
        sql += ' DROP COLUMN `' + drop[i] + '`,';
    }
    sql = sql.slice(0, -1);
    return { sql: sql, values: values };
};

Sql.insert = function (table, data) {
    var sql = 'INSERT INTO `' + table + '` (??) VALUES ', values = [ ];
    if (_.isPlainObject(data)) {
        sql += '(?)';
        values.push(_.keys(data), _.values(data));
        return { sql: sql, values: values };
    }
    var fields = [ ], i, len, j, jlen;
    for (i = 0, len = data.length; i < len; ++i) {
        fields = _.union(fields, _.keys(data[i]));
    }
    values.push(fields);
    var dataValues = data.map(function (dataVal) {
        var row = [ ], curValue;
        for (j = 0, jlen = fields.length; j < jlen; ++j) {
            if (fields[j] in dataVal) {
                curValue = dataVal[fields[j]];
                if (_.isFunction(curValue)) {
                    curValue = curValue(fields[j]);
                }
                if (_.isArray(curValue)) {
                    row.push(curValue.shift());
                    values = values.concat(curValue);
                } else {
                    row.push('?');
                    values.push(curValue);
                }
            } else {
                row.push('DEFAULT');
            }
        }
        return '(' + row.join(', ') + ')';
    });
    sql += dataValues.join(', ');
    return { sql: sql, values: values };
};

Sql.update = function (table, name, data, condition) {
    condition = Utils.parseCondition(name, condition);
    var sql = 'UPDATE ' + Utils.alias(table, name) + ' SET ';
    var set = Utils.parseSet(data);
    var values = set.values;
    sql += set.sql + condition.sql;
    values = values.concat(condition.values);
    return { sql: sql, values: values };
};

Sql.upsert = function (table, data) {
    return {
        sql: 'INSERT INTO `' + table + '` SET ? ON DUPLICATE KEY UPDATE ?',
        values: [ data, data ]
    };
};

Sql.delete = function (table, name, condition) {
    condition = Utils.parseCondition(table, condition);
    var sql = 'DELETE FROM `' + table + '`' + condition.sql, values = condition.values;
    return { sql: sql, values: values };
};

Sql.select = function (table, name, fields, joins, condition) {
    var sql = 'SELECT ', values = [ ], i, len, exprFields = [ ];
    condition = Utils.parseCondition(name, condition);
    for (var modName in fields) {
        var attributes = fields[modName].attributes;
        for (i = 0, len = attributes.length; i < len; ++i) {
            exprFields.push(Utils.field(modName, attributes[i]));
        }
    }
    sql += exprFields.join(', ') + ' FROM ';
    if (joins.order.length > 0) {
        sql += '(SELECT * FROM ' + Utils.alias(table, name) + condition.sql;
        values = values.concat(condition.values);
        sql += ') `' + name + '` ';
        // Append joins
        sql += Utils.buildJoins(joins);
    } else {
        sql += Utils.alias(table, name) + condition.sql;
        values = values.concat(condition.values);
        if (joins.order.length > 0) {
            sql += Utils.buildJoins(joins);
        }
    }
    return { sql: sql, values: values, nestTables: true };
};

Sql.selectOperation = function (operation, table, name, column, condition) {
    condition = Utils.parseCondition(name, condition);
    var sql = 'SELECT ' + operation, values = [ ];
    if (column !== null) {
        sql += '(??)';
        values.push(column);
    } else {
        sql += '(*)';
    }
    sql += ' AS $_result FROM ' + Utils.alias(table, name) + condition.sql;
    values = values.concat(condition.values);
    return { sql: sql, values: values };
};

module.exports = Sql;
