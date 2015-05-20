# <img src="/docs/images/logo.png" alt="ziti - MySQL ORM for Node.js" width="35" height="35"> ziti

 MySQL ORM for node.js

[![npm](https://img.shields.io/npm/v/ziti.svg?style=flat-square)](https://www.npmjs.com/package/ziti)
[![Travis branch](https://img.shields.io/travis/shaoner/ziti/master.svg?style=flat-square)](https://travis-ci.org/shaoner/ziti)
[![npm](https://img.shields.io/npm/l/ziti.svg?style=flat-square)](https://www.npmjs.com/package/ziti)
[![npm](https://img.shields.io/npm/dm/ziti.svg?style=flat-square)](https://www.npmjs.com/package/ziti)

## Installation

```
npm install ziti
```

The complete documentation is available at [http://ziti.readthedocs.org](http://ziti.readthedocs.org/)

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
