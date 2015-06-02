var expect = require('chai').expect;
var _ = require('lodash');
var ziti = require('../index');
var hooks = require('./hooks');

var ModelInstance = require('../lib/model-instance');
var User = require('./models/user');
var Photo = require('./models/photo');
var Address = require('./models/address');
var Phone = require('./models/phone');
var Language = require('./models/language');
var Friend = require('./models/friend');

describe('Associations', function () {

    before(hooks.sync);
    after(hooks.clean);

    var scope = { };

    describe('Model', function() {
        it('A One referenced model has the correct foreign key', function (done) {
            expect(Address._core).to.have.property('user_id');
            done();
        });

        it('A Many referenced model has the correct foreign key', function (done) {
            expect(Photo._core).to.have.property('user_id');
            done();
        });

        it('A Many to many referenced model should exists and have a both foreign keys', function (done) {
            var UserLanguage = ziti.get('UserLanguage');
            expect(UserLanguage).to.be.ok;
            expect(UserLanguage._core).to.have.property('user_id');
            expect(UserLanguage._core).to.have.property('langs_id');
            done();
        });

    });

    describe('#save()', function () {
        it('should insert multiple Model sources', function (done) {
            User.save([
                {
                    firstname: 'dexter',
                    lastname: 'morgan',
                    nickname: 'butcher',
                    age: 35
                },
                {
                    firstname: 'walter',
                    lastname: 'white',
                    nickname: 'heisenberg',
                    age: 50
                },
                {
                    firstname: 'franck',
                    lastname: 'underwood',
                    nickname: 'francis',
                    age: 50
                },
            ]).then(function (users) {
                scope.users = [ ];
                expect(users).to.be.an('array').and.to.have.length(3);
                users.forEach(function (user) {
                    expect(user).to.be.an.instanceof(ModelInstance);
                    var raw = user.raw();
                    scope.users.push(raw);
                });
            }).finally(done).catch(done);
        });

        it('should insert One to One Model targets', function (done) {
            Address.save([
                {
                    street: 'jump street',
                    number: 22,
                    user_id: scope.users[0].id
                },
                {
                    street: 'lombard street',
                    number: 42,
                    user_id: scope.users[1].id
                },
                {
                    street: 'champs elysees',
                    number: 42,
                    user_id: scope.users[2].id
                },
            ]).then(function (addresses) {
                scope.addr = [ ];
                addresses.forEach(function (address) {
                    scope.addr.push(address.raw());
                });
            }).finally(done).catch(done);
        });

        it('should insert One to Many Model targets', function (done) {
            Photo.save([
                { path: 'am.jpg', user_id: scope.users[0].id },
                { path: 'stram.jpg', user_id: scope.users[0].id },
                { path: 'gram.jpg', user_id: scope.users[0].id },
                { path: 'hello.jpg', user_id: scope.users[1].id },
                { path: 'world.jpg', user_id: scope.users[1].id },
                { path: 'foo.jpg', user_id: scope.users[2].id },
                { path: 'bar.jpg', user_id: scope.users[2].id },
                { path: 'pipo.jpg', user_id: scope.users[2].id },
                { path: 'bimbo.jpg', user_id: scope.users[2].id }
            ]).then(function (photos) {
                scope.photos = [ ];
                photos.forEach(function (p) {
                    scope.photos.push(p.raw());
                });
            }).finally(done).catch(done);
        });

        it('should insert Many to Many Model targets', function (done) {
            var UserLanguage = ziti.get('UserLanguage');
            Language.save([
                { name: 'english' },
                { name: 'french' },
                { name: 'portuguesh' },
                { name: 'italian' },
                { name: 'spanish' },
                { name: 'arabic' }
            ]).then(function(langs) {
                scope.langs = langs;
                var ul = [ ];
                for (var i = 0, len = scope.users.length; i < len; ++i) {
                        for (var j = 0, jlen = langs.length; j < jlen; ++j) {
                            if ((i + j) % 3 === 2) { continue; }
                            ul.push({ user_id: scope.users[i].id, langs_id: langs[j].get('id') });
                        }
                }
                return UserLanguage.save(ul);
            }).then(function (ul) {
                scope.userlangs = ul;
            }).finally(done).catch(done);
        });

        it('should insert ForeignKey Model targets', function (done) {
            expect(Friend._pk).to.eql([ 'user_id', 'target_id' ]);
            Friend.save([
                { user_id: scope.users[0].id, target_id: scope.users[1].id },
                { user_id: scope.users[1].id, target_id: scope.users[0].id },
                { user_id: scope.users[0].id, target_id: scope.users[2].id },
                { user_id: scope.users[2].id, target_id: scope.users[0].id },
                { user_id: scope.users[1].id, target_id: scope.users[2].id },
                { user_id: scope.users[2].id, target_id: scope.users[1].id }
            ]).then(function (friends) {
                expect(friends).to.be.an('array').and.to.have.length(6);
            }).finally(done).catch(done);
        });

    });

    describe('#at()', function () {
        it('should find the source and all its associations', function (done) {
            User.at({ id: scope.users[0].id })
                .then(function (user) {
                    var raw = user.raw();
                    expect(raw).to.have.property('firstname', 'dexter');
                    expect(raw).to.have.property('address');
                    expect(raw).to.have.property('photos');
                    expect(raw).to.have.property('langs');
                }).finally(done).catch(done);
        });

    });
});
