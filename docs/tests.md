# TOC
   - [Associations](#associations)
     - [Model](#associations-model)
     - [#save()](#associations-save)
     - [#at()](#associations-at)
     - [#all](#associations-all)
   - [Functions](#functions)
     - [Increment](#functions-increment)
     - [Decrement](#functions-decrement)
     - [Function with 1 argument](#functions-function-with-1-argument)
     - [Function chaining](#functions-function-chaining)
   - [Instance](#instance)
     - [#set()](#instance-set)
     - [#get()](#instance-get)
     - [#raw()](#instance-raw)
     - [#toJSON()](#instance-tojson)
     - [#save()](#instance-save)
     - [#update()](#instance-update)
     - [#remove()](#instance-remove)
     - [#refresh()](#instance-refresh)
   - [Model & model instance methods](#model--model-instance-methods)
     - [Global methods](#model--model-instance-methods-global-methods)
     - [Model static methods](#model--model-instance-methods-model-static-methods)
     - [Model instance methods](#model--model-instance-methods-model-instance-methods)
   - [Model](#model)
     - [Structure](#model-structure)
     - [#table](#model-table)
     - [#name](#model-name)
     - [#save()](#model-save)
     - [#remove()](#model-remove)
     - [#at()](#model-at)
     - [#all()](#model-all)
     - [#upsert()](#model-upsert)
     - [#sum(), #min(), #max(), #count()](#model-sum-min-max-count)
   - [Queries](#queries)
     - [Raw queries](#queries-raw-queries)
<a name=""></a>
 
<a name="associations"></a>
# Associations
<a name="associations-model"></a>
## Model
A One referenced model has the correct foreign key.

```js
expect(Address._core).to.have.property('user_id');
done();
```

A Many referenced model has the correct foreign key.

```js
expect(Photo._core).to.have.property('user_id');
done();
```

A Many to many referenced model should exists and have a both foreign keys.

```js
var UserLanguage = ziti.get('UserLanguage');
expect(UserLanguage).to.be.ok;
expect(UserLanguage._core).to.have.property('user_id');
expect(UserLanguage._core).to.have.property('langs_id');
done();
```

A Foreign key is properly defined.

```js
expect(Phone._core).to.have.property('user_id');
expect(Phone._core.user_id._primaryKey).to.be.false;
expect(Phone._core.user_id._autoIncrement).to.be.false;
expect(Phone._core.user_id._typeName).to.equals(User._core.id._typeName);
done();
```

<a name="associations-save"></a>
## #save()
should insert multiple Model sources.

```js
User.save([
    {
        firstname: 'dexter',
        lastname: 'morgan',
        nickname: 'butcher',
        age: 35
    },
    {
        firstname: 'walter',
        lastname: 'white',
        nickname: 'heisenberg',
        age: 50
    },
    {
        firstname: 'franck',
        lastname: 'underwood',
        nickname: 'francis',
        age: 50
    },
]).then(function (users) {
    scope.users = [ ];
    expect(users).to.be.an('array').and.to.have.length(3);
    users.forEach(function (user) {
        expect(user).to.be.an.instanceof(ModelInstance);
        var raw = user.raw();
        scope.users.push(raw);
    });
}).finally(done).catch(done);
```

should insert One to One Model targets.

```js
Address.save([
    {
        street: 'jump street',
        number: 22,
        user_id: scope.users[0].id
    },
    {
        street: 'lombard street',
        number: 42,
        user_id: scope.users[1].id
    },
    {
        street: 'champs elysees',
        number: 42,
        user_id: scope.users[2].id
    },
]).then(function (addresses) {
    scope.addr = [ ];
    addresses.forEach(function (address) {
        scope.addr.push(address.raw());
    });
}).finally(done).catch(done);
```

should insert One to Many Model targets.

```js
Photo.save([
    { path: 'am.jpg', user_id: scope.users[0].id },
    { path: 'stram.jpg', user_id: scope.users[0].id },
    { path: 'gram.jpg', user_id: scope.users[0].id },
    { path: 'hello.jpg', user_id: scope.users[1].id },
    { path: 'world.jpg', user_id: scope.users[1].id },
    { path: 'foo.jpg', user_id: scope.users[2].id },
    { path: 'bar.jpg', user_id: scope.users[2].id },
    { path: 'pipo.jpg', user_id: scope.users[2].id },
    { path: 'bimbo.jpg', user_id: scope.users[2].id }
]).then(function (photos) {
    scope.photos = [ ];
    photos.forEach(function (p) {
        scope.photos.push(p.raw());
    });
}).finally(done).catch(done);
```

should insert Many to Many Model targets.

```js
var UserLanguage = ziti.get('UserLanguage');
Language.save([
    { name: 'english' },
    { name: 'french' },
    { name: 'portuguesh' },
    { name: 'italian' },
    { name: 'spanish' },
    { name: 'arabic' }
]).then(function(langs) {
    scope.langs = langs;
    var ul = [ ];
    for (var i = 0, len = scope.users.length; i < len; ++i) {
            for (var j = 0, jlen = langs.length; j < jlen; ++j) {
                if ((i + j) % 3 === 2) { continue; }
                ul.push({ user_id: scope.users[i].id, langs_id: langs[j].get('id') });
            }
    }
    return UserLanguage.save(ul);
}).then(function (ul) {
    scope.userlangs = ul;
}).finally(done).catch(done);
```

should insert ForeignKey Model targets.

```js
expect(Friend._pk).to.eql([ 'user_id', 'target_id' ]);
Friend.save([
    { user_id: scope.users[0].id, target_id: scope.users[1].id },
    { user_id: scope.users[1].id, target_id: scope.users[0].id },
    { user_id: scope.users[0].id, target_id: scope.users[2].id },
    { user_id: scope.users[2].id, target_id: scope.users[0].id },
]).then(function (friends) {
    expect(friends).to.be.an('array').and.to.have.length(4);
}).finally(done).catch(done);
```

should insert ForeignKey Model targets (2nd form).

```js
expect(Friend._pk).to.eql([ 'user_id', 'target_id' ]);
Friend.save([
    { user: scope.users[1], target: scope.users[2] },
    { user: scope.users[2], target: scope.users[1] },
]).then(function (friends) {
    expect(friends).to.be.an('array').and.to.have.length(2);
    return Friend.at({ user_id: scope.users[1].id, target_id: scope.users[2].id });
}).then(function (friend) {
    expect(friend).not.to.be.null;
}).finally(done).catch(done);
```

<a name="associations-at"></a>
## #at()
should find the source and all its associations as a Model instance.

```js
User.at({ id: scope.users[0].id })
    .then(function (user) {
        expect(user).to.be.an.instanceof(ModelInstance);
        var raw = user.raw();
        expect(raw).to.have.property('firstname', 'dexter');
        expect(raw).to.have.property('address');
        expect(raw.address.street).to.equals('jump street');
        expect(raw).to.have.property('photos');
        expect(raw.photos[0].path).to.equals('am.jpg');
        expect(raw).to.have.property('langs');
        expect(raw.langs[0].name).to.equals('english');
        expect(raw.friends).to.be.an('array').and.to.have.length(2);
        expect(raw.friends[0]).to.have.property('nickname');
        expect(raw.friends[1]).to.have.property('nickname');
    }).finally(done).catch(done);
```

should find the source and all its associations as raw data.

```js
User.at({ id: scope.users[0].id }).raw()
    .then(function (user) {
        expect(user).to.have.property('firstname', 'dexter');
        expect(user).to.have.property('address');
        expect(user.address.street).to.equals('jump street');
        expect(user).to.have.property('photos');
        expect(user.photos[0].path).to.equals('am.jpg');
        expect(user).to.have.property('langs');
        expect(user.langs[0].name).to.equals('english');
    }).finally(done).catch(done);
```

<a name="associations-all"></a>
## #all
should find multiple sources and all their associations as Model instances.

```js
User.all()
    .then(function (users) {
        expect(users).to.be.an('array').and.to.have.length(3);
        expect(users[0]).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(users[1]).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(users[2]).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(users[0].get('address')).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(users[1].get('address')).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(users[2].get('address')).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    }).finally(done).catch(done);
```

should find multiple sources and all their associations as Model instances.

```js
User.all().raw().asc('id')
    .then(function (users) {
        expect(users).to.be.an('array').and.to.have.length(3);
        expect(users[0]).to.be.ok.and.to.be.an('object');
        expect(users[1]).to.be.ok.and.to.be.an('object');
        expect(users[2]).to.be.ok.and.to.be.an('object');
        expect(users[0].address).to.be.ok.and.to.be.an('object');
        expect(users[1].address).to.be.ok.and.to.be.an('object');
        expect(users[2].address).to.be.ok.and.to.be.an('object');
        expect(users[0].photos).to.be.ok.and.to.be.an('array');
        expect(users[1].photos).to.be.ok.and.to.be.an('array');
        expect(users[2].photos).to.be.ok.and.to.be.an('array');
    }).finally(done).catch(done);
```

<a name="functions"></a>
# Functions
<a name="functions-increment"></a>
## Increment
should increment a column.

```js
Pasta.update({ numero: ziti.$inc('numero', 2) }, { name: 'penne' })
    .then(function (res) {
        return Pasta.at({ name: 'penne' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(2);
    }).finally(done).catch(done);
```

should increment a column (2nd form).

```js
Pasta.update({ numero: ziti.$inc }, { name: 'penne' })
    .then(function (res) {
        return Pasta.at({ name: 'penne' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(3);
    }).finally(done).catch(done);
```

should increment a column (3rd form).

```js
Pasta.update({ numero: [ '?? + ?', 'numero', 1 ] }, { name: 'penne' })
    .then(function (res) {
        return Pasta.at({ name: 'penne' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(4);
    }).finally(done).catch(done);
```

<a name="functions-decrement"></a>
## Decrement
should decrement a column.

```js
Pasta.update({ numero: ziti.$dec('numero') }, { name: 'spaghetti' })
    .then(function (res) {
        return Pasta.at({ name: 'spaghetti' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(4);
    }).finally(done).catch(done);
```

should decrement a column (2nd form).

```js
Pasta.update({ numero: ziti.$dec }, { name: 'spaghetti' })
    .then(function (res) {
        return Pasta.at({ name: 'spaghetti' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(3);
    }).finally(done).catch(done);
```

should decrement a column (3rd form).

```js
Pasta.update({ numero: [ '?? - ?', 'numero', 1 ] }, { name: 'spaghetti' })
    .then(function (res) {
        return Pasta.at({ name: 'spaghetti' });
    }).then(function (pasta) {
        expect(pasta.get('numero')).to.equals(2);
    }).finally(done).catch(done);
```

<a name="functions-function-with-1-argument"></a>
## Function with 1 argument
should set a column to uppercase.

```js
Pasta.update({ name: ziti.$upper }, { numero: 7 })
    .then(function (res) {
        return Pasta.at({ numero: 7 });
    }).then(function (pasta) {
        expect(pasta.get('name')).to.equals('SPAGHETTONI');
    }).finally(done).catch(done);
```

should set a column to the hexadecimal representation of another column.

```js
Pasta.update({ name: ziti.$hex('numero') }, { numero: 42 })
    .then(function (res) {
        return Pasta.at({ numero: 42 });
    }).then(function (pasta) {
        expect(pasta.get('name')).to.equals('2A');
    }).finally(done).catch(done);
```

<a name="functions-function-chaining"></a>
## Function chaining
should increment by 3 and decrement by 1.

```js
Pasta.update({ numero: ziti.$inc(ziti.$dec('numero', 1), 3) }, { numero: 42 })
    .then(function () {
        return Pasta.at({ numero: 44 });
    }).then(function (pasta) {
        expect(pasta).not.to.be.null;
    }).finally(done).catch(done);
```

should sets a column to uppercase and trim spaces.

```js
Pasta.update({ name: ziti.$trim(ziti.$upper('name')) }, { numero: 51 })
    .then(function () {
        return Pasta.at({ numero: 51 });
    }).then(function (pasta) {
        expect(pasta.get('name')).to.equals('PASTISI');
    }).finally(done).catch(done);
```

<a name="instance"></a>
# Instance
<a name="instance-set"></a>
## #set()
should check instance fields are correctly set at build.

```js
expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
expect(torti.getValue('price')).to.equals(10);
done();
```

should set a field.

```js
torti.set('price', 12);
expect(torti.getValue('price')).to.equals(12);
done();
```

should set a field using a setter.

```js
torti.set('name', 'penne');
expect(torti.getValue('name')).to.equals('PENNE');
done();
```

<a name="instance-get"></a>
## #get()
should check instance fields are correctly set at build.

```js
expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
expect(torti.get('price')).to.equals(10);
done();
```

should set & get a field.

```js
torti.setValue('price', 12);
expect(torti.get('price')).to.equals(12);
done();
```

should get a field using a getter.

```js
expect(torti.get('name')).to.equals('TORTI:12');
done();
```

<a name="instance-raw"></a>
## #raw()
should get instance raw data.

```js
expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
expect(torti.raw()).to.deep.equals({ price: 10, name: 'TORTI' });
done();
```

<a name="instance-tojson"></a>
## #toJSON()
should get instance JSON representation.

```js
expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
expect(torti.toJSON()).to.equals('{"price":10,"name":"TORTI"}');
done();
```

<a name="instance-save"></a>
## #save()
should build and insert an instance into database.

```js
var torti = Product.build({ price: 10, name: 'torti', origin: productCountry });
expect(torti.get('origin_id')).to.be.above(0);
torti.save().then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('id')).to.be.above(0);
    expect(torti.get('price')).to.equals(10);
    expect(torti.get('name')).to.equals('TORTI:10');
    expect(torti.get('origin_id')).to.be.above(0);
}).finally(done).catch(done);
```

should retrieve an instance and save should have no effect.

```js
Product.at({ price: 10 }).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('id')).to.be.above(0);
    expect(torti.get('price')).to.equals(10);
    expect(torti.get('name')).to.equals('TORTI:10');
    return torti.save();
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
}).finally(done).catch(done);
```

should retrieve an instance, set a field and update database.

```js
Product.at({ price: 10 }).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('id')).to.be.above(0);
    expect(torti.get('price')).to.equals(10);
    expect(torti.get('name')).to.equals('TORTI:10');
    torti.set('price', torti.get('price') + 1);
    return torti.save();
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('price')).to.equals(11);
    return Product.at({ price: 11 });
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('price')).to.equals(11);
}).finally(done).catch(done);
```

<a name="instance-update"></a>
## #update()
should update a field into database.

```js
Product.at({ price: 11 }).then(function (torti) {
    return torti.update({ price: 12 })
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('price')).to.equals(12);
    return Product.at({ price: 12 })
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('price')).to.equals(12);
}).finally(done).catch(done);
```

<a name="instance-remove"></a>
## #remove()
should remove an instance from database.

```js
Product.at({ price: 12 }).then(function (torti) {
    return torti.remove();
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti._isNew).to.be.true;
    return Product.at({ price: 12 });
}).then(function (torti) {
    expect(torti).to.be.null;
}).finally(done).catch(done);
```

<a name="instance-refresh"></a>
## #refresh()
should set a field and refresh the instance data.

```js
Product.save({ price: 10, name: 'torti', origin_id: productCountry.get('id') }).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    torti.set({ price: 11 });
    return torti.refresh();
}).then(function (torti) {
    expect(torti).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    expect(torti.get('price')).to.equals(10);
}).finally(done).catch(done);
```

<a name="model--model-instance-methods"></a>
# Model & model instance methods
<a name="model--model-instance-methods-global-methods"></a>
## Global methods
should use an internal Model property.

```js
expect(Animal.has('kind')).to.be.true;
expect(Animal.has('weight')).to.be.false;
done();
```

should use an internal Model instance property.

```js
Animal.at({ name: 'po' }).then(function (animal) {
    expect(animal.isNew()).to.be.false;
    var bugsbunny = Animal.build({ name: 'bugsbunny', kind: 'rabbit' });
    expect(bugsbunny.isNew()).to.be.true;
}).finally(done).catch(done);
```

<a name="model--model-instance-methods-model-static-methods"></a>
## Model static methods
should return an internal property.

```js
expect(Animal.myTable()).to.equals('animal');
done();
```

should use an internal method.

```js
Animal.find({ name: 'abu' }).then(function (animal) {
    expect(animal.get('kind')).to.equals('monkey');
}).finally(done).catch(done);
```

<a name="model--model-instance-methods-model-instance-methods"></a>
## Model instance methods
should return an internal property.

```js
Animal.at({ name: 'po' }).then(function (animal) {
    expect(animal.myModelName()).to.equals('Animal');
}).finally(done).catch(done);
```

should use an internal method.

```js
Animal.at({ name: 'abu' }).then(function (animal) {
    animal.incAge();
    expect(animal.get('age')).to.equals(11);
}).finally(done).catch(done);
```

<a name="model"></a>
# Model
<a name="model-structure"></a>
## Structure
should check the primary key.

```js
var keynames = scope.userStructure;
expect(keynames.PRIMARY).to.be.an('array').and.to.have.length(1);
expect(keynames.PRIMARY[0].Column_name).to.equals('id');
done();
```

should check a unique key with one field.

```js
var keynames = scope.userStructure;
expect(keynames.nickname).to.be.an('array').and.to.have.length(1);
expect(keynames.nickname[0].Column_name).to.equals('nickname');
done();
```

should check a unique key with two fields.

```js
var keynames = scope.userStructure;
expect(keynames.uq_name).to.be.an('array').and.to.have.length(2);
expect(keynames.uq_name[0].Column_name).to.equals('firstname');
expect(keynames.uq_name[1].Column_name).to.equals('lastname');
done();
```

<a name="model-table"></a>
## #table
should get the model table name.

```js
expect(Book.table).to.equals('book');
done();
```

<a name="model-name"></a>
## #name
should get the model name.

```js
expect(Animal.name).to.equals('Animal');
done();
```

<a name="model-save"></a>
## #save()
should insert one Model data.

```js
Animal.save({
    kind: 'bear',
    name: 'winnie',
    age: 5
}).then(function (animal) {
    expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
    var raw = animal.raw();
    expect(raw.kind).to.equals('bear');
    expect(raw.name).to.equals('winnie');
    expect(raw.age).to.equals(5);
    scope.animal = raw;
    done();
}).catch(done);
```

should insert one Model data with multiple primary keys.

```js
Book.save({ title: 'Les fourmis', author: 'Bernard Werber', year: 1991 })
    .then(function (book) {
        return book.remove();
    }).finally(done).catch(done);
```

should insert one Model with a field default function.

```js
Book.save({ title: 'Les fourmis', author: 'Bernard Werber' })
    .then(function (book) {
        var curYear = new Date().getFullYear();
        expect(book.get('year')).to.equals(curYear);
        return book.remove();
    }).finally(done).catch(done);
```

should insert multiple Model data at once.

```js
Animal.save([
    { kind: 'lion', name: 'simba' },
    { kind: 'lion', name: 'mufasa' },
    { kind: 'meerkat', name: 'timon' },
    { kind: 'warthog', name: 'pumba' },
    { kind: 'bird', name: 'zazu' },
    { kind: 'baboon', name: 'rafiki' },
    { kind: 'hyena', name: 'shenzi' },
    { kind: 'hyena', name: 'banzai' },
    { kind: 'hyena', name: 'ed' },
]).then(function (animals) {
    scope.animals = [ ];
    expect(animals).to.be.an('array').and.to.have.length(9);
    animals.forEach(function (animal) {
        expect(animal).to.be.an.instanceof(ModelInstance);
        var raw = animal.raw();
        expect(raw).to.have.property('kind');
        expect(raw).to.have.property('name');
        expect(raw).to.have.property('age');
        scope.animals.push(raw);
    });
    done();
}).catch(done);
```

should successfully insert multiple Model data using a transaction.

```js
Animal.save([
    { kind: 'Yellow Tang', name: 'Bubbles' },
    { kind: 'Starfish', name: 'Peach' },
    { kind: 'Octopus', name: 'Pearl' },
    { kind: 'Hippocampus', name: 'Sheldon' },
    { kind: 'Clownfish', name: 'Nemo' },
    { kind: 'Regal Blue Tang', name: 'Dory' },
    { kind: 'Shark', name: 'Bruce' },
], { multiple: true }).then(function (animals) {
    expect(animals).to.be.an('array').and.to.have.length(7);
    animals.forEach(function (animal) {
        expect(animal).to.be.an.instanceof(ModelInstance);
        var raw = animal.raw();
        expect(raw).to.have.property('kind');
        expect(raw).to.have.property('name');
        expect(raw).to.have.property('age');
    });
    done();
}).catch(done);
```

should fail to insert multiple Model data using a transaction and rollback.

```js
Animal.save([
    { kind: 'Shrimp', name: 'Jacques' },
    { kind: 'Shark', name: 'Chum' },
    { kind: 'Clownfish', name: 'Nemo' },
    { kind: 'Regal Blue Tang', name: 'Dory' },
    { kind: 'Shark', name: 'Bruce' },
], { multiple: true }).then(function (animals) {
    done(new Error());
}).catch(function (err) {
    done();
});
```

should insert two Model data using the same connection.

```js
ziti.withConnection(function (co) {
    Animal.save({ kind: 'rabbit', name: 'bugs bunny' }, { using: co })
        .then(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw.kind).to.equals('rabbit');
            expect(raw.name).to.equals('bugs bunny');
            expect(raw.age).to.equals(0);
            return Animal.save({ kind: 'duck', name: 'daffy' }, { using: co });
        }).then(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw.kind).to.equals('duck');
            expect(raw.name).to.equals('daffy');
            expect(raw.age).to.equals(0);
        }).finally(done);
}).catch(done);
```

<a name="model-remove"></a>
## #remove()
should remove multiple data.

```js
Animal.remove({ kind: 'hyena' }).limit(2)
    .then(function (res) {
        expect(res).to.have.property('affectedRows', 2);
        done();
    }).catch(done);
```

should remove multiple data (2nd form).

```js
Animal.remove({ kind: 'hyena' })
    .then(function (res) {
        expect(res).to.have.property('affectedRows', 1);
        done();
    }).catch(done);
```

<a name="model-at"></a>
## #at()
should find a piece of data using one of its unique field and get a Model instance.

```js
Animal.at({ name: scope.animal.name })
    .then(function (animal) {
        expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
        expect(animal.get('name')).to.equals(scope.animal.name);
        expect(animal.get('id')).to.equals(scope.animal.id);
        done();
    }).catch(done);
```

should find a piece of data using one of its unique field and get an object.

```js
Animal.at({ name: scope.animal.name }).raw()
    .then(function (animal) {
        expect(animal).to.be.ok.and.to.be.an('object');
        expect(animal.name).to.equals(scope.animal.name);
        expect(animal.id).to.equals(scope.animal.id);
        done();
    }).catch(done);
```

should not find any data.

```js
Animal.at({ name: 'alexandre' })
    .then(function (animal) {
        expect(animal).to.be.a('null');
        done();
    }).catch(done);
```

should find a piece of data using a unique field and a custom connection.

```js
ziti.withConnection(function (co) {
    Animal.at({ name: scope.animal.name }, { using: co })
        .then(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            expect(animal.get('name')).to.equals(scope.animal.name);
            expect(animal.get('id')).to.equals(scope.animal.id);
        }).finally(done);
}).catch(done);
```

<a name="model-all"></a>
## #all()
should find multiple data and get an array of Model instances.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] })
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        animals.forEach(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw).to.have.property('kind');
            expect(raw).to.have.property('name');
            expect(raw).to.have.property('age');
        });
        done();
    }).catch(done);
```

should find multiple data and get an array of raw data.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] }).raw()
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        animals.forEach(function (animal) {
            expect(animal).to.be.ok.and.to.be.an('object');
            expect(animal).to.have.property('kind');
            expect(animal).to.have.property('name');
            expect(animal).to.have.property('age');
        });
        done();
    }).catch(done);
```

should find multiple data with a limit.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] }).limit(2)
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(2);
        animals.forEach(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw).to.have.property('kind');
            expect(raw).to.have.property('name');
            expect(raw).to.have.property('age');
        });
        done();
    }).catch(done);
```

should find multiple data with a subset of attributes.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] },
           { attributes: [ 'id', 'name' ] })
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        animals.forEach(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw).to.not.have.property('kind');
            expect(raw).to.have.property('name');
            expect(raw).to.have.property('age');
        });
        done();
    }).catch(done);
```

should find multiple data with a subset of attributes (2nd form).

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] }).only('id', 'name')
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        animals.forEach(function (animal) {
            expect(animal).to.be.ok.and.to.be.an.instanceof(ModelInstance);
            var raw = animal.raw();
            expect(raw).to.not.have.property('kind');
            expect(raw).to.have.property('name');
            expect(raw).to.have.property('age');
        });
        done();
    }).catch(done);
```

should find multiple data ordered by id desc.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] })
    .only('id', 'name')
    .limit(3)
    .desc('id')
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        expect(animals[0].get('id')).to.be.above(animals[1].get('id'))
        expect(animals[1].get('id')).to.be.above(animals[2].get('id'))
        done();
    }).catch(done);
```

should find multiple data ordered by id asc.

```js
Animal.all({ $or: [ { kind: 'lion' }, { kind: 'shark' } ] })
    .only('id', 'name')
    .limit(3)
    .asc('id')
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(3);
        expect(animals[0].get('id')).to.be.below(animals[1].get('id'))
        expect(animals[1].get('id')).to.be.below(animals[2].get('id'))
        done();
    }).catch(done);
```

should find multiple data grouped by column.

```js
Animal.all().only('id', 'name', 'kind')
    .group('kind')
    .limit(5)
    .asc('id')
    .raw()
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(5);
        // check the uniqueness of the `kind` attribute
        var groups = _.groupBy(animals, 'kind');
        _.forOwn(groups, function (group) {
            expect(group).to.be.an('array').and.to.have.length(1);
        });
        done();
    }).catch(done);
```

should not find any data.

```js
Animal.all({ kind: 'spider' })
    .then(function (animals) {
        expect(animals).to.be.an('array').and.to.have.length(0);
        done();
    }).catch(done);
```

<a name="model-upsert"></a>
## #upsert()
should insert one Model data with two primary keys.

```js
Book.upsert({
    title: 'La nuit des enfants rois',
    author: 'Bernard Lenteric',
    year: 1942
}).then(function (res) {
    expect(res).to.have.property('affectedRows', 1);
}).finally(done).catch(done);
```

should update one Model data with two primary keys.

```js
Book.upsert({
    title: 'La nuit des enfants rois',
    author: 'Bernard Lenteric',
    year: 1981
}).then(function (res) {
    expect(res).to.have.property('affectedRows', 2);
    return Book.all();
}).then(function (books) {
    expect(books).to.be.an('array').and.to.have.length(1);
    expect(books[0].get('year')).to.equals(1981);
}).finally(done).catch(done);
```

<a name="model-sum-min-max-count"></a>
## #sum(), #min(), #max(), #count()
should get the sum of a column.

```js
Pasta.sum('numero').then(function (res) {
    expect(res).to.equals(16);
}).finally(done).catch(done);
```

should get the min of a column.

```js
Pasta.min('numero').then(function (res) {
    expect(res).to.equals(0);
}).finally(done).catch(done);
```

should get the max of a column.

```js
Pasta.max('numero').then(function (res) {
    expect(res).to.equals(7);
}).finally(done).catch(done);
```

should get the number of rows.

```js
Pasta.count().then(function (res) {
    expect(res).to.equals(6);
}).finally(done).catch(done);
```

<a name="queries"></a>
# Queries
<a name="queries-raw-queries"></a>
## Raw queries
should do a simple query using ziti.

```js
ziti.query('SELECT `kind`, `name` FROM `animal`')
    .spread(function(result) {
        expect(result).to.be.an('array').and.to.have.length(2);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
        expect(result[1]).to.have.property('kind');
        expect(result[1]).to.have.property('name');
    }).finally(done).catch(done);
```

should do a query with escaped values using ziti.

```js
ziti.query({ sql: 'SELECT ?? FROM ?? WHERE ?? > ?',
             values: [ [ 'kind', 'name' ], 'animal', 'age', 10 ] })
    .spread(function (result) {
        expect(result).to.be.an('array').and.to.have.length(1);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
    }).finally(done).catch(done);
```

should do a query with escaped values using ziti (2nd form).

```js
ziti.query([ 'SELECT ?? FROM ?? WHERE ?? > ?', [ 'kind', 'name' ],
             'animal', 'age', 10 ])
    .spread(function (result) {
        expect(result).to.be.an('array').and.to.have.length(1);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
    }).finally(done).catch(done);
```

should do a select using Model.

```js
Animal.query('SELECT `kind`, `name` FROM `animal`')
    .spread(function(result) {
        expect(result).to.be.an('array').and.to.have.length(2);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
        expect(result[1]).to.have.property('kind');
        expect(result[1]).to.have.property('name');
    }).finally(done).catch(done);
```

should do a query with escaped values using Model.

```js
Animal.query({ sql: 'SELECT ?? FROM ?? WHERE ?? > ?',
             values: [ [ 'kind', 'name' ], Animal.table, 'age', 10 ] })
    .spread(function (result) {
        expect(result).to.be.an('array').and.to.have.length(1);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
    }).finally(done).catch(done);
```

should do a query with escaped values using Model (2nd form).

```js
Animal.query([ 'SELECT ?? FROM ?? WHERE ?? > ?', [ 'kind', 'name' ],
               Animal.table, 'age', 10 ])
    .spread(function (result) {
        expect(result).to.be.an('array').and.to.have.length(1);
        expect(result[0]).to.have.property('kind');
        expect(result[0]).to.have.property('name');
    }).finally(done).catch(done);
```

