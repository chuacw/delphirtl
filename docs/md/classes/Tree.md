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

[src/collections.ts:255](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L255)

## Properties

### data

> **data**: `T`

#### Defined in

[src/collections.ts:253](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L253)

***

### left

> **left**: [`PTreeNode`](../type-aliases/PTreeNode.md)\<`T`\>

#### Defined in

[src/collections.ts:251](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L251)

***

### right

> **right**: [`PTreeNode`](../type-aliases/PTreeNode.md)\<`T`\>

#### Defined in

[src/collections.ts:252](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L252)

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the tree. Call only when this is the root.

##### Returns

`number`

#### Defined in

[src/collections.ts:285](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L285)

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

[src/collections.ts:260](https://github.com/chuacw/delphirtl/blob/7cdff4fb9a05124bdd3aaafa70e9539e4f06ec46/src/collections.ts#L260)