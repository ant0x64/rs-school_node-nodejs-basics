'use strict';

import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const exec_dir = dirname(fileURLToPath(import.meta.url));
    const files_dir = join(exec_dir, 'files');

    try {
        (await readdir(files_dir, { recursive: true })).map(name => {
            console.log(name);
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await list();