[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / ExtractFileDir

# Function: ExtractFileDir()

> **ExtractFileDir**(`AFileNameOrPath`): `string`

Extracts the drive and directory parts from AFileName.
Regardless of whether AFileName is a path or filename,
this routine returns the path up to the last path.sep
eg, AFileName contains K:\\Development\\TypeScript\\delphirtl\\tests
the result is K:\\Development\\TypeScript\\delphirtl

## Parameters

• **AFileNameOrPath**: `string`

## Returns

`string`

## Defined in

[src/sysutils.ts:269](https://github.com/chuacw/delphirtl/blob/b2d86277a5251f0037cf01044224c3e29dc4c6be/src/sysutils.ts#L269)
