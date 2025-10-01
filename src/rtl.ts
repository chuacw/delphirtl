import assert = require("assert");
import './dateutils'; // Import all the prototypes into delphirtl

/**
 * Implements Delphi TObject semantics where you have to call .Free() to destroy the object.
 * Has AfterConstruction and BeforeDestruction methods, which can be overridden.
 *
 * @category RTL
 */
class TObject {

    private _isDestroyed: boolean = false;

    /**
     * performs cleanup tasks and destroys the object
     */
    public destroy(): void {
        if (this._isDestroyed) return;
        this.BeforeDestruction();
        // place future destruction code below

        // end destruction code above
        this._isDestroyed = true;
    }
    public Destroy(): void { this.destroy(); }

    /**
     * Calls destroy to perform any cleanup tasks. Call Free() to destroy the object, so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.
     */
    public free() {
        this.destroy();
    }

    /**
     * Destroys the object, maintaining Delphi-style AfterConstruction and BeforeDestruction semantics.
     */
    public Free() {
        this.free();
    }

    /**
     * Creates a new instance of the class. To create a new constructor, declare the constructor(args) method
     * and call the super constructor. Then, to instantiate the class, call YourClass.Create(args) instead of new YourClass(args),
     * so as to retain Delphi-style AfterConstruction and BeforeDestruction semantics.
     *
     * @param args
     * @constructor
     */
    static Create<T extends TObject>(this: new (...args: any[]) => T, ...args: any[]): T {
        const instance = new this(...args);

        if (instance.AfterConstruction && typeof instance.AfterConstruction === 'function') {
            instance.AfterConstruction();
        }

        return instance;
    }

    /**
     * Responds after the last constructor has executed.
     *
     * AfterConstruction is called automatically after the object's last constructor has executed. Do not call it explicitly in your applications.
     *
     * The AfterConstruction method implemented in TObject does nothing. Override this method when creating a class that performs an action after the object is created.
     */
    public AfterConstruction(): void { }

    /**
     * Responds before the first destructor executes.
     *
     * BeforeDestruction is called automatically before the object's first destructor executes. Do not call it explicitly in your applications.
     *
     * The BeforeDestruction method implemented in TObject does nothing. Override this method when creating a class that performs an action before the object is destroyed.
     */
    public BeforeDestruction(): void { }
}

const sLineBreak = process.platform === 'win32' ? '\r\n' : '\n';

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
function getParamCount(): number {
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
    // Ensure we do not resolve earlier than requested due to timer rounding
    const delay = Math.max(0, Math.ceil(ms));
    return new Promise(resolve => setTimeout(resolve, delay + 1));
}

/**
 * Used for ignoring any unused types, variables, so that the compiler doesn't complain.
 *
 * @param {...*} x any number of parameters to ignore
 * @category RTL
 */
function UNUSED(...x: any) { }

const fs = require('fs');

class TextFile {
    filename: string | null;
    stream: any;
    mode: string | null;

    constructor() {
        this.filename = null;
        this.stream = null;
        this.mode = null;
    }

    open(mode: "w" | "a" = "w") {
        if (!this.filename) throw new Error("Filename not assigned");
        this.mode = mode;

        // Treat Delphi pseudo-filenames for console specially:
        if (this.filename === 'CONOUT$') {
            // use process.stdout as the stream
            this.stream = process.stdout;
            return;
        }

        if (mode === "w") {
            fs.writeFileSync(this.filename, ""); // truncate/create
        } else {
            // mode 'a': create if not exists
            if (!fs.existsSync(this.filename)) fs.writeFileSync(this.filename, "");
        }
    }

    write(text: string) {
        if (!this.mode) throw new Error("File not opened");
        if (this.stream) {
            // process.stdout (a Writable) accepts strings
            this.stream.write(text);
            return;
        }
        if (this.mode === "w") {
            fs.appendFileSync(this.filename!, text);
        } else if (this.mode === "a") {
            fs.appendFileSync(this.filename!, text);
        }
    }

    writelnText(text: string) {
        this.write(text + sLineBreak);
    }

    close() {
        if (this.stream) {
            // Do not end process.stdout, otherwise, future writes in the same process will fail
            if (this.stream !== process.stdout) {
                this.stream.end();
            }
            this.stream = null;
        }
        this.filename = null;
        this.mode = null;
    }
}

// Delphi-style functions

/**
 * Associates the name of an external file with a file class
 * 
 * @param {TextFile} outFile
 * @param {string} filename
 * @returns {void}
 * @category RTL
 */
function AssignFile(outFile: TextFile, filename: string) {
    if (!(outFile instanceof TextFile)) throw new TypeError('First arg must be TextFile');
    outFile.filename = filename;
}

/**
 * Creates a new file and opens it. 
 * 
 * @param {TextFile} outFile
 * @returns {void}
 * @category RTL
 */
function Rewrite(outFile: TextFile | any) {
    if (!(outFile instanceof TextFile)) throw new TypeError('RewriteFile expects a TextFile');
    outFile.open('w');
}

/**
 * Prepares an existing file for adding text to the end. 
 * 
 * @param {TextFile} outFile
 * @returns {void}
 * @category RTL
 */
function Append(outFile: TextFile) {
    if (!(outFile instanceof TextFile)) throw new TypeError('Append expects a TextFile');
    outFile.open('a');
}


/**
 * Terminates the association between a file variable and an external disk file. 
 * 
 * @param {TextFile} outFile
 * @returns {void}
 * @category RTL
 */
function CloseFile(outFile: TextFile | any) {
    if (!(outFile instanceof TextFile)) throw new TypeError('CloseFile expects a TextFile');
    outFile.close();
}

function concatArgs(args: IArguments, startIndex = 0) {
    return Array.prototype.slice.call(args, startIndex).map(x => {
        if (x === null || x === undefined) return '';
        return typeof x === 'object' ? JSON.stringify(x) : String(x);
    }).join('');
}

/**
 * 
 * Writes to a text file.
 *
 * Writeln is an extension of the Write procedure, as it is defined for text files.
 * 
 * The syntax shown here for the Writeln procedure is illustrates that WriteLn can take a variable number of arguments.
 * 
 * After executing Write, Writeln writes an end-of-line marker (line feed or carriage return/line feed) to the file.
 * 
 * If F is omitted, the global variable Output is used to access the processed standard input file.
 * 
 * @param {TextFile} outFile optional output file, otherwise uses standard output
 * @param {...*} arg any number of arguments to write
 * @returns {void}
 * @category RTL
 */
function Write(outFile?: TextFile | any, ...arg: any/* args */) {
    const args = arguments;
    if (args.length === 0) return;
    const first = args[0];
    if (first instanceof TextFile) {
        const text = concatArgs(args, 1);
        if (text.length) first.write(text);
    } else {
        const text = concatArgs(args, 0);
        process.stdout.write(text);
    }
}

/**
 * 
 * Writes to a text file and adds an end-of-line marker.
 *
 * Writeln is an extension of the Write procedure, as it is defined for text files.
 * 
 * The syntax shown here for the Writeln procedure is illustrates that WriteLn can take a variable number of arguments.
 * 
 * After executing Write, Writeln writes an end-of-line marker (line feed or carriage return/line feed) to the file.
 * 
 * If F is omitted, the global variable Output is used to access the processed standard input file.
 * 
 * @param {TextFile} outFile optional output file, otherwise uses standard output
 * @param {...*} arg any number of arguments to write
 * @returns {void}
 * @category RTL
 */
function WriteLn(outFile?: TextFile | any, ...arg: any/* args */) {
    const args = arguments;
    if (args.length > 0 && args[0] instanceof TextFile) {
        // Pass OutputFile + all args + newline as one string to Write
        const file = args[0] as TextFile;
        const text = concatArgs(args, 1) + sLineBreak;
        Write(file, text);
    } else {
        const text = concatArgs(args, 0) + sLineBreak;
        Write(text);
    }
}

/*
 * Halts the program with the given code and returns control to the operating system.
 *
 * @returns {void}
 * @category RTL
 */
function Halt(code?: number): never {
    process.exit(code);
}

/*
 * Specifies a write-only text file associated with the process's standard output file. 
 * @category RTL
 */
const Output: TextFile = new TextFile();
AssignFile(Output, 'CONOUT$');
Rewrite(Output);

// Define ParamCount, and this is a run-time definition
Object.defineProperty(exports, 'ParamCount', {
  get(): number { 
    const processArgs = getProcessArgs();
    return processArgs.length - 1;
  },
  enumerable: true
});

// declare that ParamCount is a number for TypeScript checking purpose,
// this is a compile-time declaration and has no runtime effect
/**
 * ParamCount returns the number of parameters passed to the program on the command line. Separate parameters with spaces or tabs.
 * 
 * @returns {number} the number of parameters passed on the command line. 
 * @category RTL
 */
// noinspection JSUnusedGlobalSymbols
export declare const ParamCount: number;

export {
    hasInstanceMethod, hasPrototypeMethodFromConstructor,
    getParamCount,
    CommonMethodsOrProperties,
    UNUSED, getLauncher,

    TObject,
    sleep, sleep as Sleep, sLineBreak,
    ParamStr, ParamStr as getParamStr,
    TextFile, AssignFile, AssignFile as Assign, Append,
    CloseFile, CloseFile as Close, Output, Rewrite,
    Write, WriteLn, Halt
}
