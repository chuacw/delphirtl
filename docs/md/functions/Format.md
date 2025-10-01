[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / Format

# Function: Format()

> **Format**(`fmt`, `args`): `string`

Delphi-style Format
Spec: "%" [index ":"] ["-"] [width] ["." prec] type
Note that: Index, width, and precision specifiers can be specified directly, using a decimal digit string (for example "%10d"), or indirectly, using an asterisk character (for example "%*.*f")

## Parameters

• **fmt**: `string`

• **args**: `FormatArg`[]

## Returns

`string`

(string) Formatted string

## Defined in

[src/sysutils.ts:547](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/sysutils.ts#L547)
