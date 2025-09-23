import { ParamCount, ParamStr, Sleep, sLineBreak, Write, WriteLn } from "../src/rtl";

function clearArgv() {
    while (process.argv.length > 0) process.argv.pop();
}

describe('testing rtl', () => {
    const LScriptName = "myscriptname";
    test('ParamCount empty', () => {
        clearArgv();
        process.argv.push("node.exe"); process.argv.push(LScriptName);
        expect(ParamCount()).toEqual(0);
    });
    test('ParamCount 1', () => {
        clearArgv();
        process.argv.push("node.exe"); process.argv.push(LScriptName); process.argv.push("Param 1");
        expect(ParamCount()).toEqual(1);
    });

    test('ParamStr(0)', () => {
        clearArgv();
        process.argv.push("node.exe"); process.argv.push(LScriptName);
        expect(ParamStr(0)).toEqual(LScriptName);
    });

    test('ParamStr(1)', () => {
        clearArgv();
        const LParamStr1 = "ParamStr1";
        process.argv.push("node.exe"); process.argv.push(LScriptName); process.argv.push(LParamStr1);
        expect(ParamStr(1)).toEqual(LParamStr1);
    });

    let LSleepTime = 100;
    test(`Sleep ${LSleepTime}`, async () => {
        const startTime = new Date();
        await Sleep(LSleepTime);
        const endTime = new Date();
        // console.log(`time slept: ${LSleepTime}.`);
        const diffTime = endTime.getTime() - startTime.getTime();
        expect(diffTime).toBeGreaterThanOrEqual(LSleepTime);
    }, LSleepTime * 2);

});

// tests/sLineBreak.test.ts
describe('sLineBreak (cross-platform)', () => {
  const RTL = '../src/rtl';

  afterEach(() => {
    jest.resetModules();        // clear module cache so requiring reloads module code
    jest.restoreAllMocks();     // restore process.platform getter
  });

  test('returns \\r\\n when platform is win32', () => {
    // mock process.platform to return 'win32'
    Object.defineProperty(process, 'platform', {
      value: 'win32',
      configurable: true,
    });

    // require after mocking so module computes sLineBreak with mocked platform
    const { sLineBreak } = require(RTL);
    expect(sLineBreak).toBe('\r\n');
  });

  test('returns \\n when platform is non-windows', () => {
    // mock process.platform to return 'linux'
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true,
    });
    const { sLineBreak } = require(RTL);
    expect(sLineBreak).toBe('\n');
  });
});

describe('testing Write/WriteLn', () => {
    function captureStdout(fn: () => void): string {
        let buffer = "";
        const orig = process.stdout.write;

        (process.stdout as any).write = (chunk: any, encoding?: any, cb?: any) => {
            buffer += chunk.toString();
            if (cb) cb();
            return true;
        };

        try {
            fn();
        } finally {
            process.stdout.write = orig;
        }

        return buffer;
    }    

    test('Write no args', () => {
        let out = captureStdout(() => {
            Write();
        });
        expect(out).toEqual('');
    });

    test('WriteLn no args', () => {
        let out = captureStdout(() => {
            WriteLn();
        });
        expect(out).toEqual(sLineBreak);
    });

    test('Write single string', () => {
        let out = captureStdout(() => {
            Write('hey');
        });
        expect(out).toEqual('hey');
    });

    test('WriteLn single string', () => {
        let out = captureStdout(() => {
            WriteLn('hello there');
        });
        expect(out).toEqual('hello there'+sLineBreak);
    });

});
