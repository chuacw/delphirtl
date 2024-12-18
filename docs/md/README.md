**delphirtl** • [**Docs**](globals.md)

***

# Delphi RTL

These libraries provide a set of functionality that makes it easy to use known Delphi functions with TypeScript and Javascript.

## Installation
npm install delphirtl

## Modules
* arrayutils
* BaseJsonRpcServer
* collections
* dateutils  
* logutils  
* messaging / Messaging
* performanceutils
* sysutils  
* reflectutils
* rtl  
* threadutils  

## Comments
The current configuration allows importing with the following mechanism:

```
import { ParamStr } from "delphirtl/rtl";  // import the method/type from the namespace rtl which was exported from delphirtl  
import { ExtractFileName } from "delphirtl/sysutils"; // import ExtractFileName from sysutils   
```

| Version  | Date        | Notes  |  
|----------|-------------|--------|  
| 1.0.51   | 12 Jun 2022 | Added ability to import subpackages. |
| 1.0.55   | 12 Jun 2022 | Added arrayutils. |
| 1.1.0    | 11 Jul 2022 | Added Messaging and example |
| 1.1.1    | 11 Jul 2022 | Fixed Messaging and example to use better names |
| 1.1.2    | 12 Jul 2022 | added subscribeToWrappedMessage, sendWrappedMessage, unsubscribeWrappedMessage and more unit tests |
| 1.1.8  | 2 Oct 2024 | Added threadutils, reflectutils and hasMessageField, hasFieldOfType in sysutils, fixed exports in index.ts |
| 1.1.13-16 | 6 Oct 2024 | Added List\<T\> to collections |
| 1.1.17 | 12 Oct 2024 | Added various add* functionality to Date |
| 1.1.18 | 13 Oct 2024 | Added isArbitraryObject |
| 1.1.19-20 | 19 Oct 2024 | Added haveNoDuplicates to ArrayUtils |

## Documentation
For further documentation, see the 
* [docs directory](https://chuacw.github.io/delphirtl/md/globals.html) on GitHub.
* [HTML documents](https://chuacw.github.io/delphirtl/html/index.html).

## Examples
There's an [examples](https://github.com/chuacw/delphirtl/tree/main/examples) directory showing how to use this library.
