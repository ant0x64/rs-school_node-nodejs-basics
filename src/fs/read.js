'use strict';

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const exec_dir = dirname(fileURLToPath(import.meta.url));
    const file_path = join(exec_dir, 'files', 'fileToRead.txt');

    try {
        await readFile(file_path, 'utf8').then(content => {
            console.log(content);
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await read();