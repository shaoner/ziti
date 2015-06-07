'use strict';

var _ = require('lodash');
var Db = require('./lib/db');
var Types = require('./lib/types');
var Functions = require('./lib/functions');

/**
 * SQL types
 * @external Types
 * @see {@link /api/types/|Types}
 */

/**
 * SQL Functions
 * @external Functions
 * @see {@link /api/functions/|Functions}
 */

/**
 * @global
 * @instance
 * @type Db
 * @mixes external:Types
 * @mixes external:Functions
 */
var ziti = new Db();
_.assign(ziti, Types);
_.assign(ziti, Functions);

module.exports = ziti;
