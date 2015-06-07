'use strict';

var ziti = require('../../index');

var Friend = ziti.define('Friend', {
    user: ziti.ForeignKey('User').primaryKey(),
    target: ziti.ForeignKey('User').primaryKey(),
});

module.exports = Friend;
