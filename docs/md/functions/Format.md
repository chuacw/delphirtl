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

[src/sysutils.ts:547](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/sysutils.ts#L547)
