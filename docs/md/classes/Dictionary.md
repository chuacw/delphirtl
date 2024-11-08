[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Dictionary

# Class: Dictionary\<K, V\>

## Extends

- `Map`\<`K`, `V`\>

## Type Parameters

• **K**

• **V**

## Constructors

### new Dictionary()

> **new Dictionary**\<`K`, `V`\>(`entries`?): [`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Parameters

• **entries?**: `null` \| readonly readonly [`K`, `V`][]

#### Returns

[`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Inherited from

`Map<K, V>.constructor`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

### new Dictionary()

> **new Dictionary**\<`K`, `V`\>(`iterable`?): [`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Parameters

• **iterable?**: `null` \| `Iterable`\<readonly [`K`, `V`], `any`, `any`\>

#### Returns

[`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Inherited from

`Map<K, V>.constructor`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### Inherited from

`Map.[toStringTag]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

***

### size

> `readonly` **size**: `number`

#### Returns

the number of elements in the Map.

#### Inherited from

`Map.size`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

#### Inherited from

`Map.[species]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Gets the number of keys and values stored.

##### Returns

`number`

#### Defined in

[src/collections.ts:130](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L130)

***

### Count

#### Get Signature

> **get** **Count**(): `number`

Gets the number of keys and values stored.

##### Returns

`number`

#### Defined in

[src/collections.ts:118](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L118)

***

### items

#### Get Signature

> **get** **items**(): `object`

##### Returns

`object`

#### Defined in

[src/collections.ts:170](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L170)

***

### Items

#### Get Signature

> **get** **Items**(): `object`

Gets the keys and values stored in the Dictionary

##### Returns

`object`

#### Defined in

[src/collections.ts:140](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L140)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<[`K`, `V`]\>

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<[`K`, `V`]\>

#### Inherited from

`Map.[iterator]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

***

### Add()

> **Add**(`key`, `value`): `void`

Sets the specified value for the given key.

#### Parameters

• **key**: `K`

• **value**: `V`

#### Returns

`void`

#### Defined in

[src/collections.ts:99](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L99)

***

### AddOrSetValue()

> **AddOrSetValue**(`key`, `value`): `void`

Sets the specified value for the given key.

#### Parameters

• **key**: `K`

• **value**: `V`

#### Returns

`void`

#### Defined in

[src/collections.ts:89](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L89)

***

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Inherited from

`Map.clear`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

***

### Clear()

> **Clear**(): `void`

Clears the dictionary of all data

#### Returns

`void`

#### Defined in

[src/collections.ts:106](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L106)

***

### Contains()

> **Contains**(`key`): `boolean`

#### Parameters

• **key**: `K`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:185](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L185)

***

### ContainsValue()

> **ContainsValue**(`value`): `boolean`

#### Parameters

• **value**: `V`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:190](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L190)

***

### delete()

> **delete**(`key`): `boolean`

#### Parameters

• **key**: `K`

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

`Map.delete`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

***

### entries()

> **entries**(): `MapIterator`\<[`K`, `V`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<[`K`, `V`]\>

#### Inherited from

`Map.entries`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

• **callbackfn**

• **thisArg?**: `any`

#### Returns

`void`

#### Inherited from

`Map.forEach`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

***

### get()

> **get**(`key`): `undefined` \| `V`

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

• **key**: `K`

#### Returns

`undefined` \| `V`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

`Map.get`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

***

### has()

> **has**(`key`): `boolean`

#### Parameters

• **key**: `K`

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

`Map.has`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

***

### keys()

> **keys**(): `MapIterator`\<`K`\>

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`K`\>

#### Inherited from

`Map.keys`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

***

### Remove()

> **Remove**(`key`): `void`

#### Parameters

• **key**: `K`

#### Returns

`void`

#### Defined in

[src/collections.ts:207](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L207)

***

### set()

> **set**(`key`, `value`): `this`

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

• **key**: `K`

• **value**: `V`

#### Returns

`this`

#### Inherited from

`Map.set`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:41

***

### TryAdd()

> **TryAdd**(`key`, `value`): `boolean`

#### Parameters

• **key**: `K`

• **value**: `V`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:199](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L199)

***

### TryGetValue()

> **TryGetValue**(`key`): `object`

#### Parameters

• **key**: `K`

#### Returns

`object`

##### found

> **found**: `boolean`

##### value

> **value**: `undefined` \| `V`

#### Defined in

[src/collections.ts:175](https://github.com/chuacw/delphirtl/blob/c3bd984ce6705ae71e078fec89787c01bca39c7d/src/collections.ts#L175)

***

### values()

> **values**(): `MapIterator`\<`V`\>

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`V`\>

#### Inherited from

`Map.values`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158
