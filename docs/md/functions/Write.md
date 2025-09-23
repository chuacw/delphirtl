[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Write

# Function: Write()

> **Write**(`outFile`?, `arg`?): `void`

Writes to a text file.

Writeln is an extension of the Write procedure, as it is defined for text files.

The syntax shown here for the Writeln procedure is illustrates that WriteLn can take a variable number of arguments.

After executing Write, Writeln writes an end-of-line marker (line feed or carriage return/line feed) to the file.

If F is omitted, the global variable Output is used to access the processed standard input file.

## Parameters

• **outFile?**: `any`

• **arg?**: `any`

## Returns

`void`

## Defined in

[src/rtl.ts:194](https://github.com/chuacw/delphirtl/blob/df8a1102afe240ac0634e8cf60783cbd5a5ad06f/src/rtl.ts#L194)
