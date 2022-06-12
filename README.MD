Delphi RTL
==========

These libraries provide a set of functionality that makes it easy to use known Delphi functions with TypeScript and Javascript.

Modules
=======
sysutils  
rtl  

Comments
========

The current configuration allows importing with the following mechanism:


import "delphirtl"; // import the main definition file   
import { ParamStr } from "rtl";  // import the method/type from the namespace rtl which was exported from delphirtl  
import { ExtractFileName } from "sysutils";   

This current configuration is not ideal.

Added unit tests