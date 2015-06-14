## The Query class

A [Query](/api/query/) is an object that helps you identify rows in different cases:

- Retrieving data (`SELECT`)
- Updating data (`UPDATE`)
- Removing data (`DELETE`)

The default behavior is to retrieve one row to build a single instance.

A Query can be customized using chaining methods like adding a limit, filtering rows, ordering or changing the behavior of the query.

Note that the query is not executed until you call [then](/api/query/#Query+then) or [run](/api/query/#Query+run).

### [at](/api/query/#Query+at)

It specifies the WHERE clause of the query in order to filter the results using a condition.
It's necessary when you want to find one instance.

```javascript
Animal.at({ id: 42 })
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// WHERE `Animal`.`id` = 42
// LIMIT 1
```

### [all](/api/query/#Query+all)

This is used if you want to retrieve an array of instances instead of a single instance.

```javascript
Animal.all()
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`

Animal.at({ type: 'lion' }).all().limit(10)
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
// LIMIT 10

Animal.all({ type: 'lion' }).limit(10)
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
// LIMIT 10
```

### [update](/api/query/#Query+update)

This makes the query to update some data in database.

```javascript
Animal.update({ type: 'lion' }).at({ id: 42 })
// UPDATE `animal` `Animal` SET `Animal`.`type` = 'lion'
// WHERE `Animal`.`id` = 42

Animal.at({ id: 42 }).update({ type: 'lion' })
// UPDATE `animal` `Animal` SET `Animal`.`type` = 'lion'
// WHERE `Animal`.`id` = 42

Animal.update({ type: 'lion' }, { id: 42 })
// UPDATE `animal` `Animal` SET `Animal`.`type` = 'lion'
// WHERE `Animal`.`id` = 42

Animal.update({ type: 'bird' }).limit(10)
// UPDATE `animal` `Animal` SET `Animal`.`type` = 'bird'
// LIMIT 10
```

### [remove](/api/query/#Query+remove)

This makes the query to remove some data in database.

```javascript
Animal.at({ id: 42 }).remove()
// DELETE FROM `animal`
// WHERE `animal`.`id` = 42

Animal.remove().at({ id: 42 })
// DELETE FROM `animal`
// WHERE `animal`.`id` = 42

Animal.remove().limit(10)
// DELETE FROM `animal`
// LIMIT 10
```

### [count](/api/query/#Query+count)

This counts the rows you select and returns the result.

```javascript
Animal.at({ type: 'lion' }).count()
// SELECT COUNT(*) FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'

Animal.count().at({ type: 'lion' })
// SELECT COUNT(*) FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
```

### [sum](/api/query/#Query+sum)

It retrieves the sum of the values in a column

```javascript
Animal.sum('id').at({ type: 'lion' })
// SELECT SUM(`id`) FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
```


### [min](/api/query/#Query+min)

It retrieves the minimum value of a column

```javascript
Animal.min('id').at({ type: 'lion' })
// SELECT MIN(`id`) FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
```

### [max](/api/query/#Query+max)

It retrieves the maximum value of a column

```javascript
Animal.max('id').at({ type: 'lion' })
// SELECT MAX(`id`) FROM `animal` `Animal`
// WHERE `Animal`.`type` = 'lion'
```

### Other options

#### [limit](/api/query/#Query+limit)

Specify the maximum number of rows to filter

```javascript
Animal.all().limit(10)
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// LIMIT 10
```

#### [asc](/api/query/#Query+asc)

Specify columns to sort in ascending order

```javascript
Animal.all().asc('type')
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// ORDER BY `Animal`.`type` ASC
```

#### [desc](/api/query/#Query+desc)

Specify columns to sort in descending order

```javascript
Animal.all().desc('id')
// SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal`
// ORDER BY `Animal`.`id` DESC
```

#### [use](/api/query/#Query+use)

Make the query to use the provided connection. This is mainly useful for transactions.

```javascript
ziti.withTx(function (tx) {
    Animal.save({ type: 'bird' }).use(tx)
        .then(function (animal) {
            return User.update({ animal_id: animal.get('id') }, { id: 42 }).use(tx)
        });
});

// START TRANSACTION
// INSERT INTO `animal` `Animal` (`type`) VALUES('bird')
// UPDATE `user` `User` SET `User`.`animal_id` = 69 WHERE `User`.`id` = 42
// COMMIT
```

## Raw queries

It is possible to send raw queries to the server by using either:

* [ziti.query](/api/ziti/#Db+query)
* [Model.query](/api/model/#Model+query)

Example:

```javascript
ziti.query([ 'SELECT ?? FROM ?? WHERE ?? > ?', [ 'id', 'name' ], 'user', 'id', 42 ])
   .spread(function (result) {
      // result is an array of plain objects that looks like:
      // [ { id: 43, name: 'Heisenberg' }, { id: 44, name: 'Hannibal' }, ... ]
   });
```

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
See [ziti.withConnection](/api/ziti/#Db+withConnection)

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

See [ziti.withTx](/api/ziti/#Db+withTx)

## Expressions

In order to work with MySQL expressions, you can use the provided query builder.
With javascript, it may be more readable to build an expression.

To do so, ziti defines convenient operators you can use with [at](/api/model/#Model+at), [all](/api/model/#Model+all), [remove](/api/model/#Model+remove), [update](/api/model/#Model+update), etc.

### Where

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

### MySQL functions

| ziti | MySQL |
| ---- | ----- |
| `{ id: ziti.$inc }` | ``SET `id` = `id` + 1``
| `{ id: ziti.$inc('id') }` | ``SET `id` = `id` + 1``
| `{ id: ziti.$inc('id', 2) }` | ``SET `id` = `id` + 2``
| `{ id: ziti.$inc(ziti.$dec('id', 2), 5) }` | ``SET `id` = `id` - 2 + 5``
| `{ id: [ '?? + ?', 'id', 42 ] }` | ``SET `id` = `id` + 42``

For more information, take a look at [the complete list of functions](/api/functions/)
