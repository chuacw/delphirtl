import assert from "assert";

function getProcessArgs(): string[] {
    let result = process.argv.slice(1);
    return result;
}

function ParamCount(): number {
    let processArgs = getProcessArgs();
    return processArgs.length-1;
}

function ParamStr(index: number): string {
    assert(index>=0);
    let processArgs = getProcessArgs();
    if (index < 0) {
        return "";
    } else {
        return processArgs[index];
    }
}

export {
    ParamCount, ParamCount as getParamCount,
    ParamStr, ParamStr as getParamStr
}
