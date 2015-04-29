var expect = require('chai').expect;
var ziti = require('../index');
var config = require('./config');

describe('ziti', function () {

    before(function () {
        ziti.configure({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password
        });
    });

//     describe('#createDatabase()', function() {
//         it('should create a database', function (done) {
//             ziti.createDatabase('ziti_test').then(function (res) {
//                 expect(res).to.have.property('affectedRows');
//                 expect(res.affectedRows).to.equals(1);
//                 done();
//             }).catch(done);
//         });
//     });

//     describe('#dropDatabase()', function() {
//         it('should delete a database', function (done) {
//             ziti.dropDatabase('ziti_test').then(function (res) {
//                 expect(res).to.have.property('affectedRows');
// //                expect(res.affectedRows).to.equals(0);
//                 done();
//             }).catch(done);
//         });
//     });

});
