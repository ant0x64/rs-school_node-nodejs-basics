'use strict';

import { parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (n) => {
    parentPort.postMessage(nthFibonacci(n));
};

parentPort.on('message', (n) => {
    //if(Math.random() > .5) throw new Error();
    sendResult(n);
    process.exit();
});
