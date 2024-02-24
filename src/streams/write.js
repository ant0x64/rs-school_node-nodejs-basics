'use strict';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import process from 'process';

const write = async () => {
    const file_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToWrite.txt');
    await pipeline(process.stdin, createWriteStream(file_path));
};

await write();