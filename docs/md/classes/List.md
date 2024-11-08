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

[src/collections.ts:338](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L338)

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Returns the length of this list

##### Returns

`number`

#### Defined in

[src/collections.ts:358](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L358)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `any`\>

#### Returns

`Iterator`\<`T`, `any`, `any`\>

#### Defined in

[src/collections.ts:403](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L403)

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

[src/collections.ts:366](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L366)

***

### delete()

> **delete**(`value`): `boolean`

Delete a specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:384](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L384)

***

### find()

> **find**(`callback`): `boolean`

#### Parameters

• **callback**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:328](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L328)

***

### get()

> **get**(`index`): `T`

#### Parameters

• **index**: `number`

#### Returns

`T`

#### Defined in

[src/collections.ts:375](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L375)

***

### indexOf()

> **indexOf**(`value`): `number`

#### Parameters

• **value**: `T`

#### Returns

`number`

#### Defined in

[src/collections.ts:370](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L370)

***

### remove()

> **remove**(`value`): `boolean`

Removes the specified value

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Defined in

[src/collections.ts:398](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L398)

***

### size()

> **size**(): `number`

#### Returns

`number`

Size of the List

#### Defined in

[src/collections.ts:346](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/collections.ts#L346)
