<a name="ziti"></a>
## ziti
**Kind**: global class  

* [ziti](#ziti)
  * [.configure([config])](#ziti+configure)
  * [.sync([options])](#ziti+sync) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.end()](#ziti+end) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.withConnection(fn)](#ziti+withConnection) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.withTx(fn)](#ziti+withTx) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.query(query, [options])](#ziti+query) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.define(name, core, [options])](#ziti+define) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.setStatic(name, fn)](#ziti+setStatic)
  * [.setMethod(name, fn)](#ziti+setMethod)
  * [.get(name)](#ziti+get) ⇒ <code>Model</code>

<a name="ziti+configure"></a>
### ziti.configure([config])
Configure the mysql handler by creating the connection pool

**Kind**: instance method of <code>[ziti](#ziti)</code>  
**See**: [Node MySQL connection options](https://github.com/felixge/node-mysql#connection-options)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> |  | The MySQL config |
| [config.host] | <code>string</code> | <code>&quot;localhost&quot;</code> | The hostname of the database you are connecting to |
| [config.port] | <code>Number</code> | <code>3306</code> | The port number to connect to |
| [config.user] | <code>string</code> |  | The MySQL user to authenticate as |
| [config.password] | <code>string</code> |  | The password of that MySQL user |
| [config.database] | <code>string</code> |  | The database to use for the connection |

<a name="ziti+sync"></a>
### ziti.sync([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Synchronizes models with the database

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.autoCreateModels] | <code>boolean</code> | <code>true</code> | Create models automatically when used as a reference dependency (useful for many to many relationships) |
| [options.dropTable] | <code>boolean</code> | <code>false</code> | Drop all model tables |
| [options.createTable] | <code>boolean</code> | <code>true</code> | Create all model tables |
| [options.autoMigrate.addColumns] | <code>boolean</code> | <code>true</code> | Add missing table columns |
| [options.autoMigrate.delColumns] | <code>boolean</code> | <code>false</code> | Remove missing table columns |

<a name="ziti+end"></a>
### ziti.end() ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
End all connections

**Kind**: instance method of <code>[ziti](#ziti)</code>  
<a name="ziti+withConnection"></a>
### ziti.withConnection(fn) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Provide a connection from the pool to the callback

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The callback |

<a name="ziti+withTx"></a>
### ziti.withTx(fn) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Provide a transaction from the pool to the callback starting a transaction.
It commits the change when the callback returns.
If something goes wrong in the callback (exception or a promise rejected), it rollbacks instead.

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The callback |

**Example**  
```javascript
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
<a name="ziti+query"></a>
### ziti.query(query, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Send a SQL query

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> &#124; <code>string</code> | The query |
| query.sql | <code>string</code> | A query with parameters defined as ? |
| query.values | <code>Array.&lt;\*&gt;</code> | An array of values to pass |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

**Example**  
```javascript
ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? = ?', values: [ 'id', 'user', 'id', 42 ] });
// SELECT `id` FROM `user` WHERE `id` = 42
ziti.query({ sql: 'INSERT INTO ?? SET ??', values: [ 'user', { name: 'Heisenberg', age: 42 } ] });
// INSERT INTO `user` SET `name` = 'Heisenberg', `age` = 42
```
<a name="ziti+define"></a>
### ziti.define(name, core, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Create a new Model

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the model |
| core | <code>Object</code> |  | core of the model in the form { fieldName: fieldType } |
| [options] | <code>Object</code> |  |  |
| [options.createTable] | <code>boolean</code> | <code>true</code> | Create the table during synchronization |
| [options.tableName] | <code>string</code> |  | Name of the table, by default the name of the model in [snakeCase](https://lodash.com/docs#snakeCase) |
| [options.engine] | <code>string</code> | <code>&quot;InnoDB&quot;</code> | Engine to use when creating the table |
| [options.autoId] | <code>string</code> &#124; <code>boolean</code> | <code>true</code> | Create a primary key auto increment 'id' pr using the provided field name |

<a name="ziti+setStatic"></a>
### ziti.setStatic(name, fn)
Add a static method global to all models

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="ziti+setMethod"></a>
### ziti.setMethod(name, fn)
Add a method global to all model instances

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="ziti+get"></a>
### ziti.get(name) ⇒ <code>Model</code>
Get a Model from its name

**Kind**: instance method of <code>[ziti](#ziti)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the model |

