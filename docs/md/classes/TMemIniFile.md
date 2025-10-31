[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / TMemIniFile

# Class: TMemIniFile

## Extends

- `TCustomIniFile`

## Constructors

### new TMemIniFile()

> **new TMemIniFile**(): [`TMemIniFile`](TMemIniFile.md)

#### Returns

[`TMemIniFile`](TMemIniFile.md)

#### Inherited from

`TCustomIniFile.constructor`

#### Defined in

[src/inifiles.ts:16](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L16)

## Properties

### data

> `protected` **data**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

#### Inherited from

`TCustomIniFile.data`

#### Defined in

[src/inifiles.ts:14](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L14)

***

### sectionOrder

> `protected` **sectionOrder**: `string`[] = `[]`

#### Inherited from

`TCustomIniFile.sectionOrder`

#### Defined in

[src/inifiles.ts:13](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L13)

## Methods

### AfterConstruction()

> **AfterConstruction**(): `void`

Responds after the last constructor has executed.

AfterConstruction is called automatically after the object's last constructor has executed. Do not call it explicitly in your applications.

The AfterConstruction method implemented in TObject does nothing. Override this method when creating a class that performs an action after the object is created.

#### Returns

`void`

#### Inherited from

`TCustomIniFile.AfterConstruction`

#### Defined in

[src/rtl.ts:66](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L66)

***

### BeforeDestruction()

> **BeforeDestruction**(): `void`

Responds before the first destructor executes.

BeforeDestruction is called automatically before the object's first destructor executes. Do not call it explicitly in your applications.

The BeforeDestruction method implemented in TObject does nothing. Override this method when creating a class that performs an action before the object is destroyed.

#### Returns

`void`

#### Inherited from

`TCustomIniFile.BeforeDestruction`

#### Defined in

[src/rtl.ts:75](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L75)

***

### DeleteKey()

> **DeleteKey**(`Section`, `Key`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.DeleteKey`

#### Defined in

[src/inifiles.ts:215](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L215)

***

### destroy()

> **destroy**(): `void`

performs cleanup tasks and destroys the object

#### Returns

`void`

#### Inherited from

`TCustomIniFile.destroy`

#### Defined in

[src/inifiles.ts:20](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L20)

***

### Destroy()

> **Destroy**(): `void`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.Destroy`

#### Defined in

[src/rtl.ts:25](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L25)

***

### ensureSection()

> `protected` **ensureSection**(`name`): `Map`\<`string`, `string`\>

#### Parameters

• **name**: `string`

#### Returns

`Map`\<`string`, `string`\>

#### Inherited from

`TCustomIniFile.ensureSection`

#### Defined in

[src/inifiles.ts:25](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L25)

***

### EraseSection()

> **EraseSection**(`Section`): `void`

#### Parameters

• **Section**: `string`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.EraseSection`

#### Defined in

[src/inifiles.ts:208](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L208)

***

### free()

> **free**(): `void`

Calls destroy to perform any cleanup tasks. Call Free() to destroy the object, so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Inherited from

`TCustomIniFile.free`

#### Defined in

[src/rtl.ts:30](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L30)

***

### Free()

> **Free**(): `void`

Destroys the object, maintaining Delphi-style AfterConstruction and BeforeDestruction semantics.

#### Returns

`void`

#### Inherited from

`TCustomIniFile.Free`

#### Defined in

[src/rtl.ts:37](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L37)

***

### load()

> `protected` **load**(): `void`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.load`

#### Defined in

[src/inifiles.ts:224](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L224)

***

### parse()

> **parse**(`text`): `EnvNode`[]

#### Parameters

• **text**: `string`

#### Returns

`EnvNode`[]

#### Inherited from

`TCustomIniFile.parse`

#### Defined in

[src/env.ts:45](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/env.ts#L45)

***

### ReadBinaryStream()

> **ReadBinaryStream**(`Section`, `Key`, `stream`): `number`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **stream**: `any`

#### Returns

`number`

#### Inherited from

`TCustomIniFile.ReadBinaryStream`

#### Defined in

[src/inifiles.ts:147](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L147)

***

### ReadBool()

> **ReadBool**(`Section`, `Key`, `Default`): `boolean`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `boolean`

#### Returns

`boolean`

#### Inherited from

`TCustomIniFile.ReadBool`

#### Defined in

[src/inifiles.ts:77](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L77)

***

### ReadDate()

> **ReadDate**(`Section`, `Key`, `Default`): `Date`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `Date`

#### Returns

`Date`

#### Inherited from

`TCustomIniFile.ReadDate`

#### Defined in

[src/inifiles.ts:111](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L111)

***

### ReadDateTime()

> **ReadDateTime**(`Section`, `Key`, `Default`): `Date`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `Date`

#### Returns

`Date`

#### Inherited from

`TCustomIniFile.ReadDateTime`

#### Defined in

[src/inifiles.ts:121](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L121)

***

### ReadFloat()

> **ReadFloat**(`Section`, `Key`, `Default`): `number`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `number`

#### Returns

`number`

#### Inherited from

`TCustomIniFile.ReadFloat`

#### Defined in

[src/inifiles.ts:90](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L90)

***

### ReadInt64()

> **ReadInt64**(`Section`, `Key`, `Default`): `number`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `number`

#### Returns

`number`

#### Inherited from

`TCustomIniFile.ReadInt64`

#### Defined in

[src/inifiles.ts:65](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L65)

***

### ReadInteger()

> **ReadInteger**(`Section`, `Key`, `Default`): `number`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `number`

#### Returns

`number`

#### Inherited from

`TCustomIniFile.ReadInteger`

#### Defined in

[src/inifiles.ts:54](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L54)

***

### ReadSection()

> **ReadSection**(`Section`, `Strings`): `void`

#### Parameters

• **Section**: `string`

• **Strings**: `string`[]

#### Returns

`void`

#### Inherited from

`TCustomIniFile.ReadSection`

#### Defined in

[src/inifiles.ts:176](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L176)

***

### ReadSectionValues()

> **ReadSectionValues**(`Section`, `Strings`): `void`

#### Parameters

• **Section**: `string`

• **Strings**: `string`[]

#### Returns

`void`

#### Inherited from

`TCustomIniFile.ReadSectionValues`

#### Defined in

[src/inifiles.ts:183](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L183)

***

### ReadString()

> **ReadString**(`Section`, `Key`, `Default`): `string`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `string`

#### Returns

`string`

#### Inherited from

`TCustomIniFile.ReadString`

#### Defined in

[src/inifiles.ts:41](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L41)

***

### ReadSubSections()

> **ReadSubSections**(`Section`, `Strings`, `Recurse`): `void`

#### Parameters

• **Section**: `string`

• **Strings**: `string`[]

• **Recurse**: `boolean` = `false`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.ReadSubSections`

#### Defined in

[src/inifiles.ts:190](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L190)

***

### ReadTime()

> **ReadTime**(`Section`, `Key`, `Default`): `Date`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Default**: `Date`

#### Returns

`Date`

#### Inherited from

`TCustomIniFile.ReadTime`

#### Defined in

[src/inifiles.ts:117](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L117)

***

### save()

> `protected` **save**(): `void`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.save`

#### Defined in

[src/inifiles.ts:228](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L228)

***

### SectionExists()

> **SectionExists**(`Section`): `boolean`

#### Parameters

• **Section**: `string`

#### Returns

`boolean`

#### Inherited from

`TCustomIniFile.SectionExists`

#### Defined in

[src/inifiles.ts:33](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L33)

***

### UpdateFile()

> **UpdateFile**(): `void`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.UpdateFile`

#### Defined in

[src/inifiles.ts:232](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L232)

***

### ValueExists()

> **ValueExists**(`Section`, `Key`): `boolean`

#### Parameters

• **Section**: `string`

• **Key**: `string`

#### Returns

`boolean`

#### Inherited from

`TCustomIniFile.ValueExists`

#### Defined in

[src/inifiles.ts:37](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L37)

***

### WriteBinaryStream()

> **WriteBinaryStream**(`Section`, `Key`, `stream`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **stream**: `any`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteBinaryStream`

#### Defined in

[src/inifiles.ts:157](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L157)

***

### WriteBool()

> **WriteBool**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `boolean`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteBool`

#### Defined in

[src/inifiles.ts:86](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L86)

***

### WriteDate()

> **WriteDate**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `Date`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteDate`

#### Defined in

[src/inifiles.ts:125](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L125)

***

### WriteDateTime()

> **WriteDateTime**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `Date`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteDateTime`

#### Defined in

[src/inifiles.ts:133](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L133)

***

### WriteFloat()

> **WriteFloat**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `number`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteFloat`

#### Defined in

[src/inifiles.ts:97](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L97)

***

### WriteInt64()

> **WriteInt64**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `number`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteInt64`

#### Defined in

[src/inifiles.ts:73](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L73)

***

### WriteInteger()

> **WriteInteger**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `number`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteInteger`

#### Defined in

[src/inifiles.ts:61](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L61)

***

### WriteString()

> **WriteString**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `string`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteString`

#### Defined in

[src/inifiles.ts:46](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L46)

***

### WriteTime()

> **WriteTime**(`Section`, `Key`, `Value`): `void`

#### Parameters

• **Section**: `string`

• **Key**: `string`

• **Value**: `Date`

#### Returns

`void`

#### Inherited from

`TCustomIniFile.WriteTime`

#### Defined in

[src/inifiles.ts:129](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/inifiles.ts#L129)

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

#### Inherited from

`TCustomIniFile.Create`

#### Defined in

[src/rtl.ts:49](https://github.com/chuacw/delphirtl/blob/99d8c44e63124381b30b888cd4b51a7f5a9f03a2/src/rtl.ts#L49)
