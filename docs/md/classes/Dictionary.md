[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Dictionary

# Class: Dictionary\<K, V\>

Dictionary

 Dictionary

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:53

### new Dictionary()

> **new Dictionary**\<`K`, `V`\>(`iterable`?): [`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Parameters

• **iterable?**: `null` \| `Iterable`\<readonly [`K`, `V`]\>

#### Returns

[`Dictionary`](Dictionary.md)\<`K`, `V`\>

#### Inherited from

`Map<K, V>.constructor`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:52

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### Inherited from

`Map.[toStringTag]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

***

### size

> `readonly` **size**: `number`

#### Returns

the number of elements in the Map.

#### Inherited from

`Map.size`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:48

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

#### Inherited from

`Map.[species]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Gets the number of keys and values stored.

##### Returns

`number`

#### Defined in

[src/collections.ts:146](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L146)

***

### Count

#### Get Signature

> **get** **Count**(): `number`

Gets the number of keys and values stored.

##### Returns

`number`

#### Defined in

[src/collections.ts:134](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L134)

***

### items

#### Get Signature

> **get** **items**(): `object`

Gets all items

##### Returns

`object`

#### Defined in

[src/collections.ts:193](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L193)

***

### Items

#### Get Signature

> **get** **Items**(): `object`

Gets the keys and values stored in the Dictionary

##### Returns

`object`

#### Defined in

[src/collections.ts:156](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L156)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<[`K`, `V`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`\<[`K`, `V`]\>

#### Inherited from

`Map.[iterator]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:121

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

[src/collections.ts:115](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L115)

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

[src/collections.ts:105](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L105)

***

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Inherited from

`Map.clear`

#### Defined in

node\_modules/typescript/lib/lib.es2015.collection.d.ts:23

***

### Clear()

> **Clear**(): `void`

Clears the dictionary of all data

#### Returns

`void`

#### Defined in

[src/collections.ts:122](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L122)

***

### Contains()

> **Contains**(`key`): `boolean`

Returns true if the dictionary has the specified key, false if not.

#### Parameters

• **key**: `K`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:223](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L223)

***

### ContainsValue()

> **ContainsValue**(`value`): `boolean`

Returns true if the dictionary contains the given value.

#### Parameters

• **value**: `V`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:234](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L234)

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:27

***

### entries()

> **entries**(): `IterableIterator`\<[`K`, `V`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`IterableIterator`\<[`K`, `V`]\>

#### Inherited from

`Map.entries`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:126

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:31

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:36

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:40

***

### keys()

> **keys**(): `IterableIterator`\<`K`\>

Returns an iterable of keys in the map

#### Returns

`IterableIterator`\<`K`\>

#### Inherited from

`Map.keys`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:131

***

### Remove()

> **Remove**(`key`): `void`

Removes the given key and its value.

#### Parameters

• **key**: `K`

#### Returns

`void`

#### Defined in

[src/collections.ts:260](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L260)

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

node\_modules/typescript/lib/lib.es2015.collection.d.ts:44

***

### TryAdd()

> **TryAdd**(`key`, `value`): `boolean`

Adds the given key and value

#### Parameters

• **key**: `K`

• **value**: `V`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:250](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L250)

***

### TryGetValue()

> **TryGetValue**(`key`): `object`

Returns a boolean, which, if true, means value has valid information.

#### Parameters

• **key**: `K`

#### Returns

`object`

##### found

> **found**: `boolean`

##### value

> **value**: `undefined` \| `V`

#### Defined in

[src/collections.ts:207](https://github.com/chuacw/delphirtl/blob/48cfb097286672c971bbebd46ef739959b561e2a/src/collections.ts#L207)

***

### values()

> **values**(): `IterableIterator`\<`V`\>

Returns an iterable of values in the map

#### Returns

`IterableIterator`\<`V`\>

#### Inherited from

`Map.values`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:136
