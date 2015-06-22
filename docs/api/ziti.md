## Classes
<dl>
<dt><a href="#Db">Db</a></dt>
<dd></dd>
</dl>
## Members
<dl>
<dt><a href="#ziti">ziti</a> : <code><a href="#Db">Db</a></code></dt>
<dd></dd>
</dl>
## External
<dl>
<dt><a href="#external_Types">Types</a></dt>
<dd><p>SQL types</p>
</dd>
<dt><a href="#external_Functions">Functions</a></dt>
<dd><p>SQL Functions</p>
</dd>
</dl>
<a name="Db"></a>
## Db
**Kind**: global class  

* [Db](#Db)
  * [.statics](#Db+statics)
  * [.methods](#Db+methods)
  * ~~[.setStatic](#Db+setStatic)~~
  * ~~[.setMethod](#Db+setMethod)~~
  * [.configure([config])](#Db+configure)
  * [.sync([options])](#Db+sync) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.define(name, core, [options])](#Db+define) ⇒ <code>[Model](/api/model/)</code>
  * [.get(name)](#Db+get) ⇒ <code>[Model](/api/model/)</code>
  * [.end()](#Db+end) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.withConnection(fn)](#Db+withConnection) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.withTx(fn)](#Db+withTx) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.query(query, [options])](#Db+query) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.create([config])](#Db+create) ⇒ <code>[Db](#Db)</code>

<a name="Db+statics"></a>
### db.statics
Add a static method global to all models

**Kind**: instance property of <code>[Db](#Db)</code>  
<a name="Db+methods"></a>
### db.methods
Add a method global to all model instances

**Kind**: instance property of <code>[Db](#Db)</code>  
<a name="Db+setStatic"></a>
### ~~db.setStatic~~
***Deprecated***

Add a static method global to all models

**Kind**: instance property of <code>[Db](#Db)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="Db+setMethod"></a>
### ~~db.setMethod~~
***Deprecated***

Add a method global to all model instances

**Kind**: instance property of <code>[Db](#Db)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="Db+configure"></a>
### db.configure([config])
Configure the mysql handler by creating the connection pool.
Of course you cannot query the database if ziti is not configured.

**Kind**: instance method of <code>[Db](#Db)</code>  
**See**: [Node MySQL connection options](https://github.com/felixge/node-mysql#connection-options)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  | The MySQL config |
| [config.host] | <code>string</code> | <code>&quot;localhost&quot;</code> | The hostname of the database you are connecting to |
| [config.port] | <code>Number</code> | <code>3306</code> | The port number to connect to |
| [config.user] | <code>string</code> |  | The MySQL user to authenticate as |
| [config.password] | <code>string</code> |  | The password of that MySQL user |
| [config.database] | <code>string</code> |  | The database to use for the connection |

**Example**  
```js
var ziti = require('ziti');
// You can define models before configuring ziti
var User = ziti.define('User', {
    name: ziti.String,
    photos: [ 'Photo' ]
});
ziti.configure({ host: 'localhost', user: 'root', database: 'test' });
// Or after
var Photo = ziti.define('Photo', {
    path: ziti.String().unique()
});
```
<a name="Db+sync"></a>
### db.sync([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Synchronizes models with the database

**Kind**: instance method of <code>[Db](#Db)</code>  
**Resolve**: <code>Object</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.autoCreateModels] | <code>boolean</code> | <code>true</code> | Create models automatically when used as a reference dependency (useful for many to many relationships) |
| [options.dropTable] | <code>boolean</code> | <code>false</code> | Drop all model tables |
| [options.createTable] | <code>boolean</code> | <code>true</code> | Create all model tables |
| [options.autoMigrate.addColumns] | <code>boolean</code> | <code>true</code> | Add missing table columns |
| [options.autoMigrate.delColumns] | <code>boolean</code> | <code>false</code> | Remove missing table columns |

**Example**  
```js
ziti.sync({ dropTable: true, createTable: true, autoMigrate: false })
   .then(function (models) {
       models.forEach(function (modelName) {
           console.log('* %s Model has been synchronized', modelName);
       });
   });
// * User Model has been synchronized
// * Photo Model has been synchronized
```
<a name="Db+define"></a>
### db.define(name, core, [options]) ⇒ <code>[Model](/api/model/)</code>
Create a new Model

**Kind**: instance method of <code>[Db](#Db)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the model |
| core | <code>Object</code> |  | core of the model in the form { fieldName: fieldType } |
| [options] | <code>Object</code> |  |  |
| [options.createTable] | <code>boolean</code> | <code>true</code> | Create the table during synchronization |
| [options.tableName] | <code>string</code> |  | Name of the table, by default the name of the model in [snakeCase](https://lodash.com/docs#snakeCase) |
| [options.engine] | <code>string</code> | <code>&quot;InnoDB&quot;</code> | Engine to use when creating the table |
| [options.autoId] | <code>string</code> &#124; <code>boolean</code> | <code>true</code> | Create a primary key auto increment 'id' pr using the provided field name |

**Example**  
```js
var User = ziti.define('User', {
   email: ziti.String().unique().notNull(),
   password: ziti.Varbinary(16).notNull(),
   age: ziti.Int,
   fullname: ziti.String,
   photos: [ Photo ]
}, { autoId: 'user_id', engine: 'InnoDb', tableName: 'user' });
```
<a name="Db+get"></a>
### db.get(name) ⇒ <code>[Model](/api/model/)</code>
Get a Model from its name

**Kind**: instance method of <code>[Db](#Db)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the model |

<a name="Db+end"></a>
### db.end() ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
End all connections

**Kind**: instance method of <code>[Db](#Db)</code>  
<a name="Db+withConnection"></a>
### db.withConnection(fn) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Provide a connection from the pool to the callback

**Kind**: instance method of <code>[Db](#Db)</code>  
**Resolve**: <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The callback |

<a name="Db+withTx"></a>
### db.withTx(fn) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Provide a transaction from the pool to the callback starting a transaction.
It commits the change when the callback returns.
If something goes wrong in the callback (exception or a promise rejected), it rollbacks instead.

**Kind**: instance method of <code>[Db](#Db)</code>  
**Resolve**: <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The callback |

**Example**  
```js
ziti.withTx(function (tx) {
  return ziti.query('INSERT INTO Animal SET `type` = \'cat\'', { using: tx })
    .then(function () {
      return ziti.query('INSERT INTO Animal SET `type` = \'dog\'', { using: tx })
    });
}).then(function () {
  console.log('Animals have been inserted!');
});
// START TRANSACTION
// INSERT INTO Animal SET `type` = 'cat'
// INSERT INTO Animal SET `type` = 'dog'
// COMMIT
// Animals have been inserted!
```
<a name="Db+query"></a>
### db.query(query, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Send a SQL query

**Kind**: instance method of <code>[Db](#Db)</code>  
**Resolve**: <code>(Array.&lt;Object&gt;\|Object)</code>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Array.&lt;\*&gt;</code> &#124; <code>Object</code> &#124; <code>string</code> | The query |
| query.sql | <code>string</code> | A query with parameters defined as ? |
| query.values | <code>Array.&lt;\*&gt;</code> | An array of values to pass |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

**Example**  
```js
ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? = ?', values: [ 'id', 'user', 'id', 42 ] });
// SELECT `id` FROM `user` WHERE `id` = 42

ziti.query({ sql: 'INSERT INTO ?? SET ?', values: [ 'user', { name: 'Heisenberg', age: 42 } ] });
// INSERT INTO `user` SET `name` = 'Heisenberg', `age` = 42

ziti.query('SELECT id FROM `user` WHERE `id` = 42');
// SELECT `id` FROM `user` WHERE `id` = 42

ziti.query([ 'SELECT ?? FROM ?? WHERE ?? = ?', 'id', 'user', 'id', 42 ]);
// SELECT `id` FROM `user` WHERE `id` = 42
```
<a name="Db+create"></a>
### db.create([config]) ⇒ <code>[Db](#Db)</code>
Create a new connection.
This is helpful when dealing with multiple databases.<br>
*Note that you cannot use a reference (one, many or foreignkey) to a Model from another database.*

**Kind**: instance method of <code>[Db](#Db)</code>  
**See**: [Node MySQL connection options](https://github.com/felixge/node-mysql#connection-options)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  | The MySQL config |
| [config.host] | <code>string</code> | <code>&quot;localhost&quot;</code> | The hostname of the database you are connecting to |
| [config.port] | <code>Number</code> | <code>3306</code> | The port number to connect to |
| [config.user] | <code>string</code> |  | The MySQL user to authenticate as |
| [config.password] | <code>string</code> |  | The password of that MySQL user |
| [config.database] | <code>string</code> |  | The database to use for the connection |

**Example**  
```js
var db = ziti.create({ host: 'localhost', user: 'root', database: 'test' });
var User = db.define('User', {
    name: ziti.String
});
```
<a name="ziti"></a>
## ziti : <code>[Db](#Db)</code>
**Kind**: global variable  
**Mixes**: <code>[Types](#external_Types)</code>, <code>[Functions](#external_Functions)</code>  
<a name="external_Types"></a>
## Types
SQL types

**Kind**: global external  
**See**: [Types](/api/types/)  
<a name="external_Functions"></a>
## Functions
SQL Functions

**Kind**: global external  
**See**: [Functions](/api/functions/)  
