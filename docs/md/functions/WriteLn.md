[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / WriteLn

# Function: WriteLn()

> **WriteLn**(`outFile`?, ...`arg`?): `void`

Writes to a text file and adds an end-of-line marker.

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

[src/rtl.ts:274](https://github.com/chuacw/delphirtl/blob/1d6969b8a199060a984c4375d6be1f0ffa838be2/src/rtl.ts#L274)
