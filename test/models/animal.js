var ziti = require('../../index');

var Animal = ziti.define('Animal', {
    kind: ziti.String().notNull(),
    name: ziti.String().unique().notNull().default(''),
    age: ziti.Int().default(0)
});

module.exports = Animal;
