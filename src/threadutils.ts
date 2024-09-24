import { Worker, isMainThread, parentPort } from 'worker_threads';

// Function to create a thread
function runInThread<T>(fn: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const worker = new Worker(__filename, {
            workerData: { fn: fn.toString() }
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

if (!isMainThread) {
    const { workerData } = require('worker_threads');
    const fn = new Function(`return (${workerData.fn})`)();
    parentPort?.postMessage(fn());
}

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

export {
    runInThread,
}
export { isMainThread, Worker, parentPort, workerData } from 'worker_threads';