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

[src/rtl.ts:37](https://github.com/chuacw/delphirtl/blob/fec3f5d663dd7c36654525a8693564dece7e3b0d/src/rtl.ts#L37)
