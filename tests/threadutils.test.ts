import { isMainThread, runInThread } from "../src/threadutils";

// Example usage
// if (isMainThread) {
//     runInThread(() => {
//         // Your code here
//         const sum = [1, 2, 3, 4].reduce((a, b) => a + b, 0);
//         return sum;
//     }).then(result => {
//         console.log(`Result: ${result}`);
//     }).catch(err => {
//         console.error(err);
//     });
// }

describe('testing threadutils library', () => {
    test('runInThread', async () => {
        if (isMainThread) {
            runInThread(() => {
                const sum = [1, 2, 3, 4].reduce((a, b) => a + b, 0);
                return sum;
            }).then(result => {
                console.log(`Result: ${result}`);
                expect(result).toBe(10);
            }).catch(err => {
                console.error(err); // cannot use import statement outside a module
            });
        }
    });

});


