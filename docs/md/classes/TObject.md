[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / TObject

# Class: TObject

Implements Delphi TObject semantics where you have to call .Free() to destroy the object.
Has AfterConstruction and BeforeDestruction methods, which can be overridden.

## Constructors

### new TObject()

> **new TObject**(): [`TObject`](TObject.md)

#### Returns

[`TObject`](TObject.md)

## Methods

### AfterConstruction()

> **AfterConstruction**(): `void`

#### Returns

`void`

#### Defined in

[src/rtl.ts:52](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L52)

***

### BeforeDestruction()

> **BeforeDestruction**(): `void`

#### Returns

`void`

#### Defined in

[src/rtl.ts:53](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L53)

***

### destroy()

> **destroy**(): `void`

performs cleanup tasks and destroys the object

#### Returns

`void`

#### Defined in

[src/rtl.ts:14](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L14)

***

### Destroy()

> **Destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/rtl.ts:18](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L18)

***

### free()

> **free**(): `void`

Calls destroy to perform any cleanup tasks. Call Free() to destroy the object, so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Defined in

[src/rtl.ts:23](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L23)

***

### Free()

> **Free**(): `void`

Destroys the object, maintaining Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Defined in

[src/rtl.ts:30](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L30)

***

### Create()

> `static` **Create**\<`T`\>(`this`, ...`args`): `T`

Creates a new instance of the class. To create a new constructor, declare the constructor(args) method
and call the super constructor. Then, to instantiate the class, call YourClass.Create(args) instead of new YourClass(args),
so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Type Parameters

• **T** *extends* [`TObject`](TObject.md)\<`T`\>

#### Parameters

• **this**

• ...**args**: `any`[]

#### Returns

`T`

#### Defined in

[src/rtl.ts:42](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L42)
