'use strict';

var _ = require('lodash');
var ziti = require('../../index');
var Country = require('./country');

var Product = ziti.define('Product', {
    price: ziti.Int().default(0),
    name: ziti.String().set(function (name) {
        this.setValue('name', name.toUpperCase());
    }).get(function () {
        var price = this.getValue('price');
        if (_.isUndefined(price)) {
            return this.getValue('name');
        }
        return this.getValue('name') + ':' + price;
    }),
    origin: ziti.ForeignKey(Country)
});

module.exports = Product;
