import { PerformanceObserverEntryList, performance, PerformanceObserver } from "perf_hooks";

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