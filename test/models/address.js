var ziti = require('../../index');

var Address = ziti.define('Address', {
    street: ziti.String().notNull(),
    number: ziti.Int().default(1),
});

module.exports = Address;
