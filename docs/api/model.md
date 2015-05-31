<a name="Model"></a>
## Model
**Kind**: global class  

* [Model](#Model)
  * [.index(fields, [options])](#Model+index)
  * [.setStatic(name, fn)](#Model+setStatic)
  * [.setMethod(name, fn)](#Model+setMethod)
  * [.query(query, [options])](#Model+query) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.sync([options])](#Model+sync) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.createTable([options])](#Model+createTable) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.dropTable([options])](#Model+dropTable) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.migrate([options])](#Model+migrate) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.save(data, [options])](#Model+save) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.update(data, where, [options])](#Model+update) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.upsert(data, [options])](#Model+upsert)
  * [.remove(where, [options])](#Model+remove) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.at(where, [options])](#Model+at) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.all(where, [options])](#Model+all) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.build(data, [options])](#Model+build) ⇒ <code>[ModelInstance](/api/instance/)</code>

<a name="Model+index"></a>
### model.index(fields, [options])
Add a new index on some fields

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Array.&lt;string&gt;</code> | Name of the fields |
| [options] | <code>Object</code> |  |
| [options.name] | <code>string</code> | name of the index, by default it is set to the concatenated fields with a '_' |
| [options.using] | <code>string</code> | method for the index ('hash', 'btree') |
| [options.unique] | <code>boolean</code> | unique index |
| [options.fulltext] | <code>boolean</code> | fulltext index |
| [options.spacial] | <code>boolean</code> | spacial index |

<a name="Model+setStatic"></a>
### model.setStatic(name, fn)
Set a new Model method

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="Model+setMethod"></a>
### model.setMethod(name, fn)
Set a new Model Instance method

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the method |
| fn | <code>function</code> | The method |

<a name="Model+query"></a>
### model.query(query, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Send a SQL query

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> &#124; <code>string</code> | The query |
| query.sql | <code>string</code> | A query with parameters defined as ? |
| query.values | <code>Array.&lt;\*&gt;</code> | An array of values to pass |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+sync"></a>
### model.sync([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Synchronize the Model with the database

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.dropTable] | <code>boolean</code> | <code>false</code> | Drop the table |
| [options.createTable] | <code>boolean</code> | <code>true</code> | Create the table |
| [options.autoMigrate.addColumns] | <code>boolean</code> | <code>true</code> | Add missing table columns |
| [options.autoMigrate.delColumns] | <code>boolean</code> | <code>false</code> | Remove missing table columns |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> |  | Use this connection |

<a name="Model+createTable"></a>
### model.createTable([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Create the associated table if not exists

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+dropTable"></a>
### model.dropTable([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Delete the associated table if exists

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+migrate"></a>
### model.migrate([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Add/remove columns from the table to match the current Model

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+save"></a>
### model.save(data, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Save new items into the associated model table

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array.&lt;Object&gt;</code> |  | The data to insert |
| [options] | <code>Object</code> |  |  |
| [options.multiple] | <code>boolean</code> | <code>false</code> | Run multiple insertions using a transaction (or the given connection) |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> |  | Use this connection |

<a name="Model+update"></a>
### model.update(data, where, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Update row(s) with new data

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data that change |
| where | <code>Object</code> | Query expression for the WHERE condition. If not set or null, it updates each row. |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+upsert"></a>
### model.upsert(data, [options])
Insert data or update the old row if a duplicate key conflict occurs
in a UNIQUE index or PRIMARY KEY

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to be inserted or updated |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+remove"></a>
### model.remove(where, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Remove row(s) from the associated table

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| where | <code>Object</code> | Query expression for the WHERE condition. If not set or null, it removes all rows in the associated table |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+at"></a>
### model.at(where, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Retrieve a single Model instance

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| where | <code>Object</code> | Query expression to find the row. If not set or null, it returns the first found row. |
| [options] | <code>Object</code> |  |
| [options.attributes] | <code>Array.&lt;string&gt;</code> | The attributes to retrieve |
| [options.$] | <code>string</code> | The scope to use |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+all"></a>
### model.all(where, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Retrieve a multiple Model instances

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Description |
| --- | --- | --- |
| where | <code>Object</code> | Query expression to find the rows. If not set or null, it retrieves all rows. |
| [options] | <code>Object</code> |  |
| [options.attributes] | <code>Array.&lt;string&gt;</code> | The attributes to retrieve |
| [options.$] | <code>string</code> | The scope to use |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Model+build"></a>
### model.build(data, [options]) ⇒ <code>[ModelInstance](/api/instance/)</code>
Build a Model instance

**Kind**: instance method of <code>[Model](#Model)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> |  | The data to use to build the instance |
| [options] | <code>Object</code> |  |  |
| [options.new] | <code>boolean</code> | <code>true</code> | Whether the instance is new or already existing |

