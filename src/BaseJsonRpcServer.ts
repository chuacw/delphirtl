import { 
    createJSONRPCErrorResponse, isJSONRPCID, JSONRPC, JSONRPCClient, JSONRPCErrorCode, JSONRPCErrorException, 
    JSONRPCErrorResponse, JSONRPCParams, JSONRPCRequest, JSONRPCResponsePromise, JSONRPCServer, JSONRPCServerMiddlewareNext, 
    SimpleJSONRPCMethod 
} from "json-rpc-2.0";
import express, { Express, NextFunction, response } from 'express';
import * as http from 'http';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import { sleep } from "./rtl";
import net from "node:net";

type Request = express.Request;
type Response = express.Response;
type ListenAddr = string | net.AddressInfo | null;
type JSONRPCParameters = JSONRPCParams | undefined;

export interface TSendHandler {
     send: (body: string|number|boolean|object|Buffer) => void;
}


/**
 * Invalid params
 *
 * @type {"Invalid params"}
 * @category Constants
 */
const SInvalidParams = "Invalid params";

/**
 * Invalid request
 *
 * @type {"Invalid Request"}
 * @category Constants
 */
const SInvalidRequest = "Invalid Request";

/**
 * Method not found
 *
 * @type {"Method not found"}
 * @category Constants
 */
const SMethodNotFound = "Method not found";

/**
 * Parse error
 *
 * @type {"Parse error"}
 * @category Constants
 */
const SParseError = "Parse error";

/**
 * Entity parse failed
 *
 * @type {"entity.parse.failed"}
 * @category Constants
 */
const SEntityParseFailed = "entity.parse.failed";

/**
 * No content
 *
 * @type {204}
 * @category Constants
 */
const CNoContent = 204;

/**
 * Default port
 *
 * @type {8080}
 * @category Constants
 */
const CDefaultPort = 8080;

/**
 * String
 *
 * @type {"string"}
 * @category Constants
 */
const CString = "string";

/**
 * Powered by
 *
 * @type {"x-powered-by"}
 * @category Constants
 */
const CXPoweredBy = "x-powered-by";

/**
 * This is a JSON RPC server that conforms to the JSON RPC 2.0 spec as documented at https://www.jsonrpc.org/specification 
 *
 * @class BaseJsonRpcServer
 * @typedef {BaseJsonRpcServer}
 * @category JSON RPC
 */
class BaseJsonRpcServer {
    protected mExpressServer!: Express;
    protected mJsonRpcServer!: JSONRPCServer;
    protected mHttpTerminator: HttpTerminator | undefined;
    protected mListeningHost!: string;
    protected mListeningPort!: number;
    protected mServer!: http.Server | undefined;

    /**
    * Only valid when processing a request
    */
    protected mResponse: express.Response | undefined;

    /**
    * Only valid when processing a request
    */
    protected mRequest: express.Request | undefined;

    /**
     * Constructs a BaseJsonRpcServer server and returns it.
     * Listens on localhost:8080 by default, on both IPv4 and IPv6
     * To listen only on IPv4, override onBeforeListening and call dns.setDefaultResultOrder('ipv4first');
     * To listen only on IPv6, if both IPv4 and IPv6 is enabled, just pass "localhost" to the host parameter
     *
     * @param {string} [host="::"] The IP address/hostname to listen on
     * @param {number} [port=CDefaultPort] The port number to listen on
     * @returns {BaseJsonRpcServer} BaseJsonRpcServer
     */
    constructor(host: string = "::", port: number = CDefaultPort) {
        this.mListeningHost = host;
        this.mListeningPort = port;
        this.mJsonRpcServer = this.initJsonRpcServer();
        this.mExpressServer = this.initExpress();
        this.afterConstruction();
    }

    /**
     * Adds all necessary JSON RPC methods to this.mJsonRpcServer
     */
    protected addRPCMethods() {
        const methods: SimpleJSONRPCMethod<void>[] = this.implementedRPCMethods();
        for (const method of methods) {
            const name = method.name;
            if (this.mJsonRpcServer.hasMethod(name)) {
                continue;
            }
            const boundMethod = method.bind(this);
            this.mJsonRpcServer.addMethod(name, boundMethod);
        };
        this.logListeningMethods(methods);
    }

    /**
     * Allows descendants to do something after class construction
     *
     * @returns {void} void
     */
    protected afterConstruction() {
    }

    /**
     * Creates an Invalid Params JSON RPC Error exception, with the given message.
     * The caller must throw the return of this call.
     *
     * @returns {string} Invalid Params JSON RPC Error exception
     */
    protected createInvalidParamsMessage(message: string, data?: any) {
        const error = new JSONRPCErrorException(message, JSONRPCErrorCode.InvalidParams, data);
        return error;
    }

    /**
     * Creates an Invalid Params JSON RPC Error exception, with the message as Invalid Params.
     * The caller must throw the return of this call.
     *
     * @returns {string} Invalid Params JSON RPC Error exception
     */
    protected createInvalidParams(data?: any): JSONRPCErrorException {
        const error = this.createInvalidParamsMessage(SInvalidParams, data);
        return error;
    }

    /**
     * Creates an Invalid Request JSON RPC Error response.
     *
     * @returns {string} Invalid Params JSON RPC response
     */
    protected createInvalidRequestResponse(request: any): JSONRPCErrorResponse {
        const response = createJSONRPCErrorResponse(
            isJSONRPCID(request.id) ? request.id : null,
            JSONRPCErrorCode.InvalidRequest,
            SInvalidRequest
        );
        return response;
    }

    /**
     * Creates a Method not found JSON RPC Error response, with the message as Invalid Params.
     * The caller must throw the return of this call.
     *
     * @returns {string} Invalid Request JSON RPC Error exception
     */
    protected createMethodNotFoundResponse(request: any): JSONRPCErrorException {
        const error = new JSONRPCErrorException(SMethodNotFound,
            JSONRPCErrorCode.MethodNotFound,
        );
        return error;
    }

    /**
     * Creates an Invalid Request JSON RPC Error exception, with the message as Invalid Params.
     * The caller must throw the return of this call.
     *
     * @returns {string} Invalid Request JSON RPC Error exception
     */
    protected createInvalidRequest(data?: any): JSONRPCErrorException {
        const error = new JSONRPCErrorException(SInvalidRequest, JSONRPCErrorCode.InvalidRequest, data);
        return error;
    }


    /**
     * Calls this.onParseError
     * If onParseError doesn't handle the error, doParseError will send a JSON RPC Error response
     * if the error is a parsing error, or pass the error up to the next middleware to handle
     *
     * @returns {string} Invalid Request JSON RPC Error exception
     */
    protected doParseError(err: any, req: Request, res: Response, next: NextFunction) {
        let handled = false;
        // creates a custom response with a send function
        // if the send function is called, sets the handled flag
        const response: TSendHandler = { 
            send: (body: string|number|boolean|object|Buffer) => {
                handled = true;
                res.send(body);
            }
        };
        this.mResponse = undefined; // prevents mResponse from being used by overridden onParseError methods
        this.onParseError(err, req, response);
        // if this is not set, we'll know that onParseError didn't call it, so we should handle it
        if(!handled) {
            // this entity.parse.failed constant is used/sent by Express
            if (err.type === SEntityParseFailed) {
                const obj = createJSONRPCErrorResponse(null, JSONRPCErrorCode.ParseError, SParseError);
                res.send(obj);
            } else {
                next(err);
            }
        }
    }

    /**
     * Handles a single or a batch JSON RPC request.
     *
     * @returns {void} 
     */
    protected async handleRequest(request: express.Request, response: express.Response) {
        try { 
            const temp = request.body;
            // checks that the request body fits a JSON RPC call
            const isBatch = Array.isArray(temp);
            if (isBatch && (temp.length === 0)) {
                response.send(this.createInvalidRequestResponse(request));
                return;
            }
            const jsonRpcResponse = await this.mJsonRpcServer.receive(request.body);
            if (jsonRpcResponse) {
                response.send(jsonRpcResponse);
            } else {
                switch(isBatch) {
                    case false: {
                        if (typeof request.body.method != CString) {
                            response.send(this.createInvalidRequestResponse(request));
                            break;
                        }
                        response.sendStatus(CNoContent); 
                        break;
                    }
                    case true: {
                        response.send({}); // empty response for a notification
                    }
                }
            }
        } catch (e) {
            const error = createJSONRPCErrorResponse(isJSONRPCID(request.body.id) ? request.body.id : null, 
                JSONRPCErrorCode.InvalidRequest, SInvalidRequest);
            response.send(error);
        }
    }

    /**
     * Returns RPC methods implemented by the server
     * Override to return an array of RPC methods implemented.
     * @returns {SimpleJSONRPCMethod<void>[]} array of RPC methods implemented
     */
    protected implementedRPCMethods(): SimpleJSONRPCMethod<void>[] {
        return [this.echo];
    }

    /**
     * Initializes the Express server and returns it
     *
     * @returns {Express}
     */
    protected initExpress() {
        const result = express();
        result.disable(CXPoweredBy); // removes the X-Powered-By header

        result.use(express.json());
        this.initParseErrorHandler(result);

        result.post(this.listeningPath, async(request: express.Request, response: express.Response) => {
            this.mResponse = response;
            this.mRequest = request;
            try { 
                await this.handleRequest(request, response);
            } finally {
                // @ts-ignore
                this.mRequest = undefined;
                // @ts-ignore
                this.mResponse = undefined;
            }
        });
        return result;
    }
    
    /**
     * Initializes the JSON RPC server and returns it
     *
     * @returns {JSONRPCServer}
     */
    protected initJsonRpcServer() {
        const result = new JSONRPCServer({ errorListener: this.JsonRpcErrorListener.bind(this) });
        const checkRequest = 
            (next: JSONRPCServerMiddlewareNext<void>, request: JSONRPCRequest, serverParams: void | undefined): JSONRPCResponsePromise => {
                return this.onBeforeDispatchRequest(next, request, serverParams);
        };
        result.applyMiddleware(checkRequest);
        return result;
    }

    /**
     * Returns a JSON parse error during express.json parsing
     *
     * @returns {void}
     */
    protected initParseErrorHandler(aExpress: Express) {
        const parseErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
            this.doParseError(err, req, res, next);
        }
        aExpress.use(parseErrorHandler);
    }

    /**
     * Error listener for JSON RPC, override to handle.
     * Called when an error occurred during the JSON RPC method call.
     * Do not throw an exception within this method
     *
     * @returns {void}
     */
    protected JsonRpcErrorListener(message: string, data: unknown): void {
    }

    /**
     * Starts listening for RPC requests
     */
    async listen(port?: number) {
        this.addRPCMethods();
        switch(typeof port) {
            case "undefined": {
                port = this.mListeningPort;
                break;
            }
        }
        this.onBeforeListening();
        this.mServer = this.mExpressServer.listen(port, this.mListeningHost, () => {
            this.log(`Listening on port: ${port}`);
        });
        this.mHttpTerminator = createHttpTerminator({ server: this.mServer });
        await this.waitForServerListening();
    }

    /**
     * Returns the path on which to listen to requests for. Override to listen on another path.
     *
     * @returns {string} path on which to listen to requests for
     */
    get listeningPath(): string {
        return "/json-rpc/";
    }

    protected log(...data: any[]): void;
    protected log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    /**
     * Displays the JSON RPC methods being listened to
     */
    protected logListeningMethods(methods: SimpleJSONRPCMethod<void>[]) {
        this.log("Listening for these JSON RPC methods:")
        for(const method of methods) {
            this.log(method.name);
        }
    }

    /**
     * Called before every valid JSON body is dispatched, this doesn't mean that the request is a valid JSON RPC call though.
     * If the request is valid, the method should call next(request, serverParams) and return its result.
     * If the request is invalid, it should throw an appropriate error.
     *
     * @returns {JSONRPCResponsePromise}
     */
    protected onBeforeDispatchRequest(next: JSONRPCServerMiddlewareNext<void>, request: JSONRPCRequest, serverParams: void | undefined): JSONRPCResponsePromise {
        switch(typeof request.method) {
            case CString: {
                return next(request, serverParams);
            }
            default: {
                throw this.createInvalidRequestResponse(request);
            }
        }
    }

    /**
     * This is called before the JSON RPC server starts listening on the port
     * Override this, for example, to listen just on IPv4 by calling dns.setDefaultResultOrder('ipv4first');
     */
    protected onBeforeListening() {
    }

    /**
     * Called when there's a parsing error. The overridden method should create a JSON RPC Error response and
     * send it using response.send(err_response)
     * If the error is not handled, this class will return an error
     *
     * @returns {void}
     */
    protected onParseError(err: any, request: Request, response: TSendHandler) {
    }

    /**
     * Creates an Invalid Request JSON RPC Error exception and sends it.
     *
     * @returns {} 
     */
    protected sendInvalidRequest(data?: any) {
        const error = this.createInvalidRequest(data);
        this.mResponse?.send(error);
    }

    /**
     * Creates an Invalid Params JSON RPC Error exception and sends it.
     *
     * @returns {} 
     */
    protected sendInvalidParams(data?: any): void {
        const error = this.createInvalidParams(data);
        this.mResponse?.send(error);
    }

    /**
     * Stops the RPC server. This can be called by a RPC call or by the app itself
     */
    async stop() {
        await this.stopListening();
        this.log("Stop listening...");
    }

    protected async stopListening() {
        await this.mHttpTerminator?.terminate();
        this.mServer!.close();
        await this.waitForServerStopListening();
    };

    /**
     * Waits for the server to starts listening before returning.
     * Override to disable this
     */
    protected async waitForServerListening(): Promise<void> {
        let listenAddr: ListenAddr = null;
        do {
            listenAddr = this.mServer!.address();
            await sleep(100);
        } while (listenAddr === null);
    }

    protected async waitForServerStopListening() {
        let listenAddr: ListenAddr = null;
        do {
            listenAddr = this.mServer!.address();
            if (listenAddr !== null) {
                await sleep(100);
            }
        } while (listenAddr !== null);
    }

    echo(params: JSONRPCParameters) {
        return params;
    }

}

export {
    BaseJsonRpcServer,
    SimpleJSONRPCMethod,
    Request,
    Response,
    createJSONRPCErrorResponse, isJSONRPCID,  
    JSONRPCErrorCode, JSONRPCErrorException, JSONRPC, JSONRPCClient, JSONRPCParams,
    JSONRPCRequest, JSONRPCResponsePromise, JSONRPCServer, JSONRPCServerMiddlewareNext, 
    JSONRPCParameters,
    SEntityParseFailed,
    SInvalidParams,
    SInvalidRequest,
    SMethodNotFound,
    SParseError,
    CNoContent
}














































































































































































































































































/*
Chee-Wee Chua,
Nov 2022,
Singapore
*/
