[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Tree

# Class: Tree\<T\>

## Type Parameters

• **T**

## Constructors

### new Tree()

> **new Tree**\<`T`\>(`value`): [`Tree`](Tree.md)\<`T`\>

#### Parameters

• **value**: `T`

#### Returns

[`Tree`](Tree.md)\<`T`\>

#### Defined in

[src/collections.ts:255](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L255)

## Properties

### data

> **data**: `T`

#### Defined in

[src/collections.ts:253](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L253)

***

### left

> **left**: `PTreeNode`\<`T`\>

#### Defined in

[src/collections.ts:251](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L251)

***

### right

> **right**: `PTreeNode`\<`T`\>

#### Defined in

[src/collections.ts:252](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L252)

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the tree. Call only when this is the root.

##### Date

28/11/2022 - 12:38:36 am

##### Returns

`number`

#### Defined in

[src/collections.ts:286](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L286)

## Methods

### createTree()

> `static` **createTree**\<`T`\>(`nodeValues`): [`Tree`](Tree.md)\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **nodeValues**: `Iterable`\<`T`, `any`, `any`\>

#### Returns

[`Tree`](Tree.md)\<`T`\>

#### Defined in

[src/collections.ts:260](https://github.com/chuacw/delphirtl/blob/4a0b8e9df693eb3c199a989bcb1a2158edc9e81e/src/collections.ts#L260)
