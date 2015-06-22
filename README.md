# <img src="/docs/images/logo.png" alt="ziti - MySQL ORM for Node.js" width="35" height="35"> ziti

 MySQL ORM for node.js

[![npm](https://img.shields.io/npm/v/ziti.svg)](https://www.npmjs.com/package/ziti)
[![Travis branch](https://img.shields.io/travis/shaoner/ziti/master.svg)](https://travis-ci.org/shaoner/ziti)
[![npm](https://img.shields.io/npm/l/ziti.svg)](https://www.npmjs.com/package/ziti)
[![npm](https://img.shields.io/npm/dm/ziti.svg)](https://www.npmjs.com/package/ziti)
[![Documentation Status](https://readthedocs.org/projects/ziti/badge/?version=latest)](https://readthedocs.org/projects/ziti/?badge=latest)
[![Dependency Status](https://david-dm.org/shaoner/ziti.svg)](https://david-dm.org/shaoner/ziti)

## Installation

```
npm install ziti
```

The API documentation is available at [http://ziti.ewdl.org/](http://ziti.ewdl.org/) including a guide and many examples.

### Define your Models in separate files

```javascript
var ziti = require('ziti');
var Address = require('./address');
var Photo = require('./photo');
var Language = require('./language');

var User = ziti.define('User', {
    name: ziti.String().unique(),
    age: ziti.Int().default(18),
    address: Address,                   // One to One relationship
    photos: [ Photo ],                  // One to Many relationship
    langs: [ Language, 'UserLanguage' ] // Many to Many relationship
});

module.exports = User;
```

### Configure & synchronize your models

```javascript
ziti.configure({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ziti_test',
    debug: true,
});

ziti.sync().then(function () {
    // All tables have been created
});
```

### Play with your models anywhere

```javascript

User.save({ name: 'alex' }) // A new user named 'alex' is created, age is 18 by default
    .then(function (user) {
        return user.update({ age: 28 }); // His age is updated to 28
    }).then(function (user) {
        console.log(user.raw()); // { name: 'alex', age: 28 }
        return user.remove(); // The user is removed from database
    }).then(function (user) {
        // ...
    });
```

For more information, you can read the [Guide](http://ziti.ewdl.org/en/latest/tutorial/getting-started/)

## Tests

To run tests on ziti, first take a look at the [config](/test/config.js) to use your own test server

Then, just run:

```
npm test
```
