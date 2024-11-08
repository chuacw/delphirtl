[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / TMessageManager

# Class: TMessageManager

## Constructors

### new TMessageManager()

> **new TMessageManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:52](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L52)

## Methods

### disableType()

> **disableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:63](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L63)

***

### enableType()

> **enableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:68](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L68)

***

### ensureTypeEnabled()

> **ensureTypeEnabled**(`aSuffix`): `void`

#### Parameters

• **aSuffix**: `string`

#### Returns

`void`

#### Defined in

[src/messaging.ts:81](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L81)

***

### reset()

> **reset**(): `void`

#### Returns

`void`

#### Defined in

[src/messaging.ts:56](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L56)

***

### sendMessage()

> **sendMessage**\<`T`\>(`aClass`, `aMessage`): `void`

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessage**: `T`

#### Returns

`void`

#### Defined in

[src/messaging.ts:101](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L101)

***

### sendWrappedMessage()

> **sendWrappedMessage**\<`T`\>(`aClass`, `aMessage`): `void`

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessage**: [`TMessage`](TMessage.md)\<`T`\>

#### Returns

`void`

#### Defined in

[src/messaging.ts:141](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L141)

***

### subscribeToMessage()

> **subscribeToMessage**\<`T`\>(`aClass`, `aMessageListener`): `number`

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessageListener**

#### Returns

`number`

#### Defined in

[src/messaging.ts:116](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L116)

***

### subscribeToWrappedMessage()

> **subscribeToWrappedMessage**\<`T`\>(`aClass`, `aMessageListener`): `number`

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessageListener**

#### Returns

`number`

#### Defined in

[src/messaging.ts:157](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L157)

***

### typesDisabled()

> **typesDisabled**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/messaging.ts:89](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L89)

***

### unsubscribe()

> **unsubscribe**(`aClass`, `aSubscriptionIndex`): `void`

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:129](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L129)

***

### unsubscribeWrappedMessage()

> **unsubscribeWrappedMessage**(`aClass`, `aSubscriptionIndex`): `void`

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:170](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L170)

***

### getDefaultManager()

> `static` **getDefaultManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:93](https://github.com/chuacw/delphirtl/blob/b3907023d1eb39f3475defc4550602b3d9c50b9d/src/messaging.ts#L93)
