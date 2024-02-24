'use strict';

import crypto from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';

const calculateHash = async () => {
    const file_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCalculateHashFor.txt');
    const hash = crypto.createHash('SHA256');

    await pipeline(createReadStream(file_path), hash);

    console.log(hash.digest('hex'));
};

await calculateHash();