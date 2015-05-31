'use strict';

var ziti = require('../../index');

var Pasta = ziti.define('Pasta', {
    numero: ziti.Int().default(0),
    name: ziti.String
});

module.exports = Pasta;
