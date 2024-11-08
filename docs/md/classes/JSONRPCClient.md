[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / JSONRPCClient

# Class: JSONRPCClient\<ClientParams\>

## Type Parameters

• **ClientParams** = `void`

## Implements

- `JSONRPCRequester`\<`ClientParams`\>

## Constructors

### new JSONRPCClient()

> **new JSONRPCClient**\<`ClientParams`\>(`_send`, `createID`?): [`JSONRPCClient`](JSONRPCClient.md)\<`ClientParams`\>

#### Parameters

• **\_send**: `SendRequest`\<`ClientParams`\>

• **createID?**: `CreateID`

#### Returns

[`JSONRPCClient`](JSONRPCClient.md)\<`ClientParams`\>

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:14

## Methods

### notify()

> **notify**(`method`, `params`, `clientParams`): `void`

#### Parameters

• **method**: `string`

• **params**: `any`

• **clientParams**: `ClientParams`

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:21

***

### receive()

> **receive**(`responses`): `void`

#### Parameters

• **responses**: `JSONRPCResponse` \| `JSONRPCResponse`[]

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:24

***

### rejectAllPendingRequests()

> **rejectAllPendingRequests**(`message`): `void`

#### Parameters

• **message**: `string`

#### Returns

`void`

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:23

***

### request()

> **request**(`method`, `params`, `clientParams`): `PromiseLike`\<`any`\>

#### Parameters

• **method**: `string`

• **params**: `any`

• **clientParams**: `ClientParams`

#### Returns

`PromiseLike`\<`any`\>

#### Implementation of

`JSONRPCRequester.request`

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:17

***

### requestAdvanced()

#### requestAdvanced(request, clientParams)

> **requestAdvanced**(`request`, `clientParams`): `PromiseLike`\<`JSONRPCResponse`\>

##### Parameters

• **request**: [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md)

• **clientParams**: `ClientParams`

##### Returns

`PromiseLike`\<`JSONRPCResponse`\>

##### Implementation of

`JSONRPCRequester.requestAdvanced`

##### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:19

#### requestAdvanced(request, clientParams)

> **requestAdvanced**(`request`, `clientParams`): `PromiseLike`\<`JSONRPCResponse`[]\>

##### Parameters

• **request**: [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md)[]

• **clientParams**: `ClientParams`

##### Returns

`PromiseLike`\<`JSONRPCResponse`[]\>

##### Implementation of

`JSONRPCRequester.requestAdvanced`

##### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:20

***

### send()

> **send**(`payload`, `clientParams`): `Promise`\<`void`\>

#### Parameters

• **payload**: `any`

• **clientParams**: `ClientParams`

#### Returns

`Promise`\<`void`\>

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:22

***

### timeout()

> **timeout**(`delay`, `overrideCreateJSONRPCErrorResponse`?): `JSONRPCRequester`\<`ClientParams`\>

#### Parameters

• **delay**: `number`

• **overrideCreateJSONRPCErrorResponse?**

#### Returns

`JSONRPCRequester`\<`ClientParams`\>

#### Defined in

node\_modules/json-rpc-2.0/dist/client.d.ts:16
