import { hasFieldOfType, hasMessageField } from "../src/sysutils";

const obj1 = {
  message: "hello world"
}

console.log("obj1 has a field message of string type: ", hasMessageField(obj1));
console.log("obj1 has a field message of string type: ", hasFieldOfType<string>(obj1, "message", "string"));

const obj2 = {
  message: 1
}
console.log(hasMessageField(obj2));
console.log("obj2 has a field message of number type: ", hasFieldOfType(obj2, "message", "number"));
console.log("obj2 has a field message of string type: ", hasFieldOfType(obj2, "message", "string"));
