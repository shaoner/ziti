'use strict';

var _ = require('lodash');
var Db = require('./lib/db');
var types = require('./lib/types');

var ziti = new Db();
_.assign(ziti, types);

module.exports = ziti;
