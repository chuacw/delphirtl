import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { JSONRPCParams } from 'json-rpc-2.0';
import { JSONRPC, JSONRPCClient, JSONRPCErrorCode, TestJsonRpcServer } from './TestJsonRpcServer';

const timeout = 100_000;
const port = 8081;

/** 
* This is a debug class that shows the incoming and outgoing JSON requests.
* To view debug output, set outputEnabled to true 
*/
class Debug {

  static outputEnabled = false;
  static Out(jsonBody: any) {
    if (Debug.outputEnabled) console.debug(`--> ${jsonBody}`);
  }

  static In(jsonBody: any) {
    if (Debug.outputEnabled) console.debug(`<-- ${JSON.stringify(jsonBody)}`);
  }

}

class RPCID {
  static jsonRPCID = 1;
  static createRPCID() {
    return RPCID.jsonRPCID++;
  }
}

function compareObject(obj1: any, obj2: any): boolean {
  let result = true;
  for (const key of Object.keys(obj1)) {
    if (!result) {
      return result;
    }
    const keyValue = obj1[key];
    if (typeof keyValue === "object") {
      if (key in obj2) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        // if ((value1 === null) && (value2 === null)) {
        //   result = result && true;
        // } else {
        //   result = result && compareObject(value1, value2);
        // }
        if (!((value1 === null) && (value2 === null))) {
          result = result && compareObject(value1, value2);
        }
      }
    } else {
      const value1 = obj1[key];
      if (key in obj2) {
        const value2 = obj2[key];
        result = result && (value1 === value2);
      } else {
        result = false;
        return result;
      }
    }
  }
  return result;
}

function compareArray(a1: any[], a2: any[]): boolean {
  if (a1.length != a2.length) {
    return false;
  }
  let result = true;
  for (let i = 0; i < a1.length; i++) {
    if (!result) {
      return result;
    }
    if ((typeof a1[i] === "object") && (typeof a2[i] === "object")) {
      result = result && compareObject(a1[i], a2[i]);
    } else {
      result = result && (a1[i] === a2[i]);
    }
  }
  return result;
}

const enum SendType {
  sendDirect,
  sendStringify,
  // newSendType // try uncommenting this to see an error
}

function customJSONClient(aSendType: SendType) {
  let rpcClientCallbatch: JSONRPCClient;
  rpcClientCallbatch = new JSONRPCClient((jsonRPCRequest) => {
    let jsonBody;
    switch (aSendType) {
      case SendType.sendDirect: {
        jsonBody = jsonRPCRequest;
        break;
      }
      case SendType.sendStringify: {
        jsonBody = JSON.stringify(jsonRPCRequest);
        break;
      }
      default: {
        // Any new enum that's declared but not handled above will show an error here
        const exhaustiveCheck: never = aSendType;
        throw new Error(exhaustiveCheck);
      }
    }
    Debug.Out(jsonBody);
    const result = fetch(`http://localhost:${port}/test-rpc/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: jsonBody,
    }).then(async (response) => {
      if (response.status === 200) {
        // Use client.receive when you received a JSON-RPC response.
        const result = response.json().then((jsonRPCResponse) => {
          // console.debug(`<-- ${JSON.stringify(jsonRPCResponse)}`);
          Debug.In(jsonRPCResponse);
          // return rpcClientCallbatch.receive(jsonRPCResponse);
          return jsonRPCResponse;
        });
        return result;
      } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
      }
    });
    return result;
  }, RPCID.createRPCID);
  return rpcClientCallbatch;
}

const echo = async(rpcClient: JSONRPCClient, params: JSONRPCParams) => {
  const result = await rpcClient.request("echo", params);
  expect(result).toEqual(params);
};


describe('JSON RPC 2.0 spec', () => {
  let rpcServer: TestJsonRpcServer;
  let rpcClient: JSONRPCClient;
  beforeEach(async() => {
    rpcServer = new TestJsonRpcServer();
    await rpcServer.listen(port);

    rpcClient = new JSONRPCClient((jsonRPCRequest) => {
      const jsonBody = JSON.stringify(jsonRPCRequest);
      Debug.Out(jsonBody);
      const result = fetch(`http://localhost:${port}/test-rpc/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: jsonBody,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
            .then((jsonRPCResponse) => {
              Debug.In(jsonRPCResponse);
              rpcClient.receive(jsonRPCResponse);
            });
        } else if (jsonRPCRequest.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
      });
      return result;
    }, RPCID.createRPCID);
  }, timeout);

  afterEach(async() => {
    await rpcServer.stop();
  }, timeout);


  it('RPC call with no name', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send("");

    expect(compareObject(result, {
      id: null,
      jsonrpc: JSONRPC,
      error: {
        code: JSONRPCErrorCode.InvalidRequest,
        message: "Invalid Request"
      }
    })).toEqual(true);

  }, timeout);

  it('RPC call with positional parameters 01: subtract [42, 23]', async() => {
    const result = await rpcClient.request("subtract", [42, 23]);
    expect(result).toBe(19);
  }, timeout);

  it('RPC call with positional parameters 02: subtract [23, 42]', async() => {
    const result = await rpcClient.request("subtract", [23, 42]);
    expect(result).toBe(-19);
  }, timeout);

  it('RPC call with named parameters 01: subtract {"subtrahend": 23, "minuend": 42}', async() => {
    const result = await rpcClient.request("subtract", { "subtrahend": 23, "minuend": 42 });
    expect(result).toBe(19);
  }, timeout);

  it('RPC call with named parameters 02: subtract {"minuend": 42, "subtrahend": 23}', async() => {
    const result = await rpcClient.request("subtract", { "minuend": 42, "subtrahend": 23 });
    expect(result).toBe(19);
  }, timeout);

  it('RPC notify update has no return', async() => {
    const result = await rpcClient.request("update", [1, 2, 3, 4, 5]);
    expect(result).toBe(null);
  }, timeout);

  it('RPC notify foobar has no return', async() => {
    // any notification, requests without id should return null
    const result = await rpcClient.request("foobar");
    expect(result).toBe(null);
  }, timeout);

  it('RPC call of non-existent method', async() => {
    await expect(async() => {
      const result = await rpcClient.request("nofoobar");
    }).rejects.toThrow("Method not found");
  }, timeout);

  it('RPC call with invalid JSON', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`{"jsonrpc": "2.0", "method": "foobar, "params": "bar", "baz]`);

    expect(compareObject(result, {
      id: null,
      jsonrpc: JSONRPC,
      error: {
        code: JSONRPCErrorCode.ParseError,
        message: "Parse error"
      }
    })).toEqual(true);

  }, timeout);

  it('RPC call with invalid Request object', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`{"jsonrpc": "2.0", "method": 1, "params": "bar"}`);
    expect(compareObject(result, {
      jsonrpc: JSONRPC, error: { code: -32600, message: "Invalid Request" }, id: null
    })).toEqual(true);
  }, timeout);

  it('RPC call batch, invalid JSON', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`[
      {"jsonrpc": "2.0", "method": "sum", "params": [1,2,4], "id": "1"},
      {"jsonrpc": "2.0", "method"
    ]`);

    expect(compareObject(result, {
      id: null,
      jsonrpc: JSONRPC,
      error: {
        code: JSONRPCErrorCode.ParseError,
        message: "Parse error"
      }
    })).toEqual(true);

  }, timeout);

  it('RPC call with an empty array', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`[]`);

    expect(compareObject(result, {
      id: null,
      jsonrpc: JSONRPC,
      error: {
        code: JSONRPCErrorCode.InvalidRequest,
        message: "Invalid Request"
      }
    })).toEqual(true);

  }, timeout);

  it('RPC call with an invalid batch (but not empty)', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`[1]`);

    expect(compareObject(result, {
      id: null,
      jsonrpc: JSONRPC,
      error: {
        code: JSONRPCErrorCode.InvalidRequest,
        message: "Invalid Request"
      }
    })).toEqual(true);

  }, timeout);

  it('RPC call with invalid batch', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendDirect);
    const result = await rpcClientCallbatch.send(`[1,2,3]`);

    const expectedResult = [
      {
        id: null,
        jsonrpc: JSONRPC,
        error: {
          code: JSONRPCErrorCode.InvalidRequest,
          message: "Invalid Request"
        }
      },
      {
        id: null,
        jsonrpc: JSONRPC,
        error: {
          code: JSONRPCErrorCode.InvalidRequest,
          message: "Invalid Request"
        }
      },
      {
        id: null,
        jsonrpc: JSONRPC,
        error: {
          code: JSONRPCErrorCode.InvalidRequest,
          message: "Invalid Request"
        }
      }
    ];
    // expect(compareArray(result as unknown as any[], expectedResult)).toEqual(true);
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  }, timeout);

  it('RPC call batch', async() => {
    const rpcClientCallbatch = customJSONClient(SendType.sendStringify);
    const id1 = 1; const id2 = 2; const id5 = 5; const id9 = 9;
    const result = await rpcClientCallbatch.send(
      [
        { jsonrpc: JSONRPC, method: "sum", params: [1, 2, 4], id: id1 },
        { jsonrpc: JSONRPC, method: "notify_hello", params: [7] },
        { jsonrpc: JSONRPC, method: "subtract", params: [42, 23], id: id2 },
        { "foo": "boo" },
        { jsonrpc: JSONRPC, method: "foo.get", params: { "name": "myself" }, id: id5 },
        { jsonrpc: JSONRPC, method: "get_data", "id": id9 }
      ]
    );
    expect(result).toEqual(expect.arrayContaining([
      { jsonrpc: JSONRPC, id: id1, result: 7 },
      { jsonrpc: JSONRPC, id: id2, result: 19 },
      {
        jsonrpc: JSONRPC, id: null, error: {
          code: JSONRPCErrorCode.InvalidRequest,
          message: 'Invalid Request'
        }
      },
      {
        jsonrpc: JSONRPC, id: id5, error: {
          code: JSONRPCErrorCode.MethodNotFound,
          message: 'Method not found'
        }
      },
      { jsonrpc: JSONRPC, id: id9, result: ["hello", 5] }
    ]));
  }, timeout);

  it('RPC call batch (all notifications)', async() => {
    const result = await rpcClient.requestAdvanced([
      { jsonrpc: JSONRPC, method: "notify_sum", params: [1, 2, 4] },
      { jsonrpc: JSONRPC, method: "notify_hello", params: [7] }
    ]);
    expect(result).toEqual(expect.arrayContaining([]));
  }, timeout);

  it('Echoes back parameters 1', async() => {
    await echo(rpcClient, [1]);
  }, timeout);

  it('Echoes back parameters 2', async() => {
    await echo(rpcClient, [2]);
  }, timeout);

  it("Any notification returns null", async() => {
    // A notification is one without the ID
    const result = await rpcClient.notify("anything");
    expect(result).toBe(undefined);
  }, timeout);

});


















































































































































































































































































/*
Chee-Wee Chua,
Nov 2022,
Singapore
*/
