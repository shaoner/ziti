## Defining a model

Usually models are defined into separate files, so you can import (using `require`) the ones you need.

To define your model, you have to use `ziti.define`:

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

Finally, the primary key can be multiple fields:

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

### Default field value

You can speficy a default value for a field by setting the `default` option.

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

When retrieving data, it always as a model instance.

### at

This retrieve only one result, so it returns a single model instance or null if not found:

```javascript
Animal.at({ type: 'cat' }).then(function (animal) {
    // SELECT `Animal`.`id`, `Animal`.`type` FROM `animal` `Animal` WHERE `Animal`.`type` = 'cat' LIMIT 1
    console.log(animal.raw());
    // { id: 1, type: 'cat' }
});
```

For conveniency, you can simply do that to get raw data:

```javascript
Animal.at({ type: 'cat' }).call('raw').then(function (animal) {
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

## Updating data

```javascript
Animal.update({ type: 'horse' }, { $or: [ { type: 'dog' }, { type: 'cat' } ] })
   .then(function () {
        // UPDATE `animal` `Animal` SET `type` = 'horse' WHERE `Animal`.`type` = 'dog' OR `Animal`.`type` = 'cat'
        console.log('Cats and dogs turned into horses! Without any drugs!');
   });
```

## Removing data

```javascript
Animal.remove({ type: 'horse' }).then(function () {
    // DELETE FROM `Animal` USING `animal` `Animal` WHERE `Animal`.`type` = 'horse'
    console.log('Horses are all dead!');
});
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

Take a look at [model instances](/tutorial/instance/) for more information.

## Custom methods

### Model methods

If the method is global to all model, you can use `ziti.setStatic` as explained [here](/tutorial/ziti/#adding-global-methods-to-your-models-and-model-instances)

If the method is for a specific model, you can use `setStatic` as well:

```javascript
Animal.setStatic('getDogs', function () {
    return this.all({ type: 'dog' });
});

Animal.getDogs().then(function (dogs) {
   // dogs is an array of dogs
});
```

If you want to override a method already defined, you can use `this.constructor.prototype`:

```javascript
Animal.setStatic('at', function () {
    console.log('Please! Get me an animal!');
    return this.constructor.prototype.at.apply(this, arguments);
});
```

### Model instance methods

If the method is global to all model instances, you can use `ziti.setMethod` as explained [here](/tutorial/ziti/#adding-global-methods-to-your-models-and-model-instances)

If the method is for a specific model instance, you can use `setMethod` as well:

```javascript
Animal.setMethod('sayHello', function () {
    console.log('Hello there!');
});

Animal.at({ type: 'cat' }).then(function (cat) {
    cat.sayHello(); // Hello there!
});
```

If you want to override a method already defined, you can use `this.constructor.prototype` as well:

```javascript
Animal.setMethod('refresh', function () {
    console.log('I am young again!');
    return this.constructor.prototype.refresh.apply(this, arguments);
});
```
