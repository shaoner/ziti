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
## Objects
<dl>
<dt><a href="#types">types</a> : <code>object</code></dt>
<dd></dd>
</dl>
<a name="AbstractType"></a>
## AbstractType
**Kind**: global class  

* [AbstractType](#AbstractType)
  * [.primaryKey()](#AbstractType+primaryKey) ⇒ <code>[AbstractType](#AbstractType)</code>
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### abstractType.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[AbstractType](#AbstractType)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### baseType.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[BaseType](#BaseType)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### foreignKey.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[ForeignKey](#ForeignKey)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### many.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[Many](#Many)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### numericType.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[NumericType](#NumericType)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### one.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[One](#One)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### reference.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[Reference](#Reference)</code>  
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
  * [.unique()](#AbstractType+unique) ⇒ <code>[AbstractType](#AbstractType)</code>
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
### stringType.unique() ⇒ <code>[AbstractType](#AbstractType)</code>
Set this field as unique

**Kind**: instance method of <code>[StringType](#StringType)</code>  
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

<a name="types"></a>
## types : <code>object</code>
**Kind**: global namespace  

* [types](#types) : <code>object</code>
  * [.Bit](#types.Bit) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinyint](#types.Tinyint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Smallint](#types.Smallint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Mediumint](#types.Mediumint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Int](#types.Int) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Integer](#types.Integer) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Bigint](#types.Bigint) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Real](#types.Real) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Double](#types.Double) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Decimal](#types.Decimal) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Numeric](#types.Numeric) ⇒ <code>[NumericType](#NumericType)</code>
  * [.Date](#types.Date) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Time](#types.Time) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Timestamp](#types.Timestamp) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Datetime](#types.Datetime) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Char](#types.Char) ⇒ <code>[StringType](#StringType)</code>
  * [.Varchar](#types.Varchar) ⇒ <code>[StringType](#StringType)</code>
  * [.Binary](#types.Binary) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Varbinary](#types.Varbinary) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinyblob](#types.Tinyblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Blob](#types.Blob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Mediumblob](#types.Mediumblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Longblob](#types.Longblob) ⇒ <code>[BaseType](#BaseType)</code>
  * [.Tinytext](#types.Tinytext) ⇒ <code>[StringType](#StringType)</code>
  * [.Text](#types.Text) ⇒ <code>[StringType](#StringType)</code>
  * [.Mediumtext](#types.Mediumtext) ⇒ <code>[StringType](#StringType)</code>
  * [.Longtext](#types.Longtext) ⇒ <code>[StringType](#StringType)</code>
  * [.Enum](#types.Enum) ⇒ <code>[StringType](#StringType)</code>
  * [.Set](#types.Set) ⇒ <code>[StringType](#StringType)</code>
  * [.One](#types.One) ⇒ <code>[One](#One)</code>
  * [.Many](#types.Many) ⇒ <code>[Many](#Many)</code>
  * [.ForeignKey](#types.ForeignKey) ⇒ <code>[ForeignKey](#ForeignKey)</code>
  * [.Boolean](#types.Boolean) ⇒ <code>[NumericType](#NumericType)</code>
  * [.String](#types.String) ⇒ <code>[StringType](#StringType)</code>
  * [.NOW](#types.NOW) ⇒ <code>MysqlFunction</code>

<a name="types.Bit"></a>
### types.Bit ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Tinyint"></a>
### types.Tinyint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Smallint"></a>
### types.Smallint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Mediumint"></a>
### types.Mediumint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Int"></a>
### types.Int ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Integer"></a>
### types.Integer ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Bigint"></a>
### types.Bigint ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Real"></a>
### types.Real ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Double"></a>
### types.Double ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Decimal"></a>
### types.Decimal ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Numeric"></a>
### types.Numeric ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Date"></a>
### types.Date ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Time"></a>
### types.Time ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Timestamp"></a>
### types.Timestamp ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Datetime"></a>
### types.Datetime ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Char"></a>
### types.Char ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Varchar"></a>
### types.Varchar ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Binary"></a>
### types.Binary ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Varbinary"></a>
### types.Varbinary ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Tinyblob"></a>
### types.Tinyblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Blob"></a>
### types.Blob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Mediumblob"></a>
### types.Mediumblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Longblob"></a>
### types.Longblob ⇒ <code>[BaseType](#BaseType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Tinytext"></a>
### types.Tinytext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Text"></a>
### types.Text ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Mediumtext"></a>
### types.Mediumtext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Longtext"></a>
### types.Longtext ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Enum"></a>
### types.Enum ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.Set"></a>
### types.Set ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.One"></a>
### types.One ⇒ <code>[One](#One)</code>
**Kind**: static property of <code>[types](#types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="types.Many"></a>
### types.Many ⇒ <code>[Many](#Many)</code>
**Kind**: static property of <code>[types](#types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="types.ForeignKey"></a>
### types.ForeignKey ⇒ <code>[ForeignKey](#ForeignKey)</code>
**Kind**: static property of <code>[types](#types)</code>  

| Param | Type |
| --- | --- |
| target | <code>string</code> &#124; <code>Model</code> | 

<a name="types.Boolean"></a>
### types.Boolean ⇒ <code>[NumericType](#NumericType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.String"></a>
### types.String ⇒ <code>[StringType](#StringType)</code>
**Kind**: static property of <code>[types](#types)</code>  
<a name="types.NOW"></a>
### types.NOW ⇒ <code>MysqlFunction</code>
**Kind**: static property of <code>[types](#types)</code>  
