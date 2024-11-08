[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / JSONRPCServer

# Class: JSONRPCServer\<ServerParams\>

Description placeholder

## Export

JSONRPCServer

## Type Parameters

• **ServerParams** = `void`

## Constructors

### new JSONRPCServer()

> **new JSONRPCServer**\<`ServerParams`\>(`options`?): [`JSONRPCServer`](JSONRPCServer.md)\<`ServerParams`\>

#### Parameters

• **options?**: `JSONRPCServerOptions`

#### Returns

[`JSONRPCServer`](JSONRPCServer.md)\<`ServerParams`\>

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:78

## Properties

### mapErrorToJSONRPCErrorResponse()

> **mapErrorToJSONRPCErrorResponse**: (`id`, `error`) => `JSONRPCErrorResponse`

#### Parameters

• **id**: `JSONRPCID`

• **error**: `any`

#### Returns

`JSONRPCErrorResponse`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:77

## Methods

### addMethod()

> **addMethod**(`name`, `method`): `void`

#### Parameters

• **name**: `string`

• **method**: [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`ServerParams`\>

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:80

***

### addMethodAdvanced()

> **addMethodAdvanced**(`name`, `method`): `void`

#### Parameters

• **name**: `string`

• **method**: `JSONRPCMethod`\<`ServerParams`\>

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:83

***

### applyMiddleware()

> **applyMiddleware**(...`middlewares`): `void`

#### Parameters

• ...**middlewares**: `JSONRPCServerMiddleware`\<`ServerParams`\>[]

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:90

***

### hasMethod()

> **hasMethod**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:79

***

### receive()

#### receive(request, serverParams)

> **receive**(`request`, `serverParams`?): `PromiseLike`\<`null` \| `JSONRPCResponse`\>

##### Parameters

• **request**: [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md)

• **serverParams?**: `ServerParams`

##### Returns

`PromiseLike`\<`null` \| `JSONRPCResponse`\>

##### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:86

#### receive(request, serverParams)

> **receive**(`request`, `serverParams`?): `PromiseLike`\<`null` \| `JSONRPCResponse` \| `JSONRPCResponse`[]\>

##### Parameters

• **request**: [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md) \| [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md)[]

• **serverParams?**: `ServerParams`

##### Returns

`PromiseLike`\<`null` \| `JSONRPCResponse` \| `JSONRPCResponse`[]\>

##### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:87

***

### receiveJSON()

> **receiveJSON**(`json`, `serverParams`?): `PromiseLike`\<`null` \| `JSONRPCResponse` \| `JSONRPCResponse`[]\>

#### Parameters

• **json**: `string`

• **serverParams?**: `ServerParams`

#### Returns

`PromiseLike`\<`null` \| `JSONRPCResponse` \| `JSONRPCResponse`[]\>

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:84

***

### removeMethod()

> **removeMethod**(`name`): `void`

#### Parameters

• **name**: `string`

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/server.d.ts:81
