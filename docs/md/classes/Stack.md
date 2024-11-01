[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Stack

# Class: Stack\<T\>

A last in, first out class

## Type Parameters

• **T**

## Constructors

### new Stack()

> **new Stack**\<`T`\>(): [`Stack`](Stack.md)\<`T`\>

#### Returns

[`Stack`](Stack.md)\<`T`\>

## Accessors

### length

> `get` **length**(): `number`

The number of items in the store

#### Returns

`number`

#### Defined in

[src/collections.ts:77](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L77)

## Methods

### pop()

> **pop**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

The last value that was pushed into the store

#### Defined in

[src/collections.ts:65](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L65)

***

### push()

> **push**(`v`): `void`

#### Parameters

• **v**: `T`

Puts the given value into the store

#### Returns

`void`

#### Defined in

[src/collections.ts:57](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L57)