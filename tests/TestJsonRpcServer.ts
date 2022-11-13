import { isNumbers } from "./AssertionGuards";
import { 
    BaseJsonRpcServer, JSONRPC, JSONRPCClient, JSONRPCErrorCode, JSONRPCErrorException, JSONRPCParameters 
} from "../src/BaseJsonRpcServer";

class TestJsonRpcServer extends BaseJsonRpcServer {

    override get listeningPath(): string {
        return "/test-rpc/"
    }

    protected override log(message?: any, ...optionalParams: any[]) {
    }

    isSubtractObject(params: JSONRPCParameters): asserts params is { "subtrahend": number, "minuend": number } {
        if ((typeof params == "object") && ("subtrahend" in params) && ("minuend" in params)) {
            return;
        }
        throw new JSONRPCErrorException("Invalid params", JSONRPCErrorCode.InvalidParams);
    }

    override implementedRPCMethods() {
        return [
            this.subtract, this.update, this.foobar,
            this.notify_hello, this.notify_sum, this.sum,
            this.get_data, this.echo
        ];
    }

    subtract(params: JSONRPCParameters) {
        if (Array.isArray(params)) {
            isNumbers(params);
            const result = params[0] - params[1];
            return result;
        }
        this.isSubtractObject(params);
        const result = params.minuend - params.subtrahend;
        return result;
    }

    sum(params: JSONRPCParameters) {
        if (Array.isArray(params)) {
            isNumbers(params);
            let result = 0;
            for (const value of params) {
                result = result + value;
            }
            return result;
        }
    }

    get_data(params: JSONRPCParameters) {
        return ["hello", 5];
    }

    // notifications
    update(params: JSONRPCParameters) {
    }

    foobar(params: JSONRPCParameters) {
    }

    notify_sum(params: JSONRPCParameters) {
    }

    notify_hello(params: JSONRPCParameters) {
        this.log("notify_hello called");
    }
}

export {
    TestJsonRpcServer, JSONRPC, JSONRPCClient, JSONRPCErrorCode
}
