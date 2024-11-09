/**
 * Logs the given message to the console
 *
 * @param {?*} [message]
 * @param {...any[]} optionalParams
 * @category Log
 */
function log(message?: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
}

/**
 * Logs the given message to the console's info
 *
 * @param {?*} [message]
 * @param {...any[]} optionalParams
 * @category Log
 */
function info(message?: any, ...optionalParams: any[]) {
    console.info(message, optionalParams);
}

/**
 * Logs the given message to the console's error
 *
 * @param {?*} [message]
 * @param {...any[]} optionalParams
 * @category Log
 */
function error(message?: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
}

export {
    info, error, log
}