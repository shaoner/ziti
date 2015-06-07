var ziti = require('../../index');

var Animal = ziti.define('Animal', {
    kind: ziti.String().notNull(),
    name: ziti.String().unique().notNull().default(''),
    age: ziti.Int().default(0)
});

Animal.myTable = function () {
    return this._table;
};

Animal.methods.myModelName = function () {
    return this.model.name;
};

Animal.find = function () {
    return this.at.apply(this, arguments);
};

Animal.methods.incAge = function () {
    var age = this.get('age');
    this.set('age', age + 1);
};

module.exports = Animal;
