[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / BaseJsonRpcServer

# Class: BaseJsonRpcServer

This is a JSON RPC server that conforms to the JSON RPC 2.0 spec as documented at https://www.jsonrpc.org/specification

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

[src/BaseJsonRpcServer.ts:63](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L63)

## Properties

### mExpressServer

> `protected` **mExpressServer**: `Express`

#### Defined in

[src/BaseJsonRpcServer.ts:36](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L36)

***

### mHttpTerminator

> `protected` **mHttpTerminator**: `undefined` \| `HttpTerminator`

#### Defined in

[src/BaseJsonRpcServer.ts:38](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L38)

***

### mJsonRpcServer

> `protected` **mJsonRpcServer**: [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:37](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L37)

***

### mListeningHost

> `protected` **mListeningHost**: `string`

#### Defined in

[src/BaseJsonRpcServer.ts:39](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L39)

***

### mListeningPort

> `protected` **mListeningPort**: `number`

#### Defined in

[src/BaseJsonRpcServer.ts:40](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L40)

***

### mRequest

> `protected` **mRequest**: `undefined` \| `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:51](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L51)

***

### mResponse

> `protected` **mResponse**: `undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:46](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L46)

***

### mServer

> `protected` **mServer**: `undefined` \| `Server`

#### Defined in

[src/BaseJsonRpcServer.ts:41](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L41)

## Accessors

### listeningPath

#### Get Signature

> **get** **listeningPath**(): `string`

Returns the path on which to listen to requests for. Override to listen on another path.

##### Returns

`string`

path on which to listen to requests for

#### Defined in

[src/BaseJsonRpcServer.ts:323](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L323)

## Methods

### addRPCMethods()

> `protected` **addRPCMethods**(): `void`

Adds all necessary JSON RPC methods to this.mJsonRpcServer

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:74](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L74)

***

### afterConstruction()

> `protected` **afterConstruction**(): `void`

Allows descendants to do something after class construction

#### Returns

`void`

void

#### Defined in

[src/BaseJsonRpcServer.ts:92](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L92)

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

[src/BaseJsonRpcServer.ts:112](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L112)

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

[src/BaseJsonRpcServer.ts:101](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L101)

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

[src/BaseJsonRpcServer.ts:150](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L150)

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

[src/BaseJsonRpcServer.ts:122](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L122)

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

[src/BaseJsonRpcServer.ts:137](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L137)

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

[src/BaseJsonRpcServer.ts:163](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L163)

***

### echo()

> **echo**(`params`): `any`

#### Parameters

• **params**: `any`

#### Returns

`any`

#### Defined in

[src/BaseJsonRpcServer.ts:433](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L433)

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

[src/BaseJsonRpcServer.ts:192](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L192)

***

### implementedRPCMethods()

> `protected` **implementedRPCMethods**(): [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

Returns RPC methods implemented by the server
Override to return an array of RPC methods implemented.

#### Returns

[`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

array of RPC methods implemented

#### Defined in

[src/BaseJsonRpcServer.ts:231](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L231)

***

### initExpress()

> `protected` **initExpress**(): `Express`

Initializes the Express server and returns it

#### Returns

`Express`

#### Defined in

[src/BaseJsonRpcServer.ts:240](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L240)

***

### initJsonRpcServer()

> `protected` **initJsonRpcServer**(): [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

Initializes the JSON RPC server and returns it

#### Returns

[`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:267](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L267)

***

### initParseErrorHandler()

> `protected` **initParseErrorHandler**(`aExpress`): `void`

Returns a JSON parse error during express.json parsing

#### Parameters

• **aExpress**: `Express`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:282](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L282)

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

[src/BaseJsonRpcServer.ts:296](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L296)

***

### listen()

> **listen**(`port`?): `Promise`\<`void`\>

Starts listening for RPC requests

#### Parameters

• **port?**: `number`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:302](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L302)

***

### log()

> `protected` **log**(...`data`): `void`

#### Parameters

• ...**data**: `any`[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:327](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L327)

***

### logListeningMethods()

> `protected` **logListeningMethods**(`methods`): `void`

Displays the JSON RPC methods being listened to

#### Parameters

• **methods**: [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:335](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L335)

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

[src/BaseJsonRpcServer.ts:349](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L349)

***

### onBeforeListening()

> `protected` **onBeforeListening**(): `void`

This is called before the JSON RPC server starts listening on the port
Override this, for example, to listen just on IPv4 by calling dns.setDefaultResultOrder('ipv4first');

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:364](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L364)

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

[src/BaseJsonRpcServer.ts:374](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L374)

***

### sendInvalidParams()

> `protected` **sendInvalidParams**(`data`?): `void`

Creates an Invalid Params JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:392](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L392)

***

### sendInvalidRequest()

> `protected` **sendInvalidRequest**(`data`?): `void`

Creates an Invalid Request JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:382](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L382)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stops the RPC server. This can be called by a RPC call or by the app itself

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:400](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L400)

***

### stopListening()

> `protected` **stopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:405](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L405)

***

### waitForServerListening()

> `protected` **waitForServerListening**(): `Promise`\<`void`\>

Waits for the server to starts listening before returning.
Override to disable this

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:415](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L415)

***

### waitForServerStopListening()

> `protected` **waitForServerStopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:423](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/BaseJsonRpcServer.ts#L423)
