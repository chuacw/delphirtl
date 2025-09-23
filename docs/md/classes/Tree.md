[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Tree

# Class: Tree\<T\>

TreeNode

 TreeNode

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

[src/collections.ts:280](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L280)

## Properties

### data

> **data**: `T`

#### Defined in

[src/collections.ts:278](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L278)

***

### left

> **left**: [`PTreeNode`](../type-aliases/PTreeNode.md)\<`T`\>

#### Defined in

[src/collections.ts:276](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L276)

***

### right

> **right**: [`PTreeNode`](../type-aliases/PTreeNode.md)\<`T`\>

#### Defined in

[src/collections.ts:277](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L277)

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Returns the height of the tree. Call only when this is the root.

##### Returns

`number`

#### Defined in

[src/collections.ts:310](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L310)

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

[src/collections.ts:285](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/collections.ts#L285)
