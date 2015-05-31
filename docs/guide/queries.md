## Raw

It is possible to send raw queries to the server by using either:

* [ziti.query](/api/ziti/#ziti+query)
* [Model.query](/api/model/#Model+query)

## Connections

### Pool connection

When working with SQL operations, you may want to use a single pool connection to send multiple requests:

```javascript
ziti.withConnection(function (connection) {
    User.at({ id: 1 }, { using: connection })
    .then(function (user) {
        user.update({ name: 'Michael' }, { using: connection });
    });
});
```
See [ziti.withConnection](/api/ziti/#ziti+withConnection)

### Transactions

You can also use transactions the same way:

```javascript
ziti.withTx(function (tx) {
    User.at({ id: 1 }, { using: tx })
    .then(function (user) {
        user.update({ name: 'Michael' }, { using: tx });
    });
});
```

See [ziti.withTx](/api/ziti/#ziti+withTx)


## Expressions

In order to work with MySQL expressions, you can use the provided query builder.
With javascript, it may be more readable to build an expression.

To do so, ziti defines convenient operators you can use with `at`, `all`, `remove`, `update`, etc.

| ziti                             |  Alternative                     | MySQL                             |
|----------------------------------|----------------------------------|-----------------------------------|
| `{ id: 1 }`                      |                                  | ``WHERE `id` = 1``                |
| `{ name: 'alex' }`               |                                  | ``WHERE `name` = 'alex'``         |
| `{ admin: true }`                |                                  | ``WHERE `admin` = 1``             |
| `{ id: { $lt: 1 } }`             | `{ $lt: { id: 1 } }`             | ``WHERE `id` > 1``                |
| `{ id: { $gt: 1 } }`             | `{ $gt: { id: 1 } }`             | ``WHERE `id` < 1``                |
| `{ id: { $eq: 1 } }`             | `{ $eq: { id: 1 } }`             | ``WHERE `id` = 1``                |
| `{ id: { $le: 1 } }`             | `{ $le: { id: 1 } }`             | ``WHERE `id` <= 1``               |
| `{ id: { $ge: 1 } }`             | `{ $ge: { id: 1 } }`             | ``WHERE `id` >= 1``               |
| `{ id: { $not: null } }`         | `{ $not: { id: null } }`         | ``WHERE `id` NOT NULL``           |
| `{ id: { $like: 'noob%' } }`     | `{ $like: { id: 'noob%' } }`     | ``WHERE `id` LIKE 'noob%'``       |
| `{ id: { $nlike: 'noob%' } }`    | `{ $nlike: { id: 'noob%' } }`    | ``WHERE `id` NOT LIKE 'noob%'``   |
| `{ id: { $in: [ 1, 2, 3 ] } }`   | `{ $in: { id: [ 1, 2, 3 ] } }`   | ``WHERE `id` IN (1, 2, 3)``       |
| `{ id: { $nin: [ 1, 2, 3 ] } }`  | `{ $nin: { id: [ 1, 2, 3 ] } }`  | ``WHERE `id` NOT IN (1, 2, 3)``   |
| `{ id: { $regexp: '^[1-9]$' } }` | `{ $regexp: { id: '^[1-9]$' } }` | ``WHERE `id` REGEXP '^[1-9]$'``   |
| `[ '?? = ?', 'id', 42 ]`         |                                  | ``WHERE `id` = 42``               |
| ``'`id` = 42 AND 1 = 1'``        |                                  | ``WHERE `id` = 42 AND 1 = 1``     |
| `null`                           | `undefined`                      |                                   |


You can also use operators to combine expressions:

| ziti                                              | MySQL                                     |
|---------------------------------------------------|-------------------------------------------|
| `$or: [ { id: 1 }, { id: 2 } ]`                   | ``WHERE `id` = 1 OR `id` = 2``            |
| `$and: [ { name: 'alex' }, { age: { $ge: 18 } }]` | ``WHERE `name` = 'alex' AND `age` >= 18`` |
| `$xor: [ { id: 1 }, { age: 42 } ]`                | ``WHERE `id` = 1 XOR `age` = 42``         |
