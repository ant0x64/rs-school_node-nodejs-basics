'use strict';

import process from 'process';

const parseArgs = () => {
    const argvArray = process.argv.slice(2);
    const outputArray = [];

    for(let i = 0; i < argvArray.length; i++) {
        if(argvArray[i].startsWith('--') && argvArray[i + 1]) {
            outputArray.push(`${argvArray[i].substring(2)} is ${argvArray[i + 1]}`);
            i++;
        }
    }

    console.log(outputArray.join(', '));
};

parseArgs();