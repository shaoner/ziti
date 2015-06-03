<a name="Instance"></a>
## Instance
**Kind**: global class  

* [Instance](#Instance)
  * [.raw()](#Instance+raw) ⇒ <code>Object</code>
  * [.getValue(name)](#Instance+getValue) ⇒ <code>\*</code>
  * [.setValue(name, value)](#Instance+setValue)
  * [.get([name])](#Instance+get) ⇒ <code>\*</code>
  * [.set(name, [value])](#Instance+set)
  * [.update(data, [options])](#Instance+update) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.remove([options])](#Instance+remove) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.refresh([options])](#Instance+refresh) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
  * [.save([options])](#Instance+save) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>

<a name="Instance+raw"></a>
### instance.raw() ⇒ <code>Object</code>
Give the data relative to the instance in an object of the form { fieldName: value }

**Kind**: instance method of <code>[Instance](#Instance)</code>  
<a name="Instance+getValue"></a>
### instance.getValue(name) ⇒ <code>\*</code>
Get the raw value of a field

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the field |

<a name="Instance+setValue"></a>
### instance.setValue(name, value)
Set the raw value of a field

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the field |
| value | <code>string</code> &#124; <code>Number</code> | The value of the field |

<a name="Instance+get"></a>
### instance.get([name]) ⇒ <code>\*</code>
Get the value of a field using the getter if provided in the model.
If the field is a reference it returns the according model instance.
If no name is provided it returns an object filled with all values the same way

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | The name of the field |

<a name="Instance+set"></a>
### instance.set(name, [value])
Set the value of a field using the setter if provided in the model.
If you pass an object as first argument then it calls set on each key / value.
It is possible to set a reference by giving a model instance value or an object.

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> &#124; <code>Object</code> | The name of the field |
| [value] | <code>\*</code> | The value of the field |

<a name="Instance+update"></a>
### instance.update(data, [options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Update the instance with new data and save them in the database.
This is equivalent to calling [set](#Instance+set) + [save](#Instance+save)

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The updated data as { fieldName: value } |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Instance+remove"></a>
### instance.remove([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Remove the instance in database and reset it as new
This means you can call still use this instance

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Instance+refresh"></a>
### instance.refresh([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Refresh the instance by fetching data from the database.
This does not affect references.

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

<a name="Instance+save"></a>
### instance.save([options]) ⇒ <code>[Promise](https://github.com/petkaantonov/bluebird)</code>
Save the instance in the database.
If the instance is marked as new it is inserted, otherwise it is updated.
The updated data are only the fields that have been explicitly set.

**Kind**: instance method of <code>[Instance](#Instance)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.using] | <code>[PoolConnection](https://github.com/felixge/node-mysql#pooling-connections)</code> | Use this connection |

