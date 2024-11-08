/**
 * Description placeholder
 *
 * @param {?*} [message]
 * @param {...any[]} optionalParams
 * @category Log
 */
function log(message?: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
}

/**
 * Description placeholder
 *
 * @param {?*} [message]
 * @param {...any[]} optionalParams
 * @category Log
 */
function info(message?: any, ...optionalParams: any[]) {
    console.info(message, optionalParams);
}

/**
 * Description placeholder
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