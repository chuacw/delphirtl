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

[src/rtl.ts:89](https://github.com/chuacw/delphirtl/blob/05c2ea653decdb53a49ed6866b6aa0d956ef8b01/src/rtl.ts#L89)
