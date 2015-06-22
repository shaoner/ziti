<a name="Query"></a>
## Query
**Kind**: global class  

* [Query](#Query)
  * [.only([...attributes])](#Query+only) ↩︎
  * [.$(scope)](#Query+$) ↩︎
  * [.at(where)](#Query+at) ↩︎
  * [.limit(max)](#Query+limit) ↩︎
  * [.asc(...columns)](#Query+asc) ↩︎
  * [.desc(...columns)](#Query+desc) ↩︎
  * [.group(...columns)](#Query+group) ↩︎
  * [.raw()](#Query+raw) ↩︎
  * [.update(data, [where])](#Query+update) ↩︎
  * [.remove([where])](#Query+remove) ↩︎
  * [.select()](#Query+select) ↩︎
  * [.all([where])](#Query+all) ↩︎
  * [.sum(column)](#Query+sum) ↩︎
  * [.min(column)](#Query+min) ↩︎
  * [.max(column)](#Query+max) ↩︎
  * [.count([column])](#Query+count) ↩︎
  * [.use(connection)](#Query+use) ↩︎
  * [.bind(thisArg)](#Query+bind) ↩︎
  * [.run()](#Query+run) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.then(resolve, reject)](#Query+then) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.finally(handler)](#Query+finally) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.setOptions([options])](#Query+setOptions) ↩︎

<a name="Query+only"></a>
### query.only([...attributes]) ↩︎
Select only the provided list of attributes.
This overrides any scope

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [...attributes] | <code>string</code> | Attributes to select |

**Example**  
```js
User.at({ id: 42 }).only('name', 'age')
    .then(function (user) {
        // SELECT `User`.`name`, `User`.`age` FROM `user` `User`
        // WHERE `User`.`id` = 42
        // LIMIT 1
    });
```
<a name="Query+$"></a>
### query.$(scope) ↩︎
Set the scope of the query, so it selects only attributes within the scope

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| scope | <code>string</code> | The scope to choose |

**Example**  
```js
var User = ziti.define('User', {
   id: ziti.Int().primaryKey().autoIncrement().$([ 'account', 'profile' ]),
   username: ziti.String().$('profile'),
   age: ziti.Int(),
   sex: ziti.Enum('M', 'F').$('profile'),
   email: ziti.String().$('account')
});

User.at({ age: { $ge: 18 } }).$('profile')
   .then(function (user) {
       // SELECT `User`.`id`, `User`.`username`, `User`.`sex` FROM `user` `User`
       // WHERE `User`.`age` >= 18
       // LIMIT 1
   })

User.at({ age: { $ge: 18 } }).$('account')
   .then(function (user) {
       // SELECT `User`.`id`, `User`.`email` FROM `user` `User`
       // WHERE `User`.`age` >= 18
       // LIMIT 1
   })
```
<a name="Query+at"></a>
### query.at(where) ↩︎
Specify the WHERE expression to apply

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| where | <code>Object</code> | Query expression for the WHERE condition. |

**Example**  
```js
User.at({ id: 42 })
    .then(function (user) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`id` = 42
        // LIMIT 1
    });
```
<a name="Query+limit"></a>
### query.limit(max) ↩︎
Limit the number of rows to select.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| max | <code>Number</code> | The limit to set, if null it does not set any limit |

**Example**  
```js
User.at({ age: { $ge: 18 } }).all().limit(10)
    .then(function (users) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`age` >= 18
        // LIMIT 10
    });
```
<a name="Query+asc"></a>
### query.asc(...columns) ↩︎
Specify columns to sort in ascending order

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| ...columns | <code>string</code> | Columns to sort |

<a name="Query+desc"></a>
### query.desc(...columns) ↩︎
Specify columns to sort in descending order

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| ...columns | <code>string</code> | Columns to sort |

<a name="Query+group"></a>
### query.group(...columns) ↩︎
Speficy how to group the result-set by one or more columns

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| ...columns | <code>string</code> | Columns to group |

<a name="Query+raw"></a>
### query.raw() ↩︎
When retrieving data, it returns raw data instead of Model instance(s)

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  
<a name="Query+update"></a>
### query.update(data, [where]) ↩︎
Set the query as update

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to update |
| [where] | <code>Object</code> | Query expression to find the row. |

**Example**  
```js
User.at({ age: { $ge: 18 } }).update({ status: 'major' })
    .then(function (user) {
        // UPDATE `user` `User` SET `User`.`status` = 'major'
        // WHERE `User`.`age` >= 18
    });

// OR

User.update({ name: 'alex' }, { age: { $ge: 18 } })
    .then(function (user) {
        // UPDATE `user` `User` SET `User`.`status` = 'major'
        // WHERE `User`.`age` >= 18
    });
```
<a name="Query+remove"></a>
### query.remove([where]) ↩︎
Set the query as delete

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [where] | <code>Object</code> | Query expression to find the row. |

**Example**  
```js
User.at({ id: 42 }).remove()
    .then(function (user) {
        // DELETE FROM `User` USING `user` `User`
        // WHERE `User`.`id` = 42
    });

// OR

User.remove({ id: 42 })
    .then(function (user) {
        // DELETE FROM `User` USING `user` `User`
        // WHERE `User`.`id` = 42
    });
```
<a name="Query+select"></a>
### query.select() ↩︎
Set the query as select one.
Note that this is the default query, so it's not necessary to call it.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  
**Params**: <code>...string</code> [attributes] - Attributes to select (overrides #only)  
**Example**  
```js
User.at({ id: 42 }).select()
    .then(function (user) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`id` = 42
        // LIMIT 1
    });

// OR

User.at({ id: 42 })
    .then(function (user) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`id` = 42
        // LIMIT 1
    });
```
<a name="Query+all"></a>
### query.all([where]) ↩︎
Set the query as select all

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [where] | <code>Object</code> | Query expression to find the row. |

**Example**  
```js
User.at({ age: { $ge: 18 } }).all().limit(10)
    .then(function (users) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`age` >= 18
        // LIMIT 10
    });

// OR

User.all({ age: { $ge: 18 } }).limit(10)
    .then(function (users) {
        // SELECT `User`.`id`, `User`.`name` FROM `user` `User`
        // WHERE `User`.`age` >= 18
        // LIMIT 10
    });
```
<a name="Query+sum"></a>
### query.sum(column) ↩︎
Get the sum of the numeric values of the column

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> | The numeric column |

**Example**  
```js
User.sum('age').at({ username: { $not: null } })
    .then(function (sum) {
         // SELECT SUM(`User.`age`) FROM `user` `User`
         // WHERE `User`.`username` NOT NULL
    });
```
<a name="Query+min"></a>
### query.min(column) ↩︎
Get the minimum numeric values of the column

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> | The numeric column |

**Example**  
```js
User.min('age').at({ username: { $not: null } })
    .then(function (min) {
         // SELECT MIN(`User.`age`) FROM `user` `User`
         // WHERE `User`.`username` NOT NULL
    });
```
<a name="Query+max"></a>
### query.max(column) ↩︎
Get the maximum numeric values of the column

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> | The numeric column |

**Example**  
```js
User.max('age').at({ username: { $not: null } })
    .then(function (max) {
         // SELECT MAX(`User.`age`) FROM `user` `User`
         // WHERE `User`.`username` NOT NULL
    });
```
<a name="Query+count"></a>
### query.count([column]) ↩︎
Count the number of rows.
If a column is provided, it counts only the non-NULL values.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [column] | <code>string</code> | The column |

**Example**  
```js
User.count().at({ username: { $not: null } })
    .then(function (count) {
         // SELECT COUNT(*) FROM `user` `User`
         // WHERE `User`.`username` NOT NULL
    });
```
<a name="Query+use"></a>
### query.use(connection) ↩︎
Use this connection instead

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| connection | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

**Example**  
```js
ziti.withConnection(function (connection) {
    User.at({ id: 42 }).use(connection).run();
});
```
<a name="Query+bind"></a>
### query.bind(thisArg) ↩︎
Bind the query to thisArg.
This is useful to bind a callback.

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| thisArg | <code>\*</code> | 

**Example**  
```js
User.at({ id: 42 }).bind(this).then(this.callback);
```
<a name="Query+run"></a>
### query.run() ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Run the query and returns a promise than the query has been run

**Kind**: instance method of <code>[Query](#Query)</code>  
**Example**  
```js
User.at({ id: 42 }).run().then(function (user) {
   console.log(user.raw());
});
```
<a name="Query+then"></a>
### query.then(resolve, reject) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Shortcut for `query.run().then(resolve, reject)`

**Kind**: instance method of <code>[Query](#Query)</code>  

| Param | Type | Description |
| --- | --- | --- |
| resolve | <code>function</code> | Promise fulfilledHandler |
| reject | <code>function</code> | Promise rejectedHandler |

<a name="Query+finally"></a>
### query.finally(handler) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Shortcut for `query.run().finally(handler)`

**Kind**: instance method of <code>[Query](#Query)</code>  
**Resolve**: <code>Array.&lt;Object&gt;</code>  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Promise handler |

<a name="Query+setOptions"></a>
### query.setOptions([options]) ↩︎
Set options using an object instead, mainly for retro compatibility

**Kind**: instance method of <code>[Query](#Query)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.attributes] | <code>Array.&lt;string&gt;</code> | Select only the provided list of attributes. |
| [options.limit] | <code>Number</code> | Limit the number of rows to select |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

