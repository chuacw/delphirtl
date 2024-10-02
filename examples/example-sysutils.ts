import { hasFieldOfType, hasMessageField } from "../src/sysutils";

const obj1 = {
  message: "hello world"
}

console.log(hasMessageField(obj1));
console.log(hasFieldOfType<string>(obj1, "message", "string"));

const obj2 = {
  message: 1
}
console.log(hasMessageField(obj2));
console.log(hasFieldOfType(obj2, "message", "number"));
console.log(hasFieldOfType(obj2, "message", "string"));