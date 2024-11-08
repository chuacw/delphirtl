import { dedupArray } from "../src/arrayutils";
const dupArray1 = [1, 2, 2, 5];
console.log(`Array with duplicated elements: ${dupArray1}`);

const dedupArray1 = dedupArray(dupArray1);
console.log(`Array with deduplicated elements: ${dedupArray1}`);

const dupArrayS1 = ["my", "my", "world"];
console.log(`Array with duplicated elements: ${dupArrayS1}`);

const dedupArrayS1 = dedupArray(dupArrayS1);
console.log(`Array with deduplicated elements: ${dedupArrayS1}`);

