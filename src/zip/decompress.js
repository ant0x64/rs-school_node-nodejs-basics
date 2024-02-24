'use strict';

import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const decompress = async () => {
    const dir_name = join(dirname(fileURLToPath(import.meta.url)), 'files');

    const gzip_path = join(dir_name, 'archive.gz');
    const file_path = join(dir_name, 'fileToCompress.txt');

    pipeline(createReadStream(gzip_path), createGunzip(), createWriteStream(file_path));
};

await decompress();