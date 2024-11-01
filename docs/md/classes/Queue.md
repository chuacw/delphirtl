[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Queue

# Class: Queue\<T\>

A first in, first out class

## Type Parameters

• **T**

## Constructors

### new Queue()

> **new Queue**\<`T`\>(): [`Queue`](Queue.md)\<`T`\>

#### Returns

[`Queue`](Queue.md)\<`T`\>

## Accessors

### length

> `get` **length**(): `number`

The number of values in the store

#### Returns

`number`

#### Defined in

[src/collections.ts:41](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L41)

## Methods

### next()

> **next**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

The first value in the store

#### Defined in

[src/collections.ts:29](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L29)

***

### pop()

> **pop**(): `undefined` \| `T`

#### Returns

`undefined` \| `T`

The first value in the store

#### Defined in

[src/collections.ts:21](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L21)

***

### push()

> **push**(`val`): `void`

#### Parameters

• **val**: `T`

Puts the given value into the class

#### Returns

`void`

#### Defined in

[src/collections.ts:13](https://github.com/chuacw/delphirtl/blob/ee346b6bac1024b6b648d44d9c6cf692e10f6983/src/collections.ts#L13)
