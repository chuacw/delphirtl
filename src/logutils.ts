function log(message?: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
}

function info(message?: any, ...optionalParams: any[]) {
    console.info(message, optionalParams);
}

function error(message?: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
}

export {
    info, error, log
}