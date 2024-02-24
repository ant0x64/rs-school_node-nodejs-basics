'use strict';

import { access, constants, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const exists = async path => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

const create = async () => {
    const file_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');

    if (await exists(file_path)) {
        throw new Error('FS operation failed');
    }
    
    writeFile(file_path, 'I am fresh and young');
};

await create();