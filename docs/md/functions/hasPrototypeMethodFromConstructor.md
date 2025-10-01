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

[src/rtl.ts:111](https://github.com/chuacw/delphirtl/blob/d71b924f22790501bc0f05faa45f3a3158bae305/src/rtl.ts#L111)
