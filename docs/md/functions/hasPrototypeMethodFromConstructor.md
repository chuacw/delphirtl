[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / hasPrototypeMethodFromConstructor

# Function: hasPrototypeMethodFromConstructor()

> **hasPrototypeMethodFromConstructor**(`constructorFn`, `name`): `boolean`

Returns true if the named method exists as a function on the constructor's prototype
or on the given instance.

This helper is useful for checking prototype-augmented methods added at runtime.

## Parameters

• **constructorFn**: `Function`

• **name**: `string`

## Returns

`boolean`

## Defined in

[src/rtl.ts:37](https://github.com/chuacw/delphirtl/blob/01752da42abbae178d000244800240d96a86d86e/src/rtl.ts#L37)
