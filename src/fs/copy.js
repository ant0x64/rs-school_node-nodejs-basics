'use strict';

import { access, constants, lstat, readdir, mkdir, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const exists = async path => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

const cp = async (source, dest) => {
    const stat = await lstat(source);

    if (stat.isDirectory()) {
        await mkdir(dest);

        (await readdir(source)).map(async (path) => {
            await cp(join(source, path), join(dest, path));
        });
    } else {
        copyFile(source, dest);
    }
}

const copy = async () => {
    const exec_dir = dirname(fileURLToPath(import.meta.url));

    const sourse_path = join(exec_dir, 'files');
    const dest_path = join(exec_dir, 'files_copy');

    try {
        if (
            !(await lstat(sourse_path)).isDirectory() ||
            await exists(dest_path)
        ) {
            throw new Error();
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }

    cp(sourse_path, dest_path);
};

await copy();
