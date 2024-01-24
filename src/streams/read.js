'use strict';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';
import process from 'process';

const read = async () => {
    const file_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
    await pipeline(createReadStream(file_path), process.stdout);
};

await read();