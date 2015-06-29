'use strict';

var Sql = require('./sql');

var QueryToSql = { };

QueryToSql.select = function (query) {
    query._setFields();
    return Sql.select(query._table, query._name, query._fields, query._joins, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc,
        group: query._group
    });
};

QueryToSql.update = function (query) {
    return Sql.update(query._table, query._name, query._fields, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

QueryToSql.delete = function (query) {
    return Sql.delete(query._table, query._name, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

QueryToSql.sum = function (query) {
    return Sql.selectOperation('SUM', query._table, query._name, query._column, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

QueryToSql.count = function (query) {
    return Sql.selectOperation('COUNT', query._table, query._name, query._column, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

QueryToSql.min = function (query) {
    return Sql.selectOperation('MIN', query._table, query._name, query._column, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

QueryToSql.max = function (query) {
    return Sql.selectOperation('MAX', query._table, query._name, query._column, {
        where: query._where,
        limit: query._limit,
        asc: query._asc,
        desc: query._desc
    });
};

module.exports = QueryToSql;
