function getProcessArgs(): string[] {
    let result = process.argv.slice(1);
    return result;
}

function ParamCount(): number {
    let processArgs = getProcessArgs();
    return processArgs.length-1;
}

function ParamStr(index: number): string {
    let processArgs = getProcessArgs();
    if (index < 0) {
        return "";
    } else {
        return processArgs[index];
    }
}

export {
    ParamCount,
    ParamStr,
    ParamCount as getParamCount,
    ParamStr as getParamStr
}
