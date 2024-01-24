'use strict';

import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const compress = async () => {
    const dir_name = join(dirname(fileURLToPath(import.meta.url)), 'files');

    const file_path = join(dir_name, 'fileToCompress.txt');
    const gzip_path = join(dir_name, 'archive.gz');

    pipeline(createReadStream(file_path), createGzip(), createWriteStream(gzip_path));
};

await compress();