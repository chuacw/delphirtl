Delphi RTL
==========

These libraries provide a set of functionality that makes it easy to use known Delphi functions with TypeScript and Javascript.

Installation
============

npm install delphirtl

Modules
=======
* arrayutils
* dateutils  
* logutils  
* messaging / Messaging
* sysutils  
* rtl  

Comments
========

The current configuration allows importing with the following mechanism:


import { ParamStr } from "delphirtl/rtl";  // import the method/type from the namespace rtl which was exported from delphirtl  
import { ExtractFileName } from "delphirtl/sysutils"; // import ExtractFileName from sysutils   


| Version  | Date        | Notes  |  
|----------|-------------|--------|  
| 1.0.51   | 12 Jun 2022 | Added ability to import subpackages. |
| 1.0.55   | 12 Jun 2022 | Added arrayutils. |
| 1.0.60   | 11 Jul 2022 | Added Messaging and example |
