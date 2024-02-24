'use strict';

import { access, constants, lstat, rename as fsRename } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const exists = async path => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

const rename = async () => {
    const exec_dir = dirname(fileURLToPath(import.meta.url));

    const source_path = join(exec_dir, 'files', 'wrongFilename.txt');
    const dest_path = join(exec_dir, 'files', 'properFilename.md');

    try {
        if (
            !(await lstat(source_path)).isFile() ||
            await exists(dest_path)
        ) {
            throw new Error();
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }

    fsRename(source_path, dest_path);
};

await rename();