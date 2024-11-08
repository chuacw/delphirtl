[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / ExtractFileName

# Function: ExtractFileName()

> **ExtractFileName**(`AFileName`): `string`

Extracts the name and extension parts of a file name.

The resulting string is the rightmost characters of FileName, starting with the first character after the colon or backslash that separates the path information from the name and extension. The resulting string is equal to FileName, if FileName contains no drive and directory parts.

## Parameters

• **AFileName**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:73](https://github.com/chuacw/delphirtl/blob/9d3905248e31f9e407f7d93f22a1ad9ed76c2b79/src/sysutils.ts#L73)
