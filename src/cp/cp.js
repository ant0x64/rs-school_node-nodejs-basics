'use strict';

import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const process_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');

const spawnChildProcess = async (args = ['default argument']) => {
    const child = fork(process_path, args, {silent: true});

    const sender = (data) => {
        child.send(data.toString());
    };

    process.stdin.on('data', sender);
    child.stdout.pipe(process.stdout);

    child.on('message', (data) => console.log(data.trim()));
    child.on('disconnect', (code) => {
        process.stdin.removeListener('data', sender);
        process.exit(code);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
