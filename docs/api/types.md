## Classes
<dl>
<dt><a href="#BaseType">BaseType</a> ⇐ <code>AbstractType</code></dt>
<dd></dd>
<dt><a href="#NumericType">NumericType</a> ⇐ <code><a href="#BaseType">BaseType</a></code></dt>
<dd></dd>
<dt><a href="#StringType">StringType</a> ⇐ <code><a href="#BaseType">BaseType</a></code></dt>
<dd></dd>
<dt><a href="#ForeignKey">ForeignKey</a> ⇐ <code>Reference</code></dt>
<dd></dd>
<dt><a href="#One">One</a> ⇐ <code>Reference</code></dt>
<dd></dd>
<dt><a href="#Many">Many</a> ⇐ <code><a href="#One">One</a></code></dt>
<dd></dd>
</dl>
## Mixins
<dl>
<dt><a href="#Types">Types</a></dt>
<dd></dd>
</dl>
<a name="Types"></a>
## Types
**Kind**: global mixin  

* [Types](#Types)
  * [.Bit](#Types.Bit) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinyint](#Types.Tinyint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Smallint](#Types.Smallint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Mediumint](#Types.Mediumint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Int](#Types.Int) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Integer](#Types.Integer) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Bigint](#Types.Bigint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Double](#Types.Double) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Real](#Types.Real) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Decimal](#Types.Decimal) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Numeric](#Types.Numeric) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Float](#Types.Float) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Date](#Types.Date) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Time](#Types.Time) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Timestamp](#Types.Timestamp) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Datetime](#Types.Datetime) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Char](#Types.Char) ⇒ <code>[StringType](#StringType)</code>
  * [.Varchar](#Types.Varchar) ⇒ <code>[StringType](#StringType)</code>
  * [.Binary](#Types.Binary) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Varbinary](#Types.Varbinary) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinyblob](#Types.Tinyblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Blob](#Types.Blob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Mediumblob](#Types.Mediumblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Longblob](#Types.Longblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinytext](#Types.Tinytext) ⇒ <code>[StringType](#StringType)</code>
  * [.Text](#Types.Text) ⇒ <code>[StringType](#StringType)</code>
  * [.Mediumtext](#Types.Mediumtext) ⇒ <code>[StringType](#StringType)</code>
  * [.Longtext](#Types.Longtext) ⇒ <code>[StringType](#StringType)</code>
  * [.Enum](#Types.Enum) ⇒ <code>[StringType](#StringType)</code>
  * [.Set](#Types.Set) ⇒ <code>[StringType](#StringType)</code>
  * [.One](#Types.One) ⇒ <code>[One](#One)</code>
  * [.Many](#Types.Many) ⇒ <code>[Many](#Many)</code>
  * [.ForeignKey](#Types.ForeignKey) ⇒ <code>[ForeignKey](#ForeignKey)</code>
  * [.Boolean](#Types.Boolean) ⇒ <code>[NumericType](#NumericType)</code>
  * [.String](#Types.String) ⇒ <code>[StringType](#StringType)</code>
  * [.NOW()](#Types.NOW) ⇒ <code>function</code>
  * [.Id()](#Types.Id) ⇒ <code>[NumericType](#NumericType)</code>

<a name="Types.Bit"></a>
### Types.Bit ⇒ <code>[BaseType](#BaseType)</code>
A bit-field type

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>1</code> | The number of bits per value, from 1 to 64 |

<a name="Types.Tinyint"></a>
### Types.Tinyint ⇒ <code>[NumericType](#NumericType)</code>
A very small integer. The signed range is -128 to 127. The unsigned range is 0 to 255.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Smallint"></a>
### Types.Smallint ⇒ <code>[NumericType](#NumericType)</code>
A small integer. The signed range is -32768 to 32767. The unsigned range is 0 to 65535.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Mediumint"></a>
### Types.Mediumint ⇒ <code>[NumericType](#NumericType)</code>
A medium-sized integer. The signed range is -8388608 to 8388607. The unsigned range is 0 to 16777215.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Int"></a>
### Types.Int ⇒ <code>[NumericType](#NumericType)</code>
A normal-size integer. The signed range is -2147483648 to 2147483647. The unsigned range is 0 to 4294967295.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Integer"></a>
### Types.Integer ⇒ <code>[NumericType](#NumericType)</code>
Synonym for INT

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Bigint"></a>
### Types.Bigint ⇒ <code>[NumericType](#NumericType)</code>
A large integer. The signed range is -9223372036854775808 to 9223372036854775807. The unsigned range is 0 to 18446744073709551615.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The maximum display width |

<a name="Types.Double"></a>
### Types.Double ⇒ <code>[NumericType](#NumericType)</code>
A normal-size (double-precision) floating-point number. Permissible values are -1.7976931348623157E+308 to -2.2250738585072014E-308, 0, and 2.2250738585072014E-308 to 1.7976931348623157E+308.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The total number of digits |
| [D] | <code>Number</code> | The number of digits following the decimal point |

<a name="Types.Real"></a>
### Types.Real ⇒ <code>[NumericType](#NumericType)</code>
Synonym for Double

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The total number of digits |
| [D] | <code>Number</code> | The number of digits following the decimal point |

<a name="Types.Decimal"></a>
### Types.Decimal ⇒ <code>[NumericType](#NumericType)</code>
A packed "exact" fixed-point number.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The total number of digits (the precision) |
| [D] | <code>Number</code> | The number of digits after the decimal point (the scale) |

<a name="Types.Numeric"></a>
### Types.Numeric ⇒ <code>[NumericType](#NumericType)</code>
Synonym for Decimal

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The total number of digits (the precision) |
| [D] | <code>Number</code> | The number of digits after the decimal point (the scale) |

<a name="Types.Float"></a>
### Types.Float ⇒ <code>[NumericType](#NumericType)</code>
A small (single-precision) floating-point number. Permissible values are -3.402823466E+38 to -1.175494351E-38, 0, and 1.175494351E-38 to 3.402823466E+38.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | The total number of digits |
| [D] | <code>Number</code> | The number of digits after the decimal point |

<a name="Types.Date"></a>
### Types.Date ⇒ <code>[BaseType](#BaseType)</code>
A date

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Time"></a>
### Types.Time ⇒ <code>[BaseType](#BaseType)</code>
A time

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Timestamp"></a>
### Types.Timestamp ⇒ <code>[BaseType](#BaseType)</code>
A timestamp

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Datetime"></a>
### Types.Datetime ⇒ <code>[BaseType](#BaseType)</code>
A date and time combination

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Char"></a>
### Types.Char ⇒ <code>[StringType](#StringType)</code>
A fixed-length string that is always right-padded with spaces to the specified length when stored.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>1</code> | The column length in characters |

<a name="Types.Varchar"></a>
### Types.Varchar ⇒ <code>[StringType](#StringType)</code>
A variable-length string.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>255</code> | The column length in characters |

<a name="Types.Binary"></a>
### Types.Binary ⇒ <code>[BaseType](#BaseType)</code>
Similar to the CHAR type, but stores binary byte strings rather than nonbinary character strings.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>1</code> | The column length in characters |

<a name="Types.Varbinary"></a>
### Types.Varbinary ⇒ <code>[BaseType](#BaseType)</code>
Similar to the VARCHAR type, but stores binary byte strings rather than nonbinary character strings.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>255</code> | The column length in characters |

<a name="Types.Tinyblob"></a>
### Types.Tinyblob ⇒ <code>[BaseType](#BaseType)</code>
A BLOB column with a maximum length of 255 bytes

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Blob"></a>
### Types.Blob ⇒ <code>[BaseType](#BaseType)</code>
A BLOB column with a maximum length of 65,535 bytes

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [M] | <code>Number</code> | A maximum length of bytes |

<a name="Types.Mediumblob"></a>
### Types.Mediumblob ⇒ <code>[BaseType](#BaseType)</code>
A BLOB column with a maximum length of 16,777,215 bytes

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Longblob"></a>
### Types.Longblob ⇒ <code>[BaseType](#BaseType)</code>
A BLOB column with a maximum length of 4GB

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Tinytext"></a>
### Types.Tinytext ⇒ <code>[StringType](#StringType)</code>
A TEXT column with a maximum length of 255 characters

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Text"></a>
### Types.Text ⇒ <code>[StringType](#StringType)</code>
A TEXT column with a maximum length of 65,535 characters

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Mediumtext"></a>
### Types.Mediumtext ⇒ <code>[StringType](#StringType)</code>
A TEXT column with a maximum length of 16,777,215 characters

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Longtext"></a>
### Types.Longtext ⇒ <code>[StringType](#StringType)</code>
A TEXT column with a maximum length of 4GB characters

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Enum"></a>
### Types.Enum ⇒ <code>[StringType](#StringType)</code>
An enumeration. A string object that can have only one value, chosen from the list of values

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...values | <code>string</code> | The list of values |

<a name="Types.Set"></a>
### Types.Set ⇒ <code>[StringType](#StringType)</code>
A set. A string object that can have zero or more values, each of which must be chosen from the list of values

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...values | <code>string</code> | The list of values |

<a name="Types.One"></a>
### Types.One ⇒ <code>[One](#One)</code>
A reference to one other Model. This create a foreign key in the target Model matching the primary key of the source model. This reference is retrieved as a Model Instance.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>[Model](/api/model)</code> | 

<a name="Types.Many"></a>
### Types.Many ⇒ <code>[Many](#Many)</code>
A reference to multiple other Models. This create a foreign key in the target Model matching the primary key of the source model. This reference is retrieved as an Array of Model Instances.

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>[Model](/api/model)</code> | 

<a name="Types.ForeignKey"></a>
### Types.ForeignKey ⇒ <code>[ForeignKey](#ForeignKey)</code>
A foreign key matching the primary key of the target Model

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>[Model](/api/model)</code> | 

<a name="Types.Boolean"></a>
### Types.Boolean ⇒ <code>[NumericType](#NumericType)</code>
Synonym for Tinyint(1)

**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.String"></a>
### Types.String ⇒ <code>[StringType](#StringType)</code>
Synonym for Varchar

**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [M] | <code>Number</code> | <code>255</code> | The column length in characters |

<a name="Types.NOW"></a>
### Types.NOW() ⇒ <code>function</code>
The current date, this is mainly used when you want to set a default new date

**Kind**: static method of <code>[Types](#Types)</code>  
**Example**  
```js
var User = ziti.define('User', {
    signup_date: ziti.Datetime().default(ziti.NOW)
});
```
<a name="Types.Id"></a>
### Types.Id() ⇒ <code>[NumericType](#NumericType)</code>
A shortcut for ziti.Int().primaryKey().autoIncrement().notNull()

**Kind**: static method of <code>[Types](#Types)</code>  
<a name="BaseType"></a>
## BaseType ⇐ <code>AbstractType</code>
**Kind**: global class  
**Extends:** <code>AbstractType</code>  

* [BaseType](#BaseType) ⇐ <code>AbstractType</code>
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="AbstractType+primaryKey"></a>
### baseType.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### baseType.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### baseType.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### baseType.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### baseType.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### baseType.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### baseType.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### baseType.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="NumericType"></a>
## NumericType ⇐ <code>[BaseType](#BaseType)</code>
**Kind**: global class  
**Extends:** <code>[BaseType](#BaseType)</code>  

* [NumericType](#NumericType) ⇐ <code>[BaseType](#BaseType)</code>
  * [.zerofill()](#NumericType+zerofill) ↩︎
  * [.unsigned()](#NumericType+unsigned) ↩︎
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="NumericType+zerofill"></a>
### numericType.zerofill() ↩︎
Set this field as zerofill

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  
<a name="NumericType+unsigned"></a>
### numericType.unsigned() ↩︎
Set this field as unsigned

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  
<a name="AbstractType+primaryKey"></a>
### numericType.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### numericType.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### numericType.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### numericType.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### numericType.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### numericType.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### numericType.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### numericType.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="StringType"></a>
## StringType ⇐ <code>[BaseType](#BaseType)</code>
**Kind**: global class  
**Extends:** <code>[BaseType](#BaseType)</code>  

* [StringType](#StringType) ⇐ <code>[BaseType](#BaseType)</code>
  * [.charset()](#StringType+charset) ↩︎
  * [.collate()](#StringType+collate) ↩︎
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="StringType+charset"></a>
### stringType.charset() ↩︎
Set this field charset

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  
<a name="StringType+collate"></a>
### stringType.collate() ↩︎
Set this field a collation name

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  
<a name="AbstractType+primaryKey"></a>
### stringType.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### stringType.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### stringType.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### stringType.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### stringType.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### stringType.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### stringType.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### stringType.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[StringType](#StringType)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="ForeignKey"></a>
## ForeignKey ⇐ <code>Reference</code>
**Kind**: global class  
**Extends:** <code>Reference</code>  

* [ForeignKey](#ForeignKey) ⇐ <code>Reference</code>
  * [new ForeignKey(target)](#new_ForeignKey_new)
  * [.on(link)](#Reference+on) ↩︎
  * [.joinType(type)](#Reference+joinType) ↩︎
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="new_ForeignKey_new"></a>
### new ForeignKey(target)
One to one association


| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="Reference+on"></a>
### foreignKey.on(link) ↩︎
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### foreignKey.joinType(type) ↩︎
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### foreignKey.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### foreignKey.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### foreignKey.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### foreignKey.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### foreignKey.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### foreignKey.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### foreignKey.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### foreignKey.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="One"></a>
## One ⇐ <code>Reference</code>
**Kind**: global class  
**Extends:** <code>Reference</code>  

* [One](#One) ⇐ <code>Reference</code>
  * [new One(target)](#new_One_new)
  * [.relatedName(name)](#One+relatedName) ↩︎
  * [.on(link)](#Reference+on) ↩︎
  * [.joinType(type)](#Reference+joinType) ↩︎
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="new_One_new"></a>
### new One(target)
One to one association


| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="One+relatedName"></a>
### one.relatedName(name) ↩︎
The name to use for the back reference in the target
This is useful when setting a One attribute in the source related
to an existing ForeignKey attribute in the target

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the attribute |

<a name="Reference+on"></a>
### one.on(link) ↩︎
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### one.joinType(type) ↩︎
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### one.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### one.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### one.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### one.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### one.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### one.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### one.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### one.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[One](#One)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="Many"></a>
## Many ⇐ <code>[One](#One)</code>
**Kind**: global class  
**Extends:** <code>[One](#One)</code>  

* [Many](#Many) ⇐ <code>[One](#One)</code>
  * [new Many(target)](#new_Many_new)
  * [.through(target)](#Many+through) ↩︎
  * [.relatedName(name)](#One+relatedName) ↩︎
  * [.on(link)](#Reference+on) ↩︎
  * [.joinType(type)](#Reference+joinType) ↩︎
  * [.primaryKey()](#AbstractType+primaryKey) ↩︎
  * [.unique([name])](#AbstractType+unique) ↩︎
  * [.autoIncrement()](#AbstractType+autoIncrement) ↩︎
  * [.notNull()](#AbstractType+notNull) ↩︎
  * [.default(value)](#AbstractType+default) ↩︎
  * [.get(fn)](#AbstractType+get) ↩︎
  * [.set(fn)](#AbstractType+set) ↩︎
  * [.$(scope)](#AbstractType+$) ↩︎

<a name="new_Many_new"></a>
### new Many(target)
(One|many) to many association


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | The referenced model |

<a name="Many+through"></a>
### many.through(target) ↩︎
Set an intermediary target when using a many to many association

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | The intermediary model |

<a name="One+relatedName"></a>
### many.relatedName(name) ↩︎
The name to use for the back reference in the target
This is useful when setting a One attribute in the source related
to an existing ForeignKey attribute in the target

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the attribute |

<a name="Reference+on"></a>
### many.on(link) ↩︎
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### many.joinType(type) ↩︎
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### many.primaryKey() ↩︎
Set this field as primary key

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  
<a name="AbstractType+unique"></a>
### many.unique([name]) ↩︎
Set this field as unique

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### many.autoIncrement() ↩︎
Set this field as auto increment

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  
<a name="AbstractType+notNull"></a>
### many.notNull() ↩︎
Set this field as not null

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  
<a name="AbstractType+default"></a>
### many.default(value) ↩︎
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### many.get(fn) ↩︎
Set a getter

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### many.set(fn) ↩︎
Set a setter

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### many.$(scope) ↩︎
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[Many](#Many)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

