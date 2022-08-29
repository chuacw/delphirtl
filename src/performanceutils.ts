import { PerformanceObserverEntryList, performance, PerformanceObserver } from "perf_hooks";

/*
function someFunction2() {
    for (let i=1; i<=30000; i++) console.log('hello Calvine photo!');
}
timePerformance(someFunction2);
Use like the above ^^^
*/
function timePerformance(fn: ()=>void) {
    const obs = new PerformanceObserver((list: PerformanceObserverEntryList) => {
        const entries = list.getEntries();
        const entry = entries[0];
        console.log(`${entry.name} took ${entry.duration}ms to execute`);
    });
    obs.observe({ entryTypes: ['function'] });
    const wrappedFn = performance.timerify(fn);
    wrappedFn();
}

export {
    timePerformance
}