<a name="Functions"></a>
## Functions
**Kind**: global mixin  

* [Functions](#Functions)
  * [.$inc(column, [value])](#Functions.$inc)
  * [.$dec(column, [value])](#Functions.$dec)
  * [.$div(column, [value])](#Functions.$div)
  * [.$idiv(column, [value])](#Functions.$idiv)
  * [.$mult(column, [value])](#Functions.$mult)
  * [.$mod(column, [value])](#Functions.$mod)
  * [.$upper(column)](#Functions.$upper)
  * [.$lower(column)](#Functions.$lower)
  * [.$ceil(column)](#Functions.$ceil)
  * [.$floor(column)](#Functions.$floor)
  * [.$ltrim(column)](#Functions.$ltrim)
  * [.$rtrim(column)](#Functions.$rtrim)
  * [.$trim(column)](#Functions.$trim)
  * [.$rand(column, [seed])](#Functions.$rand)
  * [.$hex(column)](#Functions.$hex)
  * [.$pi()](#Functions.$pi)
  * [.$now()](#Functions.$now)

<a name="Functions.$inc"></a>
### Functions.$inc(column, [value])
Increment a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The value to add |

<a name="Functions.$dec"></a>
### Functions.$dec(column, [value])
Decrement a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The value to substract |

<a name="Functions.$div"></a>
### Functions.$div(column, [value])
Divide a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The denominator |

<a name="Functions.$idiv"></a>
### Functions.$idiv(column, [value])
Integer division of a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The denominator |

<a name="Functions.$mult"></a>
### Functions.$mult(column, [value])
Multiply a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The value to multiply with |

<a name="Functions.$mod"></a>
### Functions.$mod(column, [value])
Set the remainder of the column divided by the value

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> |  | Name of the column or the result of another function |
| [value] | <code>Number</code> | <code>1</code> | The value |

<a name="Functions.$upper"></a>
### Functions.$upper(column)
Convert to an uppercase column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$lower"></a>
### Functions.$lower(column)
Convert to an lowercase column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$ceil"></a>
### Functions.$ceil(column)
Sets the smallest integer value not less than the column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$floor"></a>
### Functions.$floor(column)
Sets the largest integer value not greater than the column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$ltrim"></a>
### Functions.$ltrim(column)
Remove leading space of the column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$rtrim"></a>
### Functions.$rtrim(column)
Remove trailing space of the column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$trim"></a>
### Functions.$trim(column)
Remove leading and trailing space of the column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$rand"></a>
### Functions.$rand(column, [seed])
Sets a random floating-point value between 0 and 1.0.
If the value is specified, it is used as the seed value.

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |
| [seed] | <code>\*</code> | Seed |

<a name="Functions.$hex"></a>
### Functions.$hex(column)
Sets a hexadecimal string representation of a column

**Kind**: static method of <code>[Functions](#Functions)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>string</code> &#124; <code>Array.&lt;\*&gt;</code> | Name of the column or the result of another function |

<a name="Functions.$pi"></a>
### Functions.$pi()
Sets the value of pi

**Kind**: static method of <code>[Functions](#Functions)</code>  
<a name="Functions.$now"></a>
### Functions.$now()
Sets the current date and time

**Kind**: static method of <code>[Functions](#Functions)</code>  
