var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');
var Utils = require('../lib/query/utils');

describe('Queries', function () {

    var Animal;

    before(function () {
        Animal = require('./models/animal');
    });
    before(hooks.sync);
    before(function (done) {
        Animal.save([
            { kind: 'panda', name: 'po', age: 15 },
            { kind: 'monkey', name: 'abu', age: 10 }
        ]).finally(done).catch(done);
    });
    after(hooks.clean);

    describe('Raw queries', function () {

        it('should do a simple query using ziti', function (done) {
            ziti.query('SELECT `kind`, `name` FROM `animal`')
                .spread(function(result) {
                    expect(result).to.be.an('array').and.to.have.length(2);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                    expect(result[1]).to.have.property('kind');
                    expect(result[1]).to.have.property('name');
                }).finally(done).catch(done);
        });

        it('should do a query with escaped values using ziti', function (done) {
            ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? > ?',
                         values: [ [ 'kind', 'name' ], 'animal', 'age', 10 ] })
                .spread(function (result) {
                    expect(result).to.be.an('array').and.to.have.length(1);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                }).finally(done).catch(done);
        });

        it('should do a query with escaped values using ziti (2nd form)', function (done) {
            ziti.query([ 'SELECT ?? FROM ?? WHERE ?? > ?', [ 'kind', 'name' ],
                         'animal', 'age', 10 ])
                .spread(function (result) {
                    expect(result).to.be.an('array').and.to.have.length(1);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                }).finally(done).catch(done);
        });

        it('should do a select using Model', function (done) {
            Animal.query('SELECT `kind`, `name` FROM `animal`')
                .spread(function(result) {
                    expect(result).to.be.an('array').and.to.have.length(2);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                    expect(result[1]).to.have.property('kind');
                    expect(result[1]).to.have.property('name');
                }).finally(done).catch(done);
        });

        it('should do a query with escaped values using Model', function (done) {
            Animal.query({ sql: 'SELECT ?? FROM ?? WHERE ?? > ?',
                         values: [ [ 'kind', 'name' ], Animal.table, 'age', 10 ] })
                .spread(function (result) {
                    expect(result).to.be.an('array').and.to.have.length(1);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                }).finally(done).catch(done);
        });

        it('should do a query with escaped values using Model (2nd form)', function (done) {
            Animal.query([ 'SELECT ?? FROM ?? WHERE ?? > ?', [ 'kind', 'name' ],
                           Animal.table, 'age', 10 ])
                .spread(function (result) {
                    expect(result).to.be.an('array').and.to.have.length(1);
                    expect(result[0]).to.have.property('kind');
                    expect(result[0]).to.have.property('name');
                }).finally(done).catch(done);
        });

    });

    describe('Expressions', function () {
        it('should build the expression: a = b', function (done) {
            var expr = Utils.parseExpr('foo', { id: 1 });
            expect(expr.sql).to.equals('`foo`.?? = ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a = b AND c = d', function (done) {
            var expr = Utils.parseExpr('foo', { id: 1, name: 'bar' });
            expect(expr.sql).to.equals('`foo`.?? = ? AND `foo`.?? = ?');
            expect(expr.values).to.eql([ 'id', 1, 'name', 'bar' ]);
            done();
        });

        it('should build the expression: a = b AND c = d (2nd form)', function (done) {
            var expr = Utils.parseExpr('foo', { $and: [ { id: 1 }, { name: 'bar' } ] });
            expect(expr.sql).to.equals('(`foo`.?? = ? AND `foo`.?? = ?)');
            expect(expr.values).to.eql([ 'id', 1, 'name', 'bar' ]);
            done();
        });

        it('should build the expression: a = b OR c = d', function (done) {
            var expr = Utils.parseExpr('foo', { $or: [ { id: 1 }, { name: 'bar' } ] });
            expect(expr.sql).to.equals('(`foo`.?? = ? OR `foo`.?? = ?)');
            expect(expr.values).to.eql([ 'id', 1, 'name', 'bar' ]);
            done();
        });


        it('should build the expression: (a = b AND c = d) OR (e = f)', function (done) {
            var expr = Utils.parseExpr('foo', {
                $or: [ { $and: [ { id: 1 }, { name: 'bar' } ] }, { name: 'foo' } ]
            });
            expect(expr.sql).to.equals('((`foo`.?? = ? AND `foo`.?? = ?) OR `foo`.?? = ?)');
            expect(expr.values).to.eql([ 'id', 1, 'name', 'bar', 'name', 'foo' ]);
            done();
        });

        it('should build the expression: (a = b AND c = d) OR (e = f)', function (done) {
            var expr = Utils.parseExpr('foo', {
                $or: [ { $and: [ { id: 1 }, { name: 'bar' } ] }, { name: 'foo' } ]
            });
            expect(expr.sql).to.equals('((`foo`.?? = ? AND `foo`.?? = ?) OR `foo`.?? = ?)');
            expect(expr.values).to.eql([ 'id', 1, 'name', 'bar', 'name', 'foo' ]);
            done();
        });


        it('should build the expression: a = b (2nd form)', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $eq: 1 } });
            expect(expr.sql).to.equals('`foo`.?? = ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a = b (3rd form)', function (done) {
            var expr = Utils.parseExpr('foo', { $eq: { id: 1 } });
            expect(expr.sql).to.equals('`foo`.?? = ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a > b', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $gt: 1 } });
            expect(expr.sql).to.equals('`foo`.?? > ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a >= b', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $ge: 1 } });
            expect(expr.sql).to.equals('`foo`.?? >= ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a < b', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $lt: 1 } });
            expect(expr.sql).to.equals('`foo`.?? < ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a <= b', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $le: 1 } });
            expect(expr.sql).to.equals('`foo`.?? <= ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a != b', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $ne: 1 } });
            expect(expr.sql).to.equals('`foo`.?? != ?');
            expect(expr.values).to.eql([ 'id', 1 ]);
            done();
        });

        it('should build the expression: a NOT NULL', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $not: null } });
            expect(expr.sql).to.equals('`foo`.?? NOT ?');
            expect(expr.values).to.eql([ 'id', null ]);
            done();
        });

        it('should build the expression: a IS NULL', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $is: null } });
            expect(expr.sql).to.equals('`foo`.?? IS ?');
            expect(expr.values).to.eql([ 'id', null ]);
            done();
        });

        it('should build the expression: a IS NOT NULL', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $nis: null } });
            expect(expr.sql).to.equals('`foo`.?? IS NOT ?');
            expect(expr.values).to.eql([ 'id', null ]);
            done();
        });

        it('should build the expression: a LIKE \'%xxx%\'', function (done) {
            var expr = Utils.parseExpr('foo', { name: { $like: '%xxx%' } });
            expect(expr.sql).to.equals('`foo`.?? LIKE ?');
            expect(expr.values).to.eql([ 'name', '%xxx%' ]);
            done();
        });

        it('should build the expression: a NOT LIKE \'%xxx%\'', function (done) {
            var expr = Utils.parseExpr('foo', { name: { $nlike: '%xxx%' } });
            expect(expr.sql).to.equals('`foo`.?? NOT LIKE ?');
            expect(expr.values).to.eql([ 'name', '%xxx%' ]);
            done();
        });

        it('should build the expression: a IN (x, y, z)', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $in: [ 1, 2, 3 ] } });
            expect(expr.sql).to.equals('`foo`.?? IN (?)');
            expect(expr.values).to.eql([ 'id', [ 1, 2, 3 ] ]);
            done();
        });

        it('should build the expression: a NOT IN (x, y, z)', function (done) {
            var expr = Utils.parseExpr('foo', { id: { $nin: [ 1, 2, 3 ] } });
            expect(expr.sql).to.equals('`foo`.?? NOT IN (?)');
            expect(expr.values).to.eql([ 'id', [ 1, 2, 3 ] ]);
            done();
        });

        it('should build the expression: a REGEXP \'^x.*x$\'', function (done) {
            var expr = Utils.parseExpr('foo', { name: { $regexp: '^x.*x$' } });
            expect(expr.sql).to.equals('`foo`.?? REGEXP ?');
            expect(expr.values).to.eql([ 'name', '^x.*x$' ]);
            done();
        });

        it('should build a raw expression from an array with parameters', function (done) {
            var expr = Utils.parseExpr('foo', [ '`name` = ??', 'bar' ]);
            expect(expr.sql).to.equals('`name` = ??');
            expect(expr.values).to.eql([ 'bar' ]);
            done();
        });

        it('should build a raw expression from a string', function (done) {
            var expr = Utils.parseExpr('foo', '`name` = \'bar\'');
            expect(expr.sql).to.equals('`name` = \'bar\'');
            expect(expr.values).to.eql([ ]);
            done();
        });

    });

});
