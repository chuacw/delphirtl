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

#### Get Signature

> **get** **length**(): `number`

The number of items in the store

##### Returns

`number`

#### Defined in

[src/collections.ts:77](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L77)

## Methods

### pop()

> **pop**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

The last value that was pushed into the store

#### Defined in

[src/collections.ts:65](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L65)

***

### push()

> **push**(`v`): `void`

#### Parameters

• **v**: `T`

Puts the given value into the store

#### Returns

`void`

#### Defined in

[src/collections.ts:57](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L57)
