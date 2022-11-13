import { array, number, assert } from "superstruct";
import { JSONRPCParameters, JSONRPCErrorCode, JSONRPCErrorException } from "../src/BaseJsonRpcServer";

function validateParams(params: JSONRPCParameters): asserts params is any[] {
    if (!Array.isArray(params) || params.length < 1) {
        throw new JSONRPCErrorException("Invalid parameter", JSONRPCErrorCode.InvalidParams);
    }
}

function validateArray(params: any): asserts params is any[] {
    if (!Array.isArray(params) || params.length === 0) {
        throw new JSONRPCErrorException("Invalid numbers array", JSONRPCErrorCode.InvalidParams);
    }
}

function isNumbers(params: JSONRPCParameters): asserts params is number[] {
    validateParams(params);
    const potentialNumbers = params;
    validateArray(potentialNumbers);
    for (const value of potentialNumbers) {
        if (!Number.isInteger(value)) {
            throw new JSONRPCErrorException("params doesn't contain an integer array!", JSONRPCErrorCode.InvalidParams);
        }
    }
}

function checkParams(params: JSONRPCParameters) {
    if (!Array.isArray(params) || params.length < 1) {
        throw new JSONRPCErrorException("Invalid parameter", JSONRPCErrorCode.InvalidParams);
    }
}

function numbers(params: JSONRPCParameters) {
    const IsNumbers = array(number());
    assert(params, IsNumbers);
}

export {
    validateParams,
    validateArray,
    isNumbers,
    checkParams,
    numbers
}