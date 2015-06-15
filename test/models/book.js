var ziti = require('../../index');

var Book = ziti.define('Book', {
    title: ziti.String().notNull().primaryKey(),
    author: ziti.String().notNull().primaryKey(),
    year: ziti.Smallint(4).notNull().default(function () {
        return new Date().getFullYear();
    })
});

module.exports = Book;
