[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / List

# Class: List\<T\>

List

 List

## Type Parameters

• **T**

## Constructors

### new List()

> **new List**\<`T`\>(): [`List`](List.md)\<`T`\>

#### Returns

[`List`](List.md)\<`T`\>

#### Defined in

[src/collections.ts:371](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L371)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Returns the length of this list

##### Returns

`number`

#### Defined in

[src/collections.ts:391](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L391)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `any`\>

#### Returns

`Iterator`\<`T`, `any`, `any`\>

#### Defined in

[src/collections.ts:436](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L436)

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

[src/collections.ts:399](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L399)

***

### delete()

> **delete**(`value`): `boolean`

Delete a specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:417](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L417)

***

### find()

> **find**(`callback`): `boolean`

#### Parameters

• **callback**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:361](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L361)

***

### get()

> **get**(`index`): `T`

#### Parameters

• **index**: `number`

#### Returns

`T`

#### Defined in

[src/collections.ts:408](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L408)

***

### indexOf()

> **indexOf**(`value`): `number`

#### Parameters

• **value**: `T`

#### Returns

`number`

#### Defined in

[src/collections.ts:403](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L403)

***

### remove()

> **remove**(`value`): `boolean`

Removes the specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:431](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L431)

***

### size()

> **size**(): `number`

#### Returns

`number`

Size of the List

#### Defined in

[src/collections.ts:379](https://github.com/chuacw/delphirtl/blob/90bd0c730c5c81cc0765c7e7f88c8237ad1647eb/src/collections.ts#L379)
