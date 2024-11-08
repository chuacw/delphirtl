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

[src/collections.ts:302](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L302)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Returns the length of this list

##### Returns

`number`

#### Defined in

[src/collections.ts:322](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L322)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `any`\>

#### Returns

`Iterator`\<`T`, `any`, `any`\>

#### Defined in

[src/collections.ts:367](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L367)

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

[src/collections.ts:330](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L330)

***

### delete()

> **delete**(`value`): `boolean`

Delete a specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:348](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L348)

***

### find()

> **find**(`callback`): `boolean`

#### Parameters

• **callback**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:292](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L292)

***

### get()

> **get**(`index`): `T`

#### Parameters

• **index**: `number`

#### Returns

`T`

#### Defined in

[src/collections.ts:339](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L339)

***

### indexOf()

> **indexOf**(`value`): `number`

#### Parameters

• **value**: `T`

#### Returns

`number`

#### Defined in

[src/collections.ts:334](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L334)

***

### remove()

> **remove**(`value`): `boolean`

Removes the specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:362](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L362)

***

### size()

> **size**(): `number`

#### Returns

`number`

Size of the List

#### Defined in

[src/collections.ts:310](https://github.com/chuacw/delphirtl/blob/85a5b7662f28c8fe6421ae3f7b08687e4f743bd4/src/collections.ts#L310)
