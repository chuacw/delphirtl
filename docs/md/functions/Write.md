[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Write

# Function: Write()

> **Write**(`outFile`?, ...`arg`?): `void`

Writes to a text file.

Writeln is an extension of the Write procedure, as it is defined for text files.

The syntax shown here for the Writeln procedure is illustrates that WriteLn can take a variable number of arguments.

After executing Write, Writeln writes an end-of-line marker (line feed or carriage return/line feed) to the file.

If F is omitted, the global variable Output is used to access the processed standard input file.

## Parameters

• **outFile?**: `any`

optional output file, otherwise uses standard output

• ...**arg?**: `any`

any number of arguments to write

## Returns

`void`

## Defined in

[src/rtl.ts:243](https://github.com/chuacw/delphirtl/blob/fec3f5d663dd7c36654525a8693564dece7e3b0d/src/rtl.ts#L243)
