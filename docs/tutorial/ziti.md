## Defining a model

First, you can define your models in separate files without wondering if ziti is connected to a database or not. You just have to call `ziti.define`

```javascript
var ziti = require('ziti');

var User = ziti.define('User', {
  name: ziti.String,
  age: ziti.Int,
  email: ziti.Varchar(255).notNull().unique()
});

module.exports = User;
```

## Adding global methods to your models and model instances

ziti lets you add generic methods that will be added to all your models and model instances.

For example, with our previous example:

```javascript
ziti.setStatic('sayHello', function () {
    console.log('Hello', this._name);
});

// ...

User.sayHello(); // 'Hello User'
```

You can also set instance methods with the same syntax:

```javascript
ziti.setMethod('sayHello', function () {
    console.log('Hello', this.model._name);
});

// ...

User.at({ id: 1 }).then(function (user) {
    user.sayHello(); // 'Hello User'
});
```
Of course, you can also set a method which has the same name of an existing one.

```javascript
ziti.setStatic('at', function () {
    console.log('Lets find one', this._name);
    return this.constructor.prototype.at.apply(this, arguments);
});

ziti.setMethod('remove', function () {
    console.log('I dont wanna be a ', this.model.name, 'anymore!');
    return this.constructor.prototype.remove.apply(this, arguments);
});

User.at({ id: 1 }).then(function (user) { // Lets find one User
    return user.remove(); // I dont wanna be a User anymore!
});
```

## Setting up ziti

When your configuration is available, you can add it:

```javascript
ziti.configure({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ziti_test',
    debug: true, // This can be a function as well, it will log queries
});
```
For additional options, you can take a look at [mysql connection options](https://github.com/felixge/node-mysql#connection-options)

## Synchronizing your models

When your models are registered to ziti and ziti is configured, you can synchronize everything with the database:

```javascript
ziti.sync({ dropTable: true, createTable: true })
    .then(function () {
        // All tables will be dropped if they exist
        // Then, all tables will be created if they don't exist
        // Finally, if a Model does not match a table in database, it can be automigrated (see next section)
    });
```

### Auto migration

In the previous section, the autoMigrate option helps you to add and remove columns to reflect the model in database. This can be useful for development.

For example with our previous example:

```javascript
var User = ziti.define('User', {
    name: ziti.String,
    age: ziti.Int,
    email: ziti.Varchar(255).notNull().unique()
});

```

This generates a table called `user` with the following columns:

| Field | Type         | Null | Key | Default | Extra          |
|-------|--------------|------|-----|---------|----------------|
| name  | varchar(255) | YES  |     | NULL    |                |
| age   | int(11)      | YES  |     | NULL    |                |
| email | varchar(255) | NO   | UNI | NULL    |                |
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |


Now, if you decide to add a new column birthyear to your model and to remove the age:

```javascript
var User = ziti.define('User', {
    name: ziti.String,
    email: ziti.Varchar(255).notNull().unique(),
    birthyear: ziti.Int().default(1997).notNull()
});
```

With autoMigrate option set to true, the previous age column will be dropped and the new birthyear column will be added:

| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| name      | varchar(255) | YES  |     | NULL    |                |
| email     | varchar(255) | NO   | UNI | NULL    |                |
| birthyear | int(11)      | NO   |     | 1997    |                |
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |


For now, it only works when adding or removing a column, not when changing its type.
