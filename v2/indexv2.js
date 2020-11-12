"use strict";
import VUser from "./vuser.js";

const NUM = 10;
const CHILD_PROCESSES = 10000;
const URL = 'http://127.0.0.1:5001/api/public';

(async () => {
  const vuser = new VUser(URL, NUM);
  vuser.on('successful', (successful, duration, status) =>
    process.stdout.write(`\r\x1b[Kok: ${successful}: ${status} - ${duration}`));

  vuser.on('error', (errors, duration, err) => {
    process.stdout.write('\r\x1b[K');
    process.stderr.write(`err: ${errors}: ${duration}\n`);
  });

  const outputs = await Promise.all([...new Array(CHILD_PROCESSES)].map(() => vuser.run()));
  const [ok, err] = outputs.reduce(([ok, err], b) => [ok + b.successful, err + b.errors], [0, 0])

  process.stdout.write('\r\x1b[Kall good! ${ok} ok and ${err} with erros\n');
})();
