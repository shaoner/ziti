## Getting or creating a Model instance

A Model instance allows you to manipulate your data. It's related to a Model just like an object is related to a class.

It's necessary to understand that an instance is identified by its primary key.
This means that if the associated Model has not any primary key, this may update or remove similar multiple rows in the associated table.

Let's have a look at a simple example:

```javascript
// Animal is the model
var Animal = ziti.define('Animal', {
    type: ziti.String,
    name: ziti.String
});
```

It can be created

```javascript
// cat is an instance of Animal, and is not save into the database
var cat = Animal.build({ type: 'cat', name: 'minouche' });
// now it's possible to save it
cat.save().then(function (cat) {
    // now cat has been inserted into the database
    console.log('Hello %s!', cat.get('name')); // Hello minouche!
});
```

You can create it by inserting data into the database as well

```javascript
Animal.save({ type: 'cat', name: 'minouche' }).then(function (cat) {
    // cat is an instance of Animal, and is saved into the database
    console.log('Hello %s!', cat.get('name')); // Hello minouche!
});
```

It's also possible to retrieve it using the `at` and `all` methods:

```javascript
Animal.at({ name: 'cat' }).then(function (cat) {
    console.log('Hello %s!', cat.get('name')); // Hello minouche!
});
```
## Getting and setting instance properties

As you should have noticed, you are able to get and set instance attributes by using `get` and `set` methods.

```javascript
// cat is an instance of Animal, and is not save into the database
var animal = Animal.build({ type: 'cat', name: 'minouche' });

console.log('I am a %s and my name is %s', animal.get('type'), animal.get('name'));
// I am cat and my name is minouche

animal.set('type', 'lion');
animal.set('name', 'simba');
console.log('I am now a %s and my name is %s, evolution right?', animal.get('type'), animal.get('name'));
// I am now a lion and my name is simba, evolution right?
```

Sometimes, you want to define your own getters and setters:

```javascript
var Animal = ziti.define('Animal', {
    type: ziti.String,
    name: ziti.String()
          .get(function () {
              return '[' + this.getValue('name').toUpperCase() + ']';
          }).set(function (value) {
              if (value === 'simba') { this.setValue('name', 'Mufasa'); }
              this.setValue('name', value);
          })
    });
```

[get](/api/instance/#Instance+get) works that way:

* It calls the attribute getter if defined
* If the attribute is an *included* instance, it returns an instance
* Otherwise, it returns the raw value
* If you don't provide any argument, it's returns all attributes in an object using [get](/api/instance/#Instance+get) recursively.

Of course, you are able to get a raw attribute value by using [getValue](/api/instance/#Instance+getValue) instead.

Finally, to get all raw values, you can call the [raw](/api/instance/#Instance+raw) method.

[set](/api/instance/#Instance+set) works that way:

* It calls the attribute setter if defined
* It sets the value as *new*, so when you call [save](/api/instance/#Instance+save), it only updates new values
* If the attribute argument is an object, it sets each key / value pair using [set](/api/instance/#Instance+set) recursively

## Interacting with the database

### Saving 

If your instance has not been saved into the database yet, then all data are inserted to it. Otherwise, this will update the table with the new data.

```javascript
var cat = Animal.build({ type: 'cat', name: 'minouche' });

cat.save().then(function (cat) {
    // INSERT INTO `animal` SET `type` = 'cat', `name` = 'minouche'

    cat.set({ name: 'pikachu' });
    return cat.save();
}).then(function (cat) {
    // UPDATE `animal` SET `name` = 'pikachu' WHERE `id` = 1
});
```

### Removing

This will simply remove the row(s) matching this model instance

```javascript
var cat = Animal.build({ type: 'cat', name: 'minouche' });

cat.save().then(function (cat) {
    // INSERT INTO `animal` SET `type` = 'cat', `name` = 'minouche'
    return cat.remove();
}).then(function (cat) {
    // DELETE FROM `animal` WHERE `id` = 1
});
```

### Refreshing

You can simply fetch data from the database to refresh your instance:


```javascript
var cat = Animal.build({ type: 'cat', name: 'minouche' }, { new: false });

cat.refresh().then(function (cat) {
    // SELECT `Animal`.`id`, `Animal`.`type`, `Animal`.`name` FROM `animal` `Animal` WHERE `Animal`.`type` = 'cat' AND `Animal`.`name` = 'minouche'
    return cat.remove();
}).then(function (cat) {
    // DELETE FROM `animal` WHERE `id` = 1
});
```
