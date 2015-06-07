'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var Model = require('./model');

/**
 * @constructor
 */
var ModelManager = function (db) {
    this._db = db;
    this._models = { };
    this._dependencies = { };
    this._order = [ ];
    this._statics = { };
    this._methods = { };
};

/**
 * Get a model from its name
 * @param {string} name - Name of the model
 * @returns {Model}
 */
ModelManager.prototype.get = function (name) {
    return this._models[name];
};

/**
 * Register a new model
 * @param {Model} model
 */
ModelManager.prototype.addModel = function (model) {
    var name = model._name;
    if (name in this._models) {
        throw new Error('Model ' + name + ' is already added');
    }
    this._models[name] = model;
    // x needs *y* => [ y, x ]
    this._order.push(name);
    // Resolve pending dependencies
    if (name in this._dependencies) {
        var refs = this._dependencies[name];
        for (var i = 0, len = refs.length; i < len; ++i) {
            refs[i]._resolveDependency(model);
        }
        delete this._dependencies[name];
    }
};

/**
 * Specify a reference between models
 * @param {Reference} reference
 */
ModelManager.prototype.pushReference = function (reference) {
    var deps = reference._dependencies;
    var i = 0;
    while (i < deps.length) {
        var depName = deps[i];
        if (depName instanceof Model) {
            deps[i] = depName._name;
            reference._resolveDependency(depName);
        } else if (depName in this._models) {
            reference._resolveDependency(this._models[depName]);
        } else {
            // Pending depencencies, will be resolved later
            this._dependencies[depName] = this._dependencies[depName] || [ ];
            this._dependencies[depName].push(reference);
            ++i;
        }
    }
};

/**
 * Sort two models
 * @private
 * @param {string} name1 - Name of the first model
 * @param {string} name2 - Name of the second model
 */
ModelManager.prototype._sort = function (name1, name2) {
    var idx1 = this._order.indexOf(name1);
    var idx2 = this._order.indexOf(name2);
    if (idx2 > idx1 && idx1 > -1) {
        this._order.splice(idx2, 1);
        this._order.splice(idx1, 0, name2);
    }
};

/**
 * Create missing dependencies
 * @private
 */
ModelManager.prototype._createDependencies = function () {
    var model;
    for (var name in this._dependencies) {
        if (!(name in this._models)) {
            this._db.define(name, { });
        }
    }
};

/**
 * Synchronizes models with the database
 * @param {boolean} options.autoCreateModels=true
 * Create models automatically when used as a reference dependency
 * (useful for many to many relationships)
 * @param {boolean} options.dropTable=false - Drop all model tables
 * @param {boolean} options.createTable=true - Create all model tables
 * @param {boolean} options.autoMigrate.addColumns=true Add missing table columns
 * @param {boolean} options.autoMigrate.delColumns=false - Remove missing table columns
 * @returns {Promise}
 */
ModelManager.prototype.sync = function (options) {
    // Add methods
    for (var modelName in this._models) {
        var model = this._models[modelName];
        _.defaults(model, this._statics);
        _.defaults(model.methods, this._methods);
    }
    var p = Promise.bind(this);
    if (options.autoCreateModels === true) {
        this._createDependencies();
    }
    if (options.dropTable === true) {
        var rorder = this._order.slice(0).reverse();
        p = p.return(rorder).each(function (name) {
            return this._models[name].dropTable();
        });
    }
    if (options.createTable === true) {
        p = p.return(this._order).each(function (name) {
            return this._models[name].createTable(options);
        });
    }
    if (options.autoMigrate !== false) {
        p = p.return(this._order).each(function (name) {
            return this._models[name].migrate(options.autoMigrate);
        });
    }
    return p;
};

/**
 * Add a static method global to all models
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 */
ModelManager.prototype.setStatic = function (name, fn) {
    this._statics[name] = fn;
    for (var modelName in this._models) {
        var model = this._models[modelName];
        if (!(name in model._statics)) {
            model.setStatic(name, fn);
        }
    }
};

/**
 * Add a method global to all model instances
 * @param {string} name - Name of the method
 * @param {Function} fn - The method
 */
ModelManager.prototype.setMethod = function (name, fn) {
    this._methods[name] = fn;
    for (var modelName in this._models) {
        var model = this._models[modelName];
        if (!(name in model._methods)) {
            model.setMethod(name, fn);
        }
    }
};

module.exports = ModelManager;
