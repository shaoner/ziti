var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');
var Animal = require('./models/animal');

describe('Queries', function () {
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

    });
});
