[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / JSONRPCErrorException

# Class: JSONRPCErrorException

## Extends

- `Error`

## Implements

- `JSONRPCError`

## Constructors

### new JSONRPCErrorException()

> **new JSONRPCErrorException**(`message`, `code`, `data`?): [`JSONRPCErrorException`](JSONRPCErrorException.md)

#### Parameters

• **message**: `string`

• **code**: `number`

• **data?**: `any`

#### Returns

[`JSONRPCErrorException`](JSONRPCErrorException.md)

#### Overrides

`Error.constructor`

#### Defined in

node\_modules/json-rpc-2.0/dist/models.d.ts:37

## Properties

### code

> **code**: `number`

#### Implementation of

`JSONRPCError.code`

#### Defined in

node\_modules/json-rpc-2.0/dist/models.d.ts:35

***

### data?

> `optional` **data**: `any`

#### Implementation of

`JSONRPCError.data`

#### Defined in

node\_modules/json-rpc-2.0/dist/models.d.ts:36

***

### message

> **message**: `string`

#### Implementation of

`JSONRPCError.message`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1054

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1053

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1055

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:11

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:13

## Methods

### toObject()

> **toObject**(): `JSONRPCError`

#### Returns

`JSONRPCError`

#### Defined in

node\_modules/json-rpc-2.0/dist/models.d.ts:38

***

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:4
