## Add a relationship

You can add different type of relationships between models, being able to retrieve associated models from one another.

### 1:1

* A User has **one** Address and an Address belongs to **one** User (1:1)

```javascript
var Address = ziti.define('Address', {
    street: ziti.String,
    number: ziti.Int
});

var User = ziti.define('User', {
    name: ziti.String,
    address: Address
});

// OR

var User = ziti.define('User', {
    name: ziti.String,
    address: ziti.One(Address)
});

```

This means:

* A foreign key is added to the target model (Address) matching the primary key of the source (User) if not already exists. Here a *user_id* field will be added to the Address model.
* An Address instance is also retrieved when retrieving the source.
* There are several options to customize this relationship (See [One](/api/types/#One))

Example:

```javascript
User.at({ id: 1 }).then(function (user) {
    console.log(user.raw());
    /*
       { id: 1, name: 'Alex', address: { street: 'jump street', number: 22 } }
    */
    return user.address.update({ number: 23 });
});
```

### 1:n

* A User has **many** Photo and a Photo belongs to **one** User (1:n)

```javascript
var Photo = ziti.define('Photo', {
    path: ziti.String
});

var User = ziti.define('User', {
    name: ziti.String,
    address: Address,
    photos: [ Photo ]
});

// OR

var User = ziti.define('User', {
    name: ziti.String,
    address: ziti.One(Address),
    photos: ziti.Many(Photo)
});
```

This means:

* A foreign key is added to the target model (Photo) matching the primary key of the source (User) if not already exists. Here a *user_id* field will be added to the Photo model.
* An array of Photo instances is also retrieved when retrieving the User.
* There are several options to customize this relationship (See [Many](/api/types/#Many))

Example:

```javascript
User.at({ id: 1 }).then(function (user) {
    console.log(user.raw());
    /*
       {
          id: 1,
          name: 'Alex',
          address: { street: 'jump street', number: 22 },
          photos: [ { path: 'hello.jpg' }, { path: 'world.jpg' } ]
       }
    */
    return user.photos[1].update({ path: 'foo.jpg' });
});
```

### n:m

* A User has **many** Language and a Language has **many** User (n:m)

```javascript
var Language = ziti.define('Language', {
    name: ziti.String
});

var User = ziti.define('User', {
    name: ziti.String,
    address: Address,
    photos: [ Photo ],
    langs: [ Language, 'UserLanguage' ]
});

// OR

var User = ziti.define('User', {
    name: ziti.String,
    address: ziti.One(Address),
    photos: ziti.Many(Photo),
    langs: ziti.Many(Language).through('UserLanguage')
});
```

This means:

* An intermediary model (UserLanguage) is created if not exists
* A foreign key is added to the intermediary model (UserLanguage) matching the primary key of the source (User) and a foreign key matching the primary key of the target (Language) if not already exists. Here *user_id* and *language_id* fields will be added to the UserLanguage model.
* An array of Language instances is also retrieved when retrieving the User.
* There are several options to customize this relationship (See [Many](/api/types/#Many))

Example:

```javascript
User.at({ id: 1 }).then(function (user) {
    console.log(user.raw());
    /*
       {
          id: 1,
          name: 'Alex',
          address: { street: 'jump street', number: 22 },
          photos: [ { path: 'hello.jpg' }, { path: 'world.jpg' } ],
          langs: [ { name: 'french' }, { name: 'anglais' } ]
       }
    */
    return user.lang[1].update({ name: 'english' });
});
```
### Foreign keys

It is also possible to provide an explicit foreign key to your models.

```javascript
var Address = ziti.define('Address', {
    street: ziti.String,
    number: ziti.Int,
    owner: ziti.ForeignKey('User')
});
```
This means:

* A foreign key is added to the source model (Address) matching the primary key of the target model (User) if not already exists. Here a *owner_id* field will be added to the Address model.
* A User instance is also retrieved when retrieving an Address.
* There are several options to customize this relationship (See [ForeignKey](/api/types/#ForeignKey))

Example:

```javascript
Address.at({ street: 'jump street', numero: 22 }).then(function (address) {
    console.log(address.raw());
    /*
    { id: 1, street: 'jump street', numero: 22, owner: { id: 1, name: 'Alex' } }
    */
    return address.user.remove();
});
```

## Options

It can be convenient to retrieve a related model using custom options.

### on

You can specify which fields are used to associate models.
For example, you may want to associate an Address to a User name rather than its id:

```javascript
var User = ziti.define('User', {
    name: ziti.String,
    address: ziti.One(Address).on({ name: 'user_name' })
});
```

This tells that a user_name field will be added to the Address model related to the User name field.

### relatedName

Since you can declare an explicit [ForeignKey](/api/types/#ForeignKey) when defining a model, it is necessary to identify it when refering the foreign key in another Model. It links relationships between two models.
For example:

```javascript
var Address = ziti.define('Address', {
    street: ziti.String,
    number: ziti.Int,
    owner: ziti.ForeignKey('User')
});

var User = ziti.define('User', {
    name: ziti.String,
    address: ziti.One(Address).relatedName('owner')
});
```

## Retrieving associations

By default, associations defined in a Model are also included when retrieving data from this Model.
It is possible to define your own scope to only retrieve the Model fields you want.
For example:

```javascript
var User = ziti.define('User', {
    name: ziti.String().$('profile'),
    address: ziti.One(Address).relatedName('owner')
});

User.at({ name: 'Alex' }).$('profile').raw()
    .then(function (user) {
        console(user);
        /*
        { name: 'Alex' }
        */
    });
```

It is also possible to retrieve a specific field that belongs to a reference using `reference.field` notation.
For example:
```javascript
User.at({ name: 'Alex' }).only('name', 'address.street').raw()
    .then(function (user) {
        console(user);
        /*
        { name: 'Alex', address: { id: 1, street: 'jumpstreet' } }
        */
    });
```
