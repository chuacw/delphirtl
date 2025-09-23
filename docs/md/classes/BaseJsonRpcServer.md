[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / BaseJsonRpcServer

# Class: BaseJsonRpcServer

This is a JSON RPC server that conforms to the JSON RPC 2.0 spec as documented at https://www.jsonrpc.org/specification 

 BaseJsonRpcServer

## Constructors

### new BaseJsonRpcServer()

> **new BaseJsonRpcServer**(`host`?, `port`?): [`BaseJsonRpcServer`](BaseJsonRpcServer.md)

Constructs a BaseJsonRpcServer server and returns it.
Listens on localhost:8080 by default, on both IPv4 and IPv6
To listen only on IPv4, override onBeforeListening and call dns.setDefaultResultOrder('ipv4first');
To listen only on IPv6, if both IPv4 and IPv6 is enabled, just pass "localhost" to the host parameter

#### Parameters

• **host?**: `string` = `"::"`

The IP address/hostname to listen on

• **port?**: `number` = `CDefaultPort`

The port number to listen on

#### Returns

[`BaseJsonRpcServer`](BaseJsonRpcServer.md)

BaseJsonRpcServer

#### Defined in

[src/BaseJsonRpcServer.ts:129](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L129)

## Properties

### mExpressServer

> `protected` **mExpressServer**: `Express`

#### Defined in

[src/BaseJsonRpcServer.ts:102](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L102)

***

### mHttpTerminator

> `protected` **mHttpTerminator**: `undefined` \| `HttpTerminator`

#### Defined in

[src/BaseJsonRpcServer.ts:104](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L104)

***

### mJsonRpcServer

> `protected` **mJsonRpcServer**: [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:103](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L103)

***

### mListeningHost

> `protected` **mListeningHost**: `string`

#### Defined in

[src/BaseJsonRpcServer.ts:105](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L105)

***

### mListeningPort

> `protected` **mListeningPort**: `number`

#### Defined in

[src/BaseJsonRpcServer.ts:106](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L106)

***

### mRequest

> `protected` **mRequest**: `undefined` \| `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:117](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L117)

***

### mResponse

> `protected` **mResponse**: `undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:112](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L112)

***

### mServer

> `protected` **mServer**: `undefined` \| `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

#### Defined in

[src/BaseJsonRpcServer.ts:107](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L107)

## Accessors

### listeningPath

#### Get Signature

> **get** **listeningPath**(): `string`

Returns the path on which to listen to requests for. Override to listen on another path.

##### Returns

`string`

path on which to listen to requests for

#### Defined in

[src/BaseJsonRpcServer.ts:389](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L389)

## Methods

### addRPCMethods()

> `protected` **addRPCMethods**(): `void`

Adds all necessary JSON RPC methods to this.mJsonRpcServer

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:140](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L140)

***

### afterConstruction()

> `protected` **afterConstruction**(): `void`

Allows descendants to do something after class construction

#### Returns

`void`

void

#### Defined in

[src/BaseJsonRpcServer.ts:158](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L158)

***

### createInvalidParams()

> `protected` **createInvalidParams**(`data`?): [`JSONRPCErrorException`](JSONRPCErrorException.md)

Creates an Invalid Params JSON RPC Error exception, with the message as Invalid Params.
The caller must throw the return of this call.

#### Parameters

• **data?**: `any`

#### Returns

[`JSONRPCErrorException`](JSONRPCErrorException.md)

Invalid Params JSON RPC Error exception

#### Defined in

[src/BaseJsonRpcServer.ts:178](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L178)

***

### createInvalidParamsMessage()

> `protected` **createInvalidParamsMessage**(`message`, `data`?): [`JSONRPCErrorException`](JSONRPCErrorException.md)

Creates an Invalid Params JSON RPC Error exception, with the given message.
The caller must throw the return of this call.

#### Parameters

• **message**: `string`

• **data?**: `any`

#### Returns

[`JSONRPCErrorException`](JSONRPCErrorException.md)

Invalid Params JSON RPC Error exception

#### Defined in

[src/BaseJsonRpcServer.ts:167](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L167)

***

### createInvalidRequest()

> `protected` **createInvalidRequest**(`data`?): [`JSONRPCErrorException`](JSONRPCErrorException.md)

Creates an Invalid Request JSON RPC Error exception, with the message as Invalid Params.
The caller must throw the return of this call.

#### Parameters

• **data?**: `any`

#### Returns

[`JSONRPCErrorException`](JSONRPCErrorException.md)

Invalid Request JSON RPC Error exception

#### Defined in

[src/BaseJsonRpcServer.ts:216](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L216)

***

### createInvalidRequestResponse()

> `protected` **createInvalidRequestResponse**(`request`): `JSONRPCErrorResponse`

Creates an Invalid Request JSON RPC Error response.

#### Parameters

• **request**: `any`

#### Returns

`JSONRPCErrorResponse`

Invalid Params JSON RPC response

#### Defined in

[src/BaseJsonRpcServer.ts:188](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L188)

***

### createMethodNotFoundResponse()

> `protected` **createMethodNotFoundResponse**(`request`): [`JSONRPCErrorException`](JSONRPCErrorException.md)

Creates a Method not found JSON RPC Error response, with the message as Invalid Params.
The caller must throw the return of this call.

#### Parameters

• **request**: `any`

#### Returns

[`JSONRPCErrorException`](JSONRPCErrorException.md)

Invalid Request JSON RPC Error exception

#### Defined in

[src/BaseJsonRpcServer.ts:203](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L203)

***

### doParseError()

> `protected` **doParseError**(`err`, `req`, `res`, `next`): `void`

Calls this.onParseError
If onParseError doesn't handle the error, doParseError will send a JSON RPC Error response
if the error is a parsing error, or pass the error up to the next middleware to handle

#### Parameters

• **err**: `any`

• **req**: [`Request`](../type-aliases/Request.md)

• **res**: [`Response`](../type-aliases/Response.md)

• **next**: `NextFunction`

#### Returns

`void`

Invalid Request JSON RPC Error exception

#### Defined in

[src/BaseJsonRpcServer.ts:229](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L229)

***

### echo()

> **echo**(`params`): `any`

#### Parameters

• **params**: `any`

#### Returns

`any`

#### Defined in

[src/BaseJsonRpcServer.ts:499](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L499)

***

### handleRequest()

> `protected` **handleRequest**(`request`, `response`): `Promise`\<`void`\>

Handles a single or a batch JSON RPC request.

#### Parameters

• **request**: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

• **response**: `Response`\<`any`, `Record`\<`string`, `any`\>\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:258](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L258)

***

### implementedRPCMethods()

> `protected` **implementedRPCMethods**(): [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

Returns RPC methods implemented by the server
Override to return an array of RPC methods implemented.

#### Returns

[`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

array of RPC methods implemented

#### Defined in

[src/BaseJsonRpcServer.ts:297](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L297)

***

### initExpress()

> `protected` **initExpress**(): `Express`

Initializes the Express server and returns it

#### Returns

`Express`

#### Defined in

[src/BaseJsonRpcServer.ts:306](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L306)

***

### initJsonRpcServer()

> `protected` **initJsonRpcServer**(): [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

Initializes the JSON RPC server and returns it

#### Returns

[`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:333](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L333)

***

### initParseErrorHandler()

> `protected` **initParseErrorHandler**(`aExpress`): `void`

Returns a JSON parse error during express.json parsing

#### Parameters

• **aExpress**: `Express`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:348](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L348)

***

### JsonRpcErrorListener()

> `protected` **JsonRpcErrorListener**(`message`, `data`): `void`

Error listener for JSON RPC, override to handle.
Called when an error occurred during the JSON RPC method call.
Do not throw an exception within this method

#### Parameters

• **message**: `string`

• **data**: `unknown`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:362](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L362)

***

### listen()

> **listen**(`port`?): `Promise`\<`void`\>

Starts listening for RPC requests

#### Parameters

• **port?**: `number`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:368](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L368)

***

### log()

> `protected` **log**(...`data`): `void`

#### Parameters

• ...**data**: `any`[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:393](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L393)

***

### logListeningMethods()

> `protected` **logListeningMethods**(`methods`): `void`

Displays the JSON RPC methods being listened to

#### Parameters

• **methods**: [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:401](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L401)

***

### onBeforeDispatchRequest()

> `protected` **onBeforeDispatchRequest**(`next`, `request`, `serverParams`): [`JSONRPCResponsePromise`](../type-aliases/JSONRPCResponsePromise.md)

Called before every valid JSON body is dispatched, this doesn't mean that the request is a valid JSON RPC call though.
If the request is valid, the method should call next(request, serverParams) and return its result.
If the request is invalid, it should throw an appropriate error.

#### Parameters

• **next**: [`JSONRPCServerMiddlewareNext`](../type-aliases/JSONRPCServerMiddlewareNext.md)\<`void`\>

• **request**: [`JSONRPCRequest`](../interfaces/JSONRPCRequest.md)

• **serverParams**: `undefined` \| `void`

#### Returns

[`JSONRPCResponsePromise`](../type-aliases/JSONRPCResponsePromise.md)

#### Defined in

[src/BaseJsonRpcServer.ts:415](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L415)

***

### onBeforeListening()

> `protected` **onBeforeListening**(): `void`

This is called before the JSON RPC server starts listening on the port
Override this, for example, to listen just on IPv4 by calling dns.setDefaultResultOrder('ipv4first');

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:430](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L430)

***

### onParseError()

> `protected` **onParseError**(`err`, `request`, `response`): `void`

Called when there's a parsing error. The overridden method should create a JSON RPC Error response and
send it using response.send(err_response)
If the error is not handled, this class will return an error

#### Parameters

• **err**: `any`

• **request**: [`Request`](../type-aliases/Request.md)

• **response**: [`TSendHandler`](../interfaces/TSendHandler.md)

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:440](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L440)

***

### sendInvalidParams()

> `protected` **sendInvalidParams**(`data`?): `void`

Creates an Invalid Params JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:458](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L458)

***

### sendInvalidRequest()

> `protected` **sendInvalidRequest**(`data`?): `void`

Creates an Invalid Request JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:448](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L448)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stops the RPC server. This can be called by a RPC call or by the app itself

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:466](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L466)

***

### stopListening()

> `protected` **stopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:471](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L471)

***

### waitForServerListening()

> `protected` **waitForServerListening**(): `Promise`\<`void`\>

Waits for the server to starts listening before returning.
Override to disable this

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:481](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L481)

***

### waitForServerStopListening()

> `protected` **waitForServerStopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:489](https://github.com/chuacw/delphirtl/blob/7ea4891110a48e6aa35744474c09ae59d2a501a7/src/BaseJsonRpcServer.ts#L489)
