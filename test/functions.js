var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');
var Pasta = require('./models/pasta');

describe('Functions', function () {

    before(hooks.sync);
    before(function (done) {
        Pasta.save([
            { numero: 1, name: 'capellini' },
            { numero: 3, name: 'spaghettini' },
            { numero: 5, name: 'spaghetti' },
            { numero: 7, name: 'spaghettoni' },
            { numero: 42, name: 'ziti' },
            { name: 'fusilli' },
            { name: 'penne' },
            { numero: 51, name: '  pastisi  ' }
        ]).finally(done).catch(done);
    });
    after(hooks.clean);

    describe('Increment', function () {
        it('should increment a column', function (done) {
            Pasta.update({ numero: ziti.$inc('numero', 2) }, { name: 'penne' })
                .then(function (res) {
                    return Pasta.at({ name: 'penne' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(2);
                }).finally(done).catch(done);
        });

        it('should increment a column (2nd form)', function (done) {
            Pasta.update({ numero: ziti.$inc }, { name: 'penne' })
                .then(function (res) {
                    return Pasta.at({ name: 'penne' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(3);
                }).finally(done).catch(done);
        });

        it('should increment a column (3rd form)', function (done) {
            Pasta.update({ numero: [ '?? + ?', 'numero', 1 ] }, { name: 'penne' })
                .then(function (res) {
                    return Pasta.at({ name: 'penne' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(4);
                }).finally(done).catch(done);
        });

    });

    describe('Decrement', function () {
        it('should decrement a column', function (done) {
            Pasta.update({ numero: ziti.$dec('numero') }, { name: 'spaghetti' })
                .then(function (res) {
                    return Pasta.at({ name: 'spaghetti' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(4);
                }).finally(done).catch(done);
        });

        it('should decrement a column (2nd form)', function (done) {
            Pasta.update({ numero: ziti.$dec }, { name: 'spaghetti' })
                .then(function (res) {
                    return Pasta.at({ name: 'spaghetti' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(3);
                }).finally(done).catch(done);
        });

        it('should decrement a column (3rd form)', function (done) {
            Pasta.update({ numero: [ '?? - ?', 'numero', 1 ] }, { name: 'spaghetti' })
                .then(function (res) {
                    return Pasta.at({ name: 'spaghetti' });
                }).then(function (pasta) {
                    expect(pasta.get('numero')).to.equals(2);
                }).finally(done).catch(done);
        });

    });

    describe('Function with 1 argument', function () {
        it('should set a column to uppercase', function (done) {
            Pasta.update({ name: ziti.$upper }, { numero: 7 })
                .then(function (res) {
                    return Pasta.at({ numero: 7 });
                }).then(function (pasta) {
                    expect(pasta.get('name')).to.equals('SPAGHETTONI');
                }).finally(done).catch(done);
        });

        it('should set a column to the hexadecimal representation of another column', function (done) {
            Pasta.update({ name: ziti.$hex('numero') }, { numero: 42 })
                .then(function (res) {
                    return Pasta.at({ numero: 42 });
                }).then(function (pasta) {
                    expect(pasta.get('name')).to.equals('2A');
                }).finally(done).catch(done);
        });

    });

    describe('Function chaining', function () {
        it('should increment by 3 and decrement by 1', function (done) {
            Pasta.update({ numero: ziti.$inc(ziti.$dec('numero', 1), 3) }, { numero: 42 })
                .then(function () {
                    return Pasta.at({ numero: 44 });
                }).then(function (pasta) {
                    expect(pasta).not.to.be.null;
                }).finally(done).catch(done);
        });

        it('should sets a column to uppercase and trim spaces', function (done) {
            Pasta.update({ name: ziti.$trim(ziti.$upper('name')) }, { numero: 51 })
                .then(function () {
                    return Pasta.at({ numero: 51 });
                }).then(function (pasta) {
                    expect(pasta.get('name')).to.equals('PASTISI');
                }).finally(done).catch(done);
        });

    });

});
