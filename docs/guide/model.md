## Defining a model

Usually models are defined into separate files, so you can import (using `require`) the ones you need.

To define your model, you have to use [ziti.define](/api/ziti/#Db+define):

```javascript
var ziti = require('ziti');

var Animal = ziti.define('Animal', {
    type: ziti.String
});

module.exports = Animal;
```

It will be mapped to a table `animal`

| Field | Type         | Null | Key | Default | Extra          |
|-------|--------------|------|-----|---------|----------------|
| type  | varchar(255) | YES  |     | NULL    |                |
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |

Since, it has to reflect a MySQL table, you can add options for each field:

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.String().notNull().unique()
});
```

### Options

When defining a model, you can specify additional options as the third parameter. Take a look at the [API](/api/model/) for more information.

### Primary key

You can also explicitly set the primary key yourself:

```javascript
var Animal = ziti.define('Animal', {
    animal_id: ziti.Int().notNull().autoIncrement().primaryKey(),
    type: ziti.String
});
```

Or by simply set it in the model options:

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.STRING
}, {
    autoId: 'animal_id'
});
```

You can also prevent the creation of any primary key by setting `autoId` to `false`

The primary key can be multiple fields:

```javascript
var Animal = ziti.define('Animal', {
    animal_id: ziti.Int().notNull().autoIncrement().primaryKey(),
    type: ziti.String().primaryKey().notNull()
});
```

| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| animal_id | int(11)      | NO   | PRI | NULL    | auto_increment |
| type      | varchar(255) | NO   | PRI | NULL    |                |

It also works with foreign keys:

```javascript
var AnimalRelationship = ziti.define('AnimalRelationship', {
    animal: ziti.ForeignKey(Animal).primaryKey(),
    owner: ziti.ForeignKey(User).primaryKey()
});
```

### Default field value

You can speficy a default value for a field by setting the [default](/api/types/#AbstractType+default) option.

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.String().default(null)
});
```

It can also be a function. In that case, it will be evaluated before inserting data to the associated model table.

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.String().default(function () { return new Date().getTime(); })
});
```

Default values are set to model instances when not explicitly set.

## Inserting data

To insert data into the model table, you can simply call [save](/api/model/#save) with your data:

```javascript
Animal.save({ type: 'cat' });
```
or multiple:

```javascript
Animal.save([ { type: 'cat' }, { type: 'dog' } ]);
```

It returns a promise fullfilled with an Animal instance or an array of Animal instances.

## Retrieving data

When retrieving data, it results model instances.

### at

This retrieves only one result, so it returns a single model instance or null if not found:

```javascript
Animal.at({ type: 'cat' }).then(function (animal) {
    // SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal` WHERE `Animal`.`type` = 'cat' LIMIT 1
    console.log(animal.raw());
    // { id: 1, type: 'cat' }
});
```

For conveniency, you can simply use the [Promise#call](https://github.com/petkaantonov/bluebird/blob/master/API.md#callstring-propertyname--dynamic-arg---promise) method to have raw data instead of a model instance:

```javascript
Animal.at({ type: 'cat' }).raw().then(function (animal) {
    console.log(animal);
    // { id: 1, type: 'cat' }
});
```

### all

This allows to retrieve data as an array of model instances:

```javascript
Animal.all({ id: { $lt: 10 } }).then(function (animals) {
    // SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal` WHERE `Animal`.`id` > 10
    console.log(animals.forEach(function (animal) { return animal.raw(); }));
    /*
      [
        { id: 11, type: 'cat' },
        { id: 12, type: 'dog' },
        { id: 13, type: 'fish' }
      ]
    */
});
```

### Filter the attributes

You may want to retrieve a subset of attributes.

*Note that primary keys are always included to help identifying the data*.

#### Scopes

You can define a scope within your Model definition by using the [$](/api/types/#AbstractType+$) function.

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.String().default(null).$('profile'),
    name: ziti.String().notNull().$('profile'),
    age: ziti.Int().default(0).$('profile'),
    creation_date: ziti.Datetime().default(ziti.NOW)
});
```

Here a scope named *profile* has been defined and it includes fields: *type*, *name*, and *age*.
It is now possible to retrieve only data included into this scope, so this excludes the field *creation_date*:

```javascript
Animal.all({ age: { $lt: 0 } }).$('profile')
    .then(function (animals) {
        // SELECT `Animal`.`id`, `Animal`.`type`, `Animal`.`name`, `Animal`.`age`
        // FROM `animal` `Animal`
        // WHERE `Animal`.`age` > 0
    });
```

Notice that you can define multiple scopes by fields.

#### Specifying fields

You can use [only](/api/query/#Query+only) to only get some fields:

```javascript
Animal.all({ age: { $lt: 0 } }).only('type', 'creation_date')
    .then(function (animals) {
        // SELECT `Animal`.`id`, `Animal`.`type`, `Animal`.`creation_date`
        // FROM `animal` `Animal`
        // WHERE `Animal`.`age` > 0
    });
```

#### Additional or less fields

For additional fields, use [with](/api/query/#Query+with):

```javascript
Animal.all({ age: { $lt: 0 } }).only('type', 'creation_date').with('age')
    .then(function (animals) {
        // SELECT `Animal`.`id, `Animal`.`type`, `Animal`.`creation_date`, `Animal`.`age`
        // FROM `animal` `Animal`
        // WHERE `Animal`.`age` > 0
    });
```

To exclude fields, use [without](/api/query/#Query+without):

```javascript
Animal.all({ age: { $lt: 0 } }).only('type', 'creation_date', 'age').without('age')
    .then(function (animals) {
        // SELECT `Animal`.`id, `Animal`.`type`, `Animal`.`creation_date`
        // FROM `animal` `Animal`
        // WHERE `Animal`.`age` > 0
    });
```

This is mainly useful when it's combined with a scope or to retrieve association of associations (see [here](/guide/associations/#retrieving-associations) for more details):

```javascript
Animal.all({ age: { $lt: 0 } }).$('profile').with('creation_date').without('age')
    .then(function (animals) {
        // SELECT `Animal`.`id`, `Animal`.`type`, `Animal`.`name`, `Animal`.`creation_date`
        // FROM `animal` `Animal`
        // WHERE `Animal`.`age` > 0
    });
```

### Plain objects

By default when retrieving data, [model instances](/guide/instance/) are built with these data.
To retrieve data as plain objects instead, use [raw](/api/query/#Query+raw).

```javascript
Animal.all({ age: { $lt: 0 } }).raw()
    .then(function (animals) {
         /*
          [
             { id: 1, type: 'lion', name: 'simba', age: 1, creation_date: '...' },
             { id: 2, type: 'lion', name: 'mufasa', age: 10, creation_date: '...' }
          ]
         */
    });
```

This is equivalent to:

```javascript
Animal.all({ age: { $lt: 0 } })
    .then(function (animals) {
         return animals.map(function (animal) { return animal.raw(); });
    }).then(function (animals) {
         /*
          [
             { id: 1, type: 'lion', name: 'simba', age: 1, creation_date: '...' },
             { id: 2, type: 'lion', name: 'mufasa', age: 10, creation_date: '...' }
          ]
         */
    });
```

Except that the second form [model instances](/guide/instance/) are built before calling raw

## Updating data

This updates rows with new values in the associated database table.

```javascript
Animal.update({ type: 'horse' }, { $or: [ { type: 'dog' }, { type: 'cat' } ] })
   .then(function () {
        // UPDATE `animal` `Animal` SET `type` = 'horse'
        // WHERE `Animal`.`type` = 'dog' OR `Animal`.`type` = 'cat'
        console.log('Cats and dogs turned into horses! Without any drugs!');
   });
```

It is also possible to use the [at](/api/query/#Query+at) syntax:

```javascript
Animal.at({ $or: [ { type: 'dog' }, { type: 'cat' } ] }).update({ type: 'horse' })
   .then(function () {
        // UPDATE `animal` `Animal` SET `type` = 'horse'
        // WHERE `Animal`.`type` = 'dog' OR `Animal`.`type` = 'cat'
        console.log('Cats and dogs turned into horses! Without any drugs!');
   });
```

## Removing data

This removes rows in the associated database table.

```javascript
Animal.remove({ type: 'horse' }).then(function () {
    // DELETE FROM `Animal` USING `animal` `Animal`
    // WHERE `Animal`.`type` = 'horse'
    console.log('Horses are all dead!');
});
```

Or with the [at](/api/query/#Query+at) syntax:

```javascript
Animal.at({ type: 'horse' }).remove().then(function () {
    // DELETE FROM `Animal` USING `animal` `Animal`
    // WHERE `Animal`.`type` = 'horse'
    console.log('Horses are all dead!');
});
```

## Insert or update

If you want to insert OR update existing rows by using a unique / primary key field, you can use the [Model#upsert()](/api/model/#Model+upsert)

```javascript
// Here the "type" field is supposed to be a primary key

Animal.upsert({ type: 'squirrel', name: 'scrat' });
// INSERT INTO `animal` SET `type`='squirrel', `name`='scrat' ON DUPLICATE VALUE UPDATE `type`='squirrel', name='scrat'
// This adds a new squirrel named scrat

Animal.upsert({ type: 'squirrel', name: 'alvin' });
// INSERT INTO `animal` SET `type`='squirrel', `name`='alvin' ON DUPLICATE VALUE UPDATE `type`='squirrel', name='alvin'
// This updates the name of the previous squirrel to alvin
```

## Building a model instance

```javascript
var dog = Animal.build({ type: 'dog' });
console.log('I am a %s', dog.get('type')); // 'dog'
dog.save().call('raw').then(function (dog) {
    // The dog has been inserted into the database and it fills the id field
    console.log(dog); // { id: 1, type: 'dog' }
});
```

Take a look at [model instances](/guide/instance/) for more information.

## Custom methods

### Model methods

If the method is global to all model, you can use [ziti.statics](/api/ziti/#Db+statics) as explained [here](/guide/ziti/#adding-global-methods-to-your-models-and-model-instances)

If the method is for a specific model, you can directly assign the method to the [Model](/api/model/):

```javascript
Animal.getDogs = function () {
    return this.all({ type: 'dog' });
};

// ...

Animal.getDogs().then(function (dogs) {
   // dogs is an array of dogs
});
```

If you want to override a method already defined, you can use `this.constructor.prototype`:

```javascript
Animal.at = function () {
    console.log('Please! Get me an animal!');
    return this.constructor.prototype.at.apply(this, arguments);
};
```

### Model instance methods

If the method is global to all model instances, you can use [ziti.methods](/api/ziti/#Db+methods) as explained [here](/guide/ziti/#adding-global-methods-to-your-models-and-model-instances)

If the method is for a specific model instance, you can use [Model.methods](/api/model/#Model+methods) as well:

```javascript
Animal.methods.sayHello = function () {
    console.log('Hello there!');
};

// ...

Animal.at({ type: 'cat' }).then(function (cat) {
    cat.sayHello(); // Hello there!
});
```

If you want to override a method already defined, you can use `this.constructor.prototype` as well:

```javascript
Animal.methods.refresh = function () {
    console.log('I am young again!');
    return this.constructor.prototype.refresh.apply(this, arguments);
};
```
