'use strict';

var _ = require('lodash');
var Db = require('./lib/db');
var types = require('./lib/types');
var Functions = require('./lib/functions');

/**
 * @global
 * @instance
 */
var ziti = new Db();
_.assign(ziti, types);
_.assign(ziti, Functions);

module.exports = ziti;
