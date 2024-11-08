[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / List

# Class: List\<T\>

## Type Parameters

• **T**

## Constructors

### new List()

> **new List**\<`T`\>(): [`List`](List.md)\<`T`\>

#### Returns

[`List`](List.md)\<`T`\>

#### Defined in

[src/collections.ts:339](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L339)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Returns the length of this list

##### Returns

`number`

#### Defined in

[src/collections.ts:359](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L359)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `any`\>

#### Returns

`Iterator`\<`T`, `any`, `any`\>

#### Defined in

[src/collections.ts:404](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L404)

***

### add()

> **add**(`value`): `void`

Adds a value to the list

#### Parameters

• **value**: `T`

The value to add to the list

#### Returns

`void`

#### Defined in

[src/collections.ts:367](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L367)

***

### delete()

> **delete**(`value`): `boolean`

Delete a specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:385](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L385)

***

### find()

> **find**(`callback`): `boolean`

#### Parameters

• **callback**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:329](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L329)

***

### get()

> **get**(`index`): `T`

#### Parameters

• **index**: `number`

#### Returns

`T`

#### Defined in

[src/collections.ts:376](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L376)

***

### indexOf()

> **indexOf**(`value`): `number`

#### Parameters

• **value**: `T`

#### Returns

`number`

#### Defined in

[src/collections.ts:371](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L371)

***

### remove()

> **remove**(`value`): `boolean`

Removes the specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:399](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L399)

***

### size()

> **size**(): `number`

#### Returns

`number`

Size of the List

#### Defined in

[src/collections.ts:347](https://github.com/chuacw/delphirtl/blob/0f93eed91d1db2ed286c4d8935806fd1be0ca3a9/src/collections.ts#L347)
