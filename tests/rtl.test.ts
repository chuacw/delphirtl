import { ParamCount, ParamStr, Sleep } from "../src/rtl";

function clearArgv() {
    while (process.argv.length>0) process.argv.pop();
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
    });
});
