[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / BaseJsonRpcServer

# Class: BaseJsonRpcServer

This is a JSON RPC server that conforms to the JSON RPC 2.0 spec as documented at https://www.jsonrpc.org/specification

## Constructors

### new BaseJsonRpcServer()

> **new BaseJsonRpcServer**(`host`?, `port`?): [`BaseJsonRpcServer`](BaseJsonRpcServer.md)

#### Parameters

• **host?**: `string` = `"::"`

The IP address/hostname to listen on

• **port?**: `number` = `CDefaultPort`

The port number to listen on

#### Returns

[`BaseJsonRpcServer`](BaseJsonRpcServer.md)

BaseJsonRpcServer

#### Defined in

[src/BaseJsonRpcServer.ts:64](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L64)

## Properties

### mExpressServer

> `protected` **mExpressServer**: `Express`

#### Defined in

[src/BaseJsonRpcServer.ts:36](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L36)

***

### mHttpTerminator

> `protected` **mHttpTerminator**: `undefined` \| `HttpTerminator`

#### Defined in

[src/BaseJsonRpcServer.ts:38](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L38)

***

### mJsonRpcServer

> `protected` **mJsonRpcServer**: [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:37](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L37)

***

### mListeningHost

> `protected` **mListeningHost**: `string`

#### Defined in

[src/BaseJsonRpcServer.ts:39](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L39)

***

### mListeningPort

> `protected` **mListeningPort**: `number`

#### Defined in

[src/BaseJsonRpcServer.ts:40](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L40)

***

### mRequest

> `protected` **mRequest**: `undefined` \| `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:51](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L51)

***

### mResponse

> `protected` **mResponse**: `undefined` \| `Response`\<`any`, `Record`\<`string`, `any`\>\>

Only valid when processing a request

#### Defined in

[src/BaseJsonRpcServer.ts:46](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L46)

***

### mServer

> `protected` **mServer**: `undefined` \| `Server`

#### Defined in

[src/BaseJsonRpcServer.ts:41](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L41)

## Accessors

### listeningPath

> `get` **listeningPath**(): `string`

Returns the path on which to listen to requests for. Override to listen on another path.

#### Returns

`string`

path on which to listen to requests for

#### Defined in

[src/BaseJsonRpcServer.ts:324](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L324)

## Methods

### addRPCMethods()

> `protected` **addRPCMethods**(): `void`

Adds all necessary JSON RPC methods to this.mJsonRpcServer

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:75](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L75)

***

### afterConstruction()

> `protected` **afterConstruction**(): `void`

Allows descendants to do something after class construction

#### Returns

`void`

void

#### Defined in

[src/BaseJsonRpcServer.ts:93](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L93)

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

[src/BaseJsonRpcServer.ts:113](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L113)

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

[src/BaseJsonRpcServer.ts:102](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L102)

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

[src/BaseJsonRpcServer.ts:151](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L151)

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

[src/BaseJsonRpcServer.ts:123](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L123)

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

[src/BaseJsonRpcServer.ts:138](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L138)

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

[src/BaseJsonRpcServer.ts:164](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L164)

***

### echo()

> **echo**(`params`): `any`

#### Parameters

• **params**: `any`

#### Returns

`any`

#### Defined in

[src/BaseJsonRpcServer.ts:434](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L434)

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

[src/BaseJsonRpcServer.ts:193](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L193)

***

### implementedRPCMethods()

> `protected` **implementedRPCMethods**(): [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

Returns RPC methods implemented by the server
Override to return an array of RPC methods implemented.

#### Returns

[`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

array of RPC methods implemented

#### Defined in

[src/BaseJsonRpcServer.ts:232](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L232)

***

### initExpress()

> `protected` **initExpress**(): `Express`

Initializes the Express server and returns it

#### Returns

`Express`

#### Defined in

[src/BaseJsonRpcServer.ts:241](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L241)

***

### initJsonRpcServer()

> `protected` **initJsonRpcServer**(): [`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

Initializes the JSON RPC server and returns it

#### Returns

[`JSONRPCServer`](JSONRPCServer.md)\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:268](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L268)

***

### initParseErrorHandler()

> `protected` **initParseErrorHandler**(`aExpress`): `void`

Returns a JSON parse error during express.json parsing

#### Parameters

• **aExpress**: `Express`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:283](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L283)

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

[src/BaseJsonRpcServer.ts:297](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L297)

***

### listen()

> **listen**(`port`?): `Promise`\<`void`\>

Starts listening for RPC requests

#### Parameters

• **port?**: `number`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:303](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L303)

***

### log()

> `protected` **log**(...`data`): `void`

#### Parameters

• ...**data**: `any`[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:328](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L328)

***

### logListeningMethods()

> `protected` **logListeningMethods**(`methods`): `void`

Displays the JSON RPC methods being listened to

#### Parameters

• **methods**: [`SimpleJSONRPCMethod`](../type-aliases/SimpleJSONRPCMethod.md)\<`void`\>[]

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:336](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L336)

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

[src/BaseJsonRpcServer.ts:350](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L350)

***

### onBeforeListening()

> `protected` **onBeforeListening**(): `void`

This is called before the JSON RPC server starts listening on the port
Override this, for example, to listen just on IPv4 by calling dns.setDefaultResultOrder('ipv4first');

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:365](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L365)

***

### onParseError()

> `protected` **onParseError**(`err`, `request`, `response`): `void`

Called when there's a parsing error. The overridden method should create a JSON RPC Error response and
send it using response.send(err_response)
If the error is not handled, this class will return an error

#### Parameters

• **err**: `any`

• **request**: [`Request`](../type-aliases/Request.md)

• **response**: `TSendHandler`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:375](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L375)

***

### sendInvalidParams()

> `protected` **sendInvalidParams**(`data`?): `void`

Creates an Invalid Params JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:393](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L393)

***

### sendInvalidRequest()

> `protected` **sendInvalidRequest**(`data`?): `void`

Creates an Invalid Request JSON RPC Error exception and sends it.

#### Parameters

• **data?**: `any`

#### Returns

`void`

#### Defined in

[src/BaseJsonRpcServer.ts:383](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L383)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stops the RPC server. This can be called by a RPC call or by the app itself

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:401](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L401)

***

### stopListening()

> `protected` **stopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:406](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L406)

***

### waitForServerListening()

> `protected` **waitForServerListening**(): `Promise`\<`void`\>

Waits for the server to starts listening before returning.
Override to disable this

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:416](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L416)

***

### waitForServerStopListening()

> `protected` **waitForServerStopListening**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/BaseJsonRpcServer.ts:424](https://github.com/chuacw/delphirtl/blob/330aebacf278bc1990fa50cf42ddc34bae1be0d7/src/BaseJsonRpcServer.ts#L424)
