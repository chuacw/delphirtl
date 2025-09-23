import assert = require("assert");
import './dateutils'; // Import all the prototypes into delphirtl

/**
 * Declares a type that extracts common properties or methods of two classes.
 * Usage: "type CommonType = CommonMethodsOrProperties<ClassA, ClassB>;"
 * To use on multiple classes, nest the definitions: "CommonMethodsOrProperties<ClassA, CommonMethodsOrProperties<ClassB, ClassC>>;"
 *
 * @type {CommonMethodsOrProperties}
 * @template A extends {}
 * @template B extends {}
 * @category RTL
 */
type CommonMethodsOrProperties<A extends {}, B extends {}> = {
    [P in keyof A & keyof B]: A[P] | B[P];
}

/**
 * Gets the process arguments
 *
 * @returns {string[]}
 * @category RTL
 */
function getProcessArgs(): string[] {
    const result = process.argv.slice(1);
    return result;
}

/**
 * Returns true if the named method exists as a function on the constructor's prototype
 * or on the given instance.
 *
 * This helper is useful for checking prototype-augmented methods added at runtime.
 */
function hasPrototypeMethodFromConstructor(constructorFn: Function, name: string): boolean {
    if (!constructorFn || typeof constructorFn !== 'function') return false;
    return typeof (constructorFn as any).prototype?.[name] === 'function';
}

function hasInstanceMethod(instance: unknown, name: string): boolean {
    if (!instance || typeof instance !== 'object') return false;
    return typeof (instance as any)[name] === 'function';
}

/**
 * Returns the number of parameters passed to the app
 *
 * @returns {number}
 * @category RTL
 */
function ParamCount(): number {
    const processArgs = getProcessArgs();
    return processArgs.length - 1;
}

/**
 * Returns the index'th argument passed to the app
 *
 * @param {number} index
 * @returns {string}
 * @category RTL
 */
function ParamStr(index: number): string {
    assert(index >= 0);
    const processArgs = getProcessArgs();
    if (index < 0) {
        return "";
    } else {
        return processArgs[index];
    }
}

/**
 * 
 * @returns the launcher, ie, node.exe or something that can run Javascript...
 * @category RTL
 */
function getLauncher(): string {
    const result = process.argv[0];
    return result;
}

/**
 * Sleeps for the specified number of millisecs.
 *
 * @async
 * @param {number} ms number of ms to sleep
 * @returns {unknown}
 * @category RTL
 */
async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Used for ignoring any unused types, variables, so that the compiler doesn't complain.
 *
 * @param {...*} x any number of parameters to ignore
 * @category RTL
 */
function UNUSED(...x: any) { }

export {
    hasInstanceMethod, hasPrototypeMethodFromConstructor,
    ParamCount, ParamCount as getParamCount,
    ParamStr, ParamStr as getParamStr,
    sleep, sleep as Sleep,
    CommonMethodsOrProperties,
    UNUSED, getLauncher
}
