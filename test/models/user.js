var ziti = require('../../index');
var Address = require('./address');
var Photo = require('./photo');
var Language = require('./language');
var Friend = require('./friend');
var Phone = require('./phone');

var User = ziti.define('User', {
    firstname: ziti.String().default(null).unique('name'),
    lastname: ziti.String().default(null).unique('name'),
    nickname: ziti.String().unique().notNull(),
    age: ziti.Int().default(18),
    address: Address,
    photos: [ Photo ],
    langs: [ Language, 'UserLanguage' ],
    friends: ziti.Many('User').relatedName('user').through(Friend).relatedName('target'),
    phone: Phone,
    signup_date: ziti.Datetime().default(ziti.NOW)
});

module.exports = User;
