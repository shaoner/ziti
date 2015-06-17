var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');
var ModelInstance = require('../lib/model-instance');

describe('Instance', function () {

    var Product, Country, productCountry;

    before(function () {
        Product = require('./models/product');
        Country = require('./models/country');
    });
    before(hooks.sync);
    before(function (done) {
        Country.save({ name: 'France' }).then(function (country) {
            productCountry = country;
        }).finally(done).catch(done);
    });
    after(hooks.clean);

    describe('#set()', function () {
        var torti;

        before(function () {
            torti = Product.build({ price: 10, name: 'torti' });
        });

        it('should check instance fields are correctly set at build', function (done) {
            expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            expect(torti.getValue('price')).to.equals(10);
            done();
        });

        it('should set a field', function (done) {
            torti.set('price', 12);
            expect(torti.getValue('price')).to.equals(12);
            done();
        });

        it('should set a field using a setter', function (done) {
            torti.set('name', 'penne');
            expect(torti.getValue('name')).to.equals('PENNE');
            done();
        });
    });

    describe('#get()', function () {
        var torti;

        before(function () {
            torti = Product.build({ price: 10, name: 'torti' });
        });

        it('should check instance fields are correctly set at build', function (done) {
            expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            expect(torti.get('price')).to.equals(10);
            done();
        });

        it('should set & get a field', function (done) {
            torti.setValue('price', 12);
            expect(torti.get('price')).to.equals(12);
            done();
        });

        it('should get a field using a getter', function (done) {
            expect(torti.get('name')).to.equals('TORTI:12');
            done();
        });
    });

    describe('#raw()', function () {
        var torti;

        before(function () {
            torti = Product.build({ price: 10, name: 'torti' });
        });

        it('should get instance raw data', function (done) {
            expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            expect(torti.raw()).to.deep.equals({ price: 10, name: 'TORTI' });
            done();
        });
    });

    describe('#toJSON()', function () {
        var torti;

        before(function () {
            torti = Product.build({ price: 10, name: 'torti' });
        });

        it('should get instance JSON representation', function (done) {
            expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            expect(torti.toJSON()).to.equals('{"price":10,"name":"TORTI"}');
            done();
        });
    });

    describe('#save()', function () {
        it('should build and insert an instance into database', function (done) {
            var torti = Product.build({ price: 10, name: 'torti', origin: productCountry });
            expect(torti.get('origin_id')).to.be.above(0);
            torti.save().then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('id')).to.be.above(0);
                expect(torti.get('price')).to.equals(10);
                expect(torti.get('name')).to.equals('TORTI:10');
                expect(torti.get('origin_id')).to.be.above(0);
            }).finally(done).catch(done);
        });

        it('should retrieve an instance and save should have no effect', function (done) {
            Product.at({ price: 10 }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('id')).to.be.above(0);
                expect(torti.get('price')).to.equals(10);
                expect(torti.get('name')).to.equals('TORTI:10');
                return torti.save();
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            }).finally(done).catch(done);
        });

        it('should retrieve an instance, set a field and update database', function (done) {
            Product.at({ price: 10 }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('id')).to.be.above(0);
                expect(torti.get('price')).to.equals(10);
                expect(torti.get('name')).to.equals('TORTI:10');
                torti.set('price', torti.get('price') + 1);
                return torti.save();
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('price')).to.equals(11);
                return Product.at({ price: 11 });
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('price')).to.equals(11);
            }).finally(done).catch(done);
        });
    });

    describe('#update()', function () {
        it('should update a field into database', function (done) {
            Product.at({ price: 11 }).then(function (torti) {
                return torti.update({ price: 12 })
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('price')).to.equals(12);
                return Product.at({ price: 12 })
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('price')).to.equals(12);
            }).finally(done).catch(done);
        });
    });

    describe('#remove()', function () {
        it('should remove an instance from database', function (done) {
            Product.at({ price: 12 }).then(function (torti) {
                return torti.remove();
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti._isNew).to.be.true;
                return Product.at({ price: 12 });
            }).then(function (torti) {
                expect(torti).to.be.null;
            }).finally(done).catch(done);
        });
    });

    describe('#refresh()', function () {
        it('should set a field and refresh the instance data', function (done) {
            Product.save({ price: 10, name: 'torti', origin_id: productCountry.get('id') }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                torti.set({ price: 11 });
                return torti.refresh();
            }).then(function (torti) {
                expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
                expect(torti.get('price')).to.equals(10);
            }).finally(done).catch(done);
        });
    });

});
