## Classes
<dl>
<dt><a href="#AbstractType">AbstractType</a></dt>
<dd></dd>
<dt><a href="#BaseType">BaseType</a> ⇐ <code><a href="#AbstractType">AbstractType</a></code></dt>
<dd></dd>
<dt><a href="#ForeignKey">ForeignKey</a> ⇐ <code><a href="#Reference">Reference</a></code></dt>
<dd></dd>
<dt><a href="#Many">Many</a> ⇐ <code><a href="#One">One</a></code></dt>
<dd></dd>
<dt><a href="#NumericType">NumericType</a> ⇐ <code><a href="#BaseType">BaseType</a></code></dt>
<dd></dd>
<dt><a href="#One">One</a> ⇐ <code><a href="#Reference">Reference</a></code></dt>
<dd></dd>
<dt><a href="#Reference">Reference</a> ⇐ <code><a href="#AbstractType">AbstractType</a></code></dt>
<dd></dd>
<dt><a href="#StringType">StringType</a> ⇐ <code><a href="#BaseType">BaseType</a></code></dt>
<dd></dd>
</dl>
## Mixins
<dl>
<dt><a href="#Types">Types</a></dt>
<dd></dd>
</dl>
<a name="AbstractType"></a>
## AbstractType
**Kind**: global class  

* [AbstractType](#AbstractType)
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="AbstractType+primaryKey"></a>
### abstractType.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  
<a name="AbstractType+unique"></a>
### abstractType.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### abstractType.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  
<a name="AbstractType+notNull"></a>
### abstractType.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  
<a name="AbstractType+default"></a>
### abstractType.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### abstractType.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### abstractType.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### abstractType.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="BaseType"></a>
## BaseType ⇐ <code>[AbstractType](#AbstractType)</code>
**Kind**: global class  
**Extends:** <code>[AbstractType](#AbstractType)</code>  

* [BaseType](#BaseType) ⇐ <code>[AbstractType](#AbstractType)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="AbstractType+primaryKey"></a>
### baseType.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
<a name="AbstractType+unique"></a>
### baseType.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### baseType.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
<a name="AbstractType+notNull"></a>
### baseType.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
<a name="AbstractType+default"></a>
### baseType.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### baseType.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### baseType.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### baseType.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="ForeignKey"></a>
## ForeignKey ⇐ <code>[Reference](#Reference)</code>
**Kind**: global class  
**Extends:** <code>[Reference](#Reference)</code>  

* [ForeignKey](#ForeignKey) ⇐ <code>[Reference](#Reference)</code>
  * [new ForeignKey(target)](#new_ForeignKey_new)
  * [.on(link)](#Reference+on) ⇒ <code>[Reference](#Reference)</code>
  * [.joinType(type)](#Reference+joinType) ⇒ <code>[Reference](#Reference)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="new_ForeignKey_new"></a>
### new ForeignKey(target)
One to one association


| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="Reference+on"></a>
### foreignKey.on(link) ⇒ <code>[Reference](#Reference)</code>
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### foreignKey.joinType(type) ⇒ <code>[Reference](#Reference)</code>
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### foreignKey.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
<a name="AbstractType+unique"></a>
### foreignKey.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### foreignKey.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
<a name="AbstractType+notNull"></a>
### foreignKey.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
<a name="AbstractType+default"></a>
### foreignKey.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### foreignKey.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### foreignKey.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### foreignKey.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="Many"></a>
## Many ⇐ <code>[One](#One)</code>
**Kind**: global class  
**Extends:** <code>[One](#One)</code>  

* [Many](#Many) ⇐ <code>[One](#One)</code>
  * [new Many(target)](#new_Many_new)
  * [.through(target)](#Many+through) ⇒ <code>[Many](#Many)</code>
  * [.relatedName(name)](#One+relatedName) ⇒ <code>[One](#One)</code>
  * [.on(link)](#Reference+on) ⇒ <code>[Reference](#Reference)</code>
  * [.joinType(type)](#Reference+joinType) ⇒ <code>[Reference](#Reference)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="new_Many_new"></a>
### new Many(target)
(One|many) to many association


| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | The referenced model |

<a name="Many+through"></a>
### many.through(target) ⇒ <code>[Many](#Many)</code>
Set an intermediary target when using a many to many association

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | The intermediary model |

<a name="One+relatedName"></a>
### many.relatedName(name) ⇒ <code>[One](#One)</code>
The name to use for the back reference in the target
This is useful when setting a One attribute in the source related
to an existing ForeignKey attribute in the target

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the attribute |

<a name="Reference+on"></a>
### many.on(link) ⇒ <code>[Reference](#Reference)</code>
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### many.joinType(type) ⇒ <code>[Reference](#Reference)</code>
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### many.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[Many](#Many)</code>  
<a name="AbstractType+unique"></a>
### many.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### many.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[Many](#Many)</code>  
<a name="AbstractType+notNull"></a>
### many.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[Many](#Many)</code>  
<a name="AbstractType+default"></a>
### many.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### many.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### many.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### many.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[Many](#Many)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="NumericType"></a>
## NumericType ⇐ <code>[BaseType](#BaseType)</code>
**Kind**: global class  
**Extends:** <code>[BaseType](#BaseType)</code>  

* [NumericType](#NumericType) ⇐ <code>[BaseType](#BaseType)</code>
  * [.zerofill()](#NumericType+zerofill) ⇒ <code>[NumericType](#NumericType)</code>
  * [.unsigned()](#NumericType+unsigned) ⇒ <code>[NumericType](#NumericType)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="NumericType+zerofill"></a>
### numericType.zerofill() ⇒ <code>[NumericType](#NumericType)</code>
Set this field as zerofill

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
<a name="NumericType+unsigned"></a>
### numericType.unsigned() ⇒ <code>[NumericType](#NumericType)</code>
Set this field as unsigned

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
<a name="AbstractType+primaryKey"></a>
### numericType.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
<a name="AbstractType+unique"></a>
### numericType.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### numericType.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
<a name="AbstractType+notNull"></a>
### numericType.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
<a name="AbstractType+default"></a>
### numericType.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### numericType.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### numericType.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### numericType.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="One"></a>
## One ⇐ <code>[Reference](#Reference)</code>
**Kind**: global class  
**Extends:** <code>[Reference](#Reference)</code>  

* [One](#One) ⇐ <code>[Reference](#Reference)</code>
  * [new One(target)](#new_One_new)
  * [.relatedName(name)](#One+relatedName) ⇒ <code>[One](#One)</code>
  * [.on(link)](#Reference+on) ⇒ <code>[Reference](#Reference)</code>
  * [.joinType(type)](#Reference+joinType) ⇒ <code>[Reference](#Reference)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="new_One_new"></a>
### new One(target)
One to one association


| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="One+relatedName"></a>
### one.relatedName(name) ⇒ <code>[One](#One)</code>
The name to use for the back reference in the target
This is useful when setting a One attribute in the source related
to an existing ForeignKey attribute in the target

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the attribute |

<a name="Reference+on"></a>
### one.on(link) ⇒ <code>[Reference](#Reference)</code>
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### one.joinType(type) ⇒ <code>[Reference](#Reference)</code>
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### one.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[One](#One)</code>  
<a name="AbstractType+unique"></a>
### one.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### one.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[One](#One)</code>  
<a name="AbstractType+notNull"></a>
### one.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[One](#One)</code>  
<a name="AbstractType+default"></a>
### one.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### one.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### one.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### one.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[One](#One)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="Reference"></a>
## Reference ⇐ <code>[AbstractType](#AbstractType)</code>
**Kind**: global class  
**Extends:** <code>[AbstractType](#AbstractType)</code>  

* [Reference](#Reference) ⇐ <code>[AbstractType](#AbstractType)</code>
  * [.on(link)](#Reference+on) ⇒ <code>[Reference](#Reference)</code>
  * [.joinType(type)](#Reference+joinType) ⇒ <code>[Reference](#Reference)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="Reference+on"></a>
### reference.on(link) ⇒ <code>[Reference](#Reference)</code>
Set a link between source and target using { sourceField: targetField }

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| link | <code>Object</code> | 

<a name="Reference+joinType"></a>
### reference.joinType(type) ⇒ <code>[Reference](#Reference)</code>
Override the join type which is 'LEFT JOIN' by default

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="AbstractType+primaryKey"></a>
### reference.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[Reference](#Reference)</code>  
<a name="AbstractType+unique"></a>
### reference.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### reference.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[Reference](#Reference)</code>  
<a name="AbstractType+notNull"></a>
### reference.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[Reference](#Reference)</code>  
<a name="AbstractType+default"></a>
### reference.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### reference.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### reference.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### reference.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[Reference](#Reference)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

<a name="StringType"></a>
## StringType ⇐ <code>[BaseType](#BaseType)</code>
**Kind**: global class  
**Extends:** <code>[BaseType](#BaseType)</code>  

* [StringType](#StringType) ⇐ <code>[BaseType](#BaseType)</code>
  * [.charset()](#StringType+charset) ⇒ <code>[StringType](#StringType)</code>
  * [.collate()](#StringType+collate) ⇒ <code>[StringType](#StringType)</code>
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique([name])](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.autoIncrement()](#AbstractType+autoIncrement) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.notNull()](#AbstractType+notNull) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.default(value)](#AbstractType+default) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.get(fn)](#AbstractType+get) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.set(fn)](#AbstractType+set) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.$(scope)](#AbstractType+$) ⇒ <code>[AbstractType](#AbstractType)</code>

<a name="StringType+charset"></a>
### stringType.charset() ⇒ <code>[StringType](#StringType)</code>
Set this field charset

**Kind**: instance method of <code>[StringType](#StringType)</code>  
<a name="StringType+collate"></a>
### stringType.collate() ⇒ <code>[StringType](#StringType)</code>
Set this field a collation name

**Kind**: instance method of <code>[StringType](#StringType)</code>  
<a name="AbstractType+primaryKey"></a>
### stringType.primaryKey() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as primary key

**Kind**: instance method of <code>[StringType](#StringType)</code>  
<a name="AbstractType+unique"></a>
### stringType.unique([name]) ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[StringType](#StringType)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Name of a unique constraint |

<a name="AbstractType+autoIncrement"></a>
### stringType.autoIncrement() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as auto increment

**Kind**: instance method of <code>[StringType](#StringType)</code>  
<a name="AbstractType+notNull"></a>
### stringType.notNull() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as not null

**Kind**: instance method of <code>[StringType](#StringType)</code>  
<a name="AbstractType+default"></a>
### stringType.default(value) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a default value for this field
If the value is a function, it's evaluated during the insertion

**Kind**: instance method of <code>[StringType](#StringType)</code>  

| Param | Type |
| --- | --- |
| value | <code>string</code> &#124; <code>Number</code> &#124; <code>function</code> | 

<a name="AbstractType+get"></a>
### stringType.get(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a getter

**Kind**: instance method of <code>[StringType](#StringType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+set"></a>
### stringType.set(fn) ⇒ <code>[AbstractType](#AbstractType)</code>
Set a setter

**Kind**: instance method of <code>[StringType](#StringType)</code>  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="AbstractType+$"></a>
### stringType.$(scope) ⇒ <code>[AbstractType](#AbstractType)</code>
Add this field to a scope or multiple scopes

**Kind**: instance method of <code>[StringType](#StringType)</code>  

| Param | Type |
| --- | --- |
| scope | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | 

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
  * [.Real](#Types.Real) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Double](#Types.Double) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Decimal](#Types.Decimal) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Numeric](#Types.Numeric) ⇒ <code>[NumericType](#NumericType)</code>
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
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Tinyint"></a>
### Types.Tinyint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Smallint"></a>
### Types.Smallint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Mediumint"></a>
### Types.Mediumint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Int"></a>
### Types.Int ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Integer"></a>
### Types.Integer ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Bigint"></a>
### Types.Bigint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Real"></a>
### Types.Real ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Double"></a>
### Types.Double ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Decimal"></a>
### Types.Decimal ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Numeric"></a>
### Types.Numeric ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Date"></a>
### Types.Date ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Time"></a>
### Types.Time ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Timestamp"></a>
### Types.Timestamp ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Datetime"></a>
### Types.Datetime ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Char"></a>
### Types.Char ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Varchar"></a>
### Types.Varchar ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Binary"></a>
### Types.Binary ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Varbinary"></a>
### Types.Varbinary ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Tinyblob"></a>
### Types.Tinyblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Blob"></a>
### Types.Blob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Mediumblob"></a>
### Types.Mediumblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Longblob"></a>
### Types.Longblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Tinytext"></a>
### Types.Tinytext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Text"></a>
### Types.Text ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Mediumtext"></a>
### Types.Mediumtext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Longtext"></a>
### Types.Longtext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Enum"></a>
### Types.Enum ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.Set"></a>
### Types.Set ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.One"></a>
### Types.One ⇒ <code>[One](#One)</code>
**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="Types.Many"></a>
### Types.Many ⇒ <code>[Many](#Many)</code>
**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="Types.ForeignKey"></a>
### Types.ForeignKey ⇒ <code>[ForeignKey](#ForeignKey)</code>
**Kind**: static property of <code>[Types](#Types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="Types.Boolean"></a>
### Types.Boolean ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.String"></a>
### Types.String ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[Types](#Types)</code>  
<a name="Types.NOW"></a>
### Types.NOW() ⇒ <code>function</code>
**Kind**: static method of <code>[Types](#Types)</code>  
<a name="Types.Id"></a>
### Types.Id() ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static method of <code>[Types](#Types)</code>  
