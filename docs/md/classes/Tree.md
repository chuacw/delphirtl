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

[src/collections.ts:218](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L218)

## Properties

### data

> **data**: `T`

#### Defined in

[src/collections.ts:216](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L216)

***

### left

> **left**: `PTreeNode`\<`T`\>

#### Defined in

[src/collections.ts:214](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L214)

***

### right

> **right**: `PTreeNode`\<`T`\>

#### Defined in

[src/collections.ts:215](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L215)

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

[src/collections.ts:249](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L249)

## Methods

### createTree()

> `static` **createTree**\<`T`\>(`nodeValues`): [`Tree`](Tree.md)\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **nodeValues**: `Iterable`\<`T`\>

#### Returns

[`Tree`](Tree.md)\<`T`\>

#### Defined in

[src/collections.ts:223](https://github.com/chuacw/delphirtl/blob/6aa69946480948177da786cf3f6d1a4c3cea17f9/src/collections.ts#L223)
