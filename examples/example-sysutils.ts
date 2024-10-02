import { hasFieldOfType, hasMessageField } from "../src/sysutils";

const obj1 = {
  message: "hello world"
}

console.log(hasMessageField(obj1));

const obj2 = {
  message: 1
}
console.log(hasMessageField(obj2));
console.log(hasFieldOfType<number>(obj2, "message", "number"));