'use strict';

import { pipeline } from 'stream/promises';
import { EOL } from 'os';
import process from 'process';


const transform = async () => {
    await pipeline(process.stdin, async function* (source) {
        for await (const chunk of source) {
            yield chunk.toString().trim().split('').reverse().join('') + EOL;
        }
    }, process.stdout);
};

await transform();