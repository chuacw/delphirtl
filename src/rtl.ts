import assert = require("assert");
import './dateutils'; // Import all the prototypes into delphirtl

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

const fs = require('fs');

class OutputFile {
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
            this.stream.end();
            this.stream = null;
            this.mode = null;
        }
    }
}

// Delphi-style functions

/**
 * Associates the name of an external file with a file class
 * 
 * @param {OutputFile} ofile
 * @param {string} filename
 * @returns {void}
 * @category RTL
 */
function AssignFile(ofile: OutputFile, filename: string) {
    if (!(ofile instanceof OutputFile)) throw new TypeError('First arg must be OutputFile');
    ofile.filename = filename;
}

/**
 * Creates a new file and opens it. 
 * 
 * @param {OutputFile} ofile
 * @returns {void}
 * @category RTL
 */
function Rewrite(ofile: OutputFile | any) {
    if (!(ofile instanceof OutputFile)) throw new TypeError('RewriteFile expects an OutputFile');
    ofile.open('w');
}

/**
 * Prepares an existing file for adding text to the end. 
 * 
 * @param {OutputFile} ofile
 * @returns {void}
 * @category RTL
 */
function Append(ofile: OutputFile) {
    if (!(ofile instanceof OutputFile)) throw new TypeError('Append expects an OutputFile');
    ofile.open('a');
}


/**
 * Terminates the association between a file variable and an external disk file. 
 * 
 * @param {OutputFile} ofile
 * @returns {void}
 * @category RTL
 */
function CloseFile(ofile: OutputFile | any) {
    if (!(ofile instanceof OutputFile)) throw new TypeError('CloseFile expects an OutputFile');
    ofile.close();
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
 * @param {OutputFile} outFile
 * @param {...*} arg any number of arguments to write
 * @returns {void}
 * @category RTL
 */
function Write(outFile?: OutputFile | any, arg?: any/* args */) {
    const args = arguments;
    if (args.length === 0) return;
    const first = args[0];
    if (first instanceof OutputFile) {
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
 * @param {OutputFile} outFile
 * @param {...*} arg any number of arguments to write
 * @returns {void}
 * @category RTL
 */
function WriteLn(outFile?: OutputFile | any, arg?: any/* args */) {
    const args = arguments;
    if (args.length > 0 && args[0] instanceof OutputFile) {
        // Pass OutputFile + all args + newline as one string to Write
        const file = args[0] as OutputFile;
        const text = concatArgs(args, 1) + sLineBreak;
        Write(file, text);
    } else {
        const text = concatArgs(args, 0) + sLineBreak;
        Write(text);
    }
}

/*
 * Halts the program with the given codeand returns control to the operating system.
 *
 * @returns {void}
 * @category RTL
 */
function Halt(code: number = 0): never {
    process.exit(code);
}

/*
 * Specifies a write-only text file associated with the process's standard output file. 
 * @category RTL
 */
const Output: OutputFile = new OutputFile();
AssignFile(Output, 'CONOUT$');
Rewrite(Output);

export {
    hasInstanceMethod, hasPrototypeMethodFromConstructor,
    ParamCount, ParamCount as getParamCount,
    ParamStr, ParamStr as getParamStr,
    sleep, sleep as Sleep, sLineBreak,
    CommonMethodsOrProperties,
    UNUSED, getLauncher,
    AssignFile, AssignFile as Assign, Append,
    CloseFile, CloseFile as Close, Output, Rewrite,
    Write, WriteLn, Halt
}

