import assert =  require("assert");

function getProcessArgs(): string[] {
    const result = process.argv.slice(1);
    return result;
}

function ParamCount(): number {
    const processArgs = getProcessArgs();
    return processArgs.length-1;
}

function ParamStr(index: number): string {
    assert(index>=0);
    const processArgs = getProcessArgs();
    if (index < 0) {
        return "";
    } else {
        return processArgs[index];
    }
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    ParamCount, ParamCount as getParamCount,
    ParamStr, ParamStr as getParamStr,
    sleep, sleep as Sleep
}
