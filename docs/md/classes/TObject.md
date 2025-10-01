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

Responds after the last constructor has executed.

AfterConstruction is called automatically after the object's last constructor has executed. Do not call it explicitly in your applications.

The AfterConstruction method implemented in TObject does nothing. Override this method when creating a class that performs an action after the object is created.

#### Returns

`void`

#### Defined in

[src/rtl.ts:66](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L66)

***

### BeforeDestruction()

> **BeforeDestruction**(): `void`

Responds before the first destructor executes.

BeforeDestruction is called automatically before the object's first destructor executes. Do not call it explicitly in your applications.

The BeforeDestruction method implemented in TObject does nothing. Override this method when creating a class that performs an action before the object is destroyed.

#### Returns

`void`

#### Defined in

[src/rtl.ts:75](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L75)

***

### destroy()

> **destroy**(): `void`

performs cleanup tasks and destroys the object

#### Returns

`void`

#### Defined in

[src/rtl.ts:17](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L17)

***

### Destroy()

> **Destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/rtl.ts:25](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L25)

***

### free()

> **free**(): `void`

Calls destroy to perform any cleanup tasks. Call Free() to destroy the object, so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Defined in

[src/rtl.ts:30](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L30)

***

### Free()

> **Free**(): `void`

Destroys the object, maintaining Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Defined in

[src/rtl.ts:37](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L37)

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

[src/rtl.ts:49](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L49)
