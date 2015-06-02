var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');
var Animal = require('./models/animal');

describe('Model & model instance methods', function () {
    before(function (done) {
        ziti.statics.has = function (attribute) {
            return attribute in this._core;
        };
        ziti.methods.isNew = function () {
            return this._isNew;
        };
        done();
    });
    before(hooks.sync);
    before(function (done) {
        Animal.save([
            { kind: 'panda', name: 'po', age: 15 },
            { kind: 'monkey', name: 'abu', age: 10 }
        ]).finally(done).catch(done);
    });
    after(hooks.clean);

    describe('Global methods', function () {
        it('should use an internal Model property', function (done) {
            expect(Animal.has('kind')).to.be.true;
            expect(Animal.has('weight')).to.be.false;
            done();
        });
        it('should use an internal Model instance property', function (done) {
            Animal.at({ name: 'po' }).then(function (animal) {
                expect(animal.isNew()).to.be.false;
                var bugsbunny = Animal.build({ name: 'bugsbunny', kind: 'rabbit' });
                expect(bugsbunny.isNew()).to.be.true;
            }).finally(done).catch(done);
        });
    });

    describe('Model static methods', function () {

        it('should return an internal property', function (done) {
            expect(Animal.myTable()).to.equals('animal');
            done();
        });

        it('should use an internal method', function (done) {
            Animal.find({ name: 'abu' }).then(function (animal) {
                expect(animal.get('kind')).to.equals('monkey');
            }).finally(done).catch(done);
        });

    });

    describe('Model instance methods', function () {

        it('should return an internal property', function (done) {
            Animal.at({ name: 'po' }).then(function (animal) {
                expect(animal.myModelName()).to.equals('Animal');
            }).finally(done).catch(done);
        });

        it('should use an internal method', function (done) {
            Animal.at({ name: 'abu' }).then(function (animal) {
                animal.incAge();
                expect(animal.get('age')).to.equals(11);
            }).finally(done).catch(done);
        });
    });

});
