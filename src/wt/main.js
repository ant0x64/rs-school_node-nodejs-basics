'use strict';

import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const increment = 10;
const worker_path = join(dirname(fileURLToPath(import.meta.url)), 'worker.js');

const performCalculations = async () => {
    const result = [];
    const workers = cpus().map(((cpu, index) => {
        return new Promise((resolve) => {
            const worker = new Worker(worker_path);

            worker.on('message', (n) => {
                result[index] = {
                    status: 'resolved',
                    data: n
                };
                resolve();
            });

            worker.on('error', () => {
                result[index] = {
                    status: 'error',
                    data: null
                }
                resolve();
            });

            worker.postMessage(increment + index);
        })
    }));

    await Promise.all(workers);

    console.log(result);
};

await performCalculations();
