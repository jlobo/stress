"use strict";

import req from "superagent";
import minimist from 'minimist';
import { sleep } from "./utils.js";

const argv = minimist(process.argv.slice(2));
const times = argv.times || 1;
const wait = 1000;

(async () => {
    for (let i = 0; i < times; i++) {
        const start = new Date().getTime();
    
        try {
            var resp = await req.get(argv.url);    
            const duration = new Date().getTime() - start;
            process.stdout.write(`${duration}|${resp.status}`);
            process.exitCode = 0;
        }
        catch (error) {
            const duration = new Date().getTime() - start;
            process.stdout.write(`${duration}|${error}`);
            process.exitCode = 1;
        }
        await sleep(wait);
    }
})();
