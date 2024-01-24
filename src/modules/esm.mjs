'use strict';

import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const random = Math.random();

const file_path = fileURLToPath(import.meta.url);
const dir_path = path.dirname(file_path);

const json_path = path.join(dir_path, 'files', random > .5? 'a.json' : 'b.json');

const unknownObject = JSON.parse(await readFile(json_path));

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${file_path}`);
console.log(`Path to current directory is ${dir_path}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
