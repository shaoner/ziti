'use strict';

var ziti = require('../../index');

var Country = ziti.define('Country', {
    name: ziti.String().unique(),
});

module.exports = Country;
