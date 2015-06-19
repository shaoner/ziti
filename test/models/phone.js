var ziti = require('../../index');

var Phone = ziti.define('Phone', {
    number: ziti.Int().unique().primaryKey().notNull(),
    user: ziti.ForeignKey('User')
});

module.exports = Phone;
