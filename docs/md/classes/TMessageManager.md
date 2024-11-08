[**delphirtl**](../README.md) • **Docs**

***

[delphirtl](../globals.md) / TMessageManager

# Class: TMessageManager

Description placeholder

 TMessageManager

## Constructors

### new TMessageManager()

> **new TMessageManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:124](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L124)

## Messaging

### sendMessage()

> **sendMessage**\<`T`\>(`aClass`, `aMessage`): `void`

Description placeholder

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessage**: `T`

#### Returns

`void`

#### Defined in

[src/messaging.ts:181](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L181)

***

### subscribeToMessage()

> **subscribeToMessage**\<`T`\>(`aClass`, `aMessageListener`): `number`

Description placeholder

#### Type Parameters

• **T** *extends* [`MessageType`](../type-aliases/MessageType.md)

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aMessageListener**

#### Returns

`number`

#### Defined in

[src/messaging.ts:205](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L205)

## Other

### disableType()

> **disableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:135](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L135)

***

### enableType()

> **enableType**(`aType`): `void`

#### Parameters

• **aType**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

#### Returns

`void`

#### Defined in

[src/messaging.ts:140](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L140)

***

### ensureTypeEnabled()

> **ensureTypeEnabled**(`aSuffix`): `void`

#### Parameters

• **aSuffix**: `string`

#### Returns

`void`

#### Defined in

[src/messaging.ts:153](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L153)

***

### reset()

> **reset**(): `void`

#### Returns

`void`

#### Defined in

[src/messaging.ts:128](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L128)

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

[src/messaging.ts:230](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L230)

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

[src/messaging.ts:246](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L246)

***

### typesDisabled()

> **typesDisabled**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/messaging.ts:161](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L161)

***

### unsubscribe()

> **unsubscribe**(`aClass`, `aSubscriptionIndex`): `void`

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:218](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L218)

***

### unsubscribeWrappedMessage()

> **unsubscribeWrappedMessage**(`aClass`, `aSubscriptionIndex`): `void`

#### Parameters

• **aClass**: [`SubscriptionIdentifierType`](../type-aliases/SubscriptionIdentifierType.md)

• **aSubscriptionIndex**: `number`

#### Returns

`void`

#### Defined in

[src/messaging.ts:259](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L259)

***

### getDefaultManager()

> `static` **getDefaultManager**(): [`TMessageManager`](TMessageManager.md)

#### Returns

[`TMessageManager`](TMessageManager.md)

#### Defined in

[src/messaging.ts:165](https://github.com/chuacw/delphirtl/blob/4a086bd5f5c288d4c6ef4d5de0c7d38afe362fb3/src/messaging.ts#L165)
