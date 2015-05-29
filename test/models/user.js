var ziti = require('../../index');
var Address = require('./address');
var Photo = require('./photo');
var Language = require('./language');

var User = ziti.define('User', {
    firstname: ziti.String().default(null),
    lastname: ziti.String().default(null),
    nickname: ziti.String().unique().notNull(),
    age: ziti.Int().default(18),
    address: Address,
    photos: [ Photo ],
    langs: ziti.Many(Language).through('UserLanguage')
});

module.exports = User;
