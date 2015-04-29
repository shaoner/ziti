## Installation

```
npm install ziti
```

## First steps

### Define your Models

```javascript
var ziti = require('ziti');
var Address = require('./address');
var Photo = require('./photo');

var User = ziti.define('User', {
    name: ziti.String,
    age: ziti.Int().default(18),
    address: Address,
    photos: [ Photo ]
});

module.exports = User;
```

For more information about models, take a look at the [Model tutorial](/tutorial/model/)

### Setting up ziti

```javascript
ziti.configure({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ziti_test',
    debug: true,
});
```
For more information about ziti, take a look at the [ziti tutorial](/tutorial/ziti/)

### Synchronizing

```javascript
ziti.sync().then(function () {
    // A table 'user' have been created
    return User.save({ name: 'alex' });
}).then(function (user) {
    // A new user named 'alex' have been inserted, by default he's 18
    return user.update({ age: 28 });
}).then(function (user) {
    // His age have been updated to 28
    console.log(user.raw()); // { name: 'alex', age: 28 }
    return user.remove();
}).then(function (user) {
    // The new user has been removed from database
});
```

Usually synchronization is handled before starting your application.
So here is an example extending [express hello world example](http://expressjs.com/starter/hello-world.html):

```javascript
var express = require('express');
var ziti = require('ziti');
var app = express();

var User = ziti.define('User', {
    name: ziti.String,
    age: ziti.Int().default(18)
});

ziti.configure({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ziti_test',
    debug: true, // This can be a function as well, it will log queries
});

app.get('/', function (req, res, next) {
    User.at({ id: 1 })
     .then(function (user) {
          res.send('Hello %s', user.get('name'));
      }).catch(next);
});

var server;

// Synchronize ziti with the database, before starting the application
ziti.sync().nodeify(function (err) {
    if (err) {
        // we cannot synchronize, so no need to start the application
        throw err;
    }
    // ziti is now synchronized with the database
    server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
});
```
