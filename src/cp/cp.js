'use strict';

import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const process_path = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');

const spawnChildProcess = async (args = ['default argument']) => {
    fork(process_path, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
