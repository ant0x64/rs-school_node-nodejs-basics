'use strict';

import { unlink, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const exec_dir = dirname(fileURLToPath(import.meta.url));
    const file_path = join(exec_dir, 'files', 'fileToRemove.txt');

    try {
        await access(file_path);
    } catch (err) {
        if(err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw err;
    }

    unlink(file_path);
};

await remove();