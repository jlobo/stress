import DAuth from "./tests/DAuth.js";

const num = 30;
var threshold = 3;
const concurrent = 1;
var urls = [...Array(threshold)].map((_, i) => "http://localhost:500" + (i + 1));

(async () => {
  const vuser = new DAuth(urls, threshold, num);

  vuser.on('successful', (successful, duration, status) =>
    process.stdout.write(`\r\x1b[Kok: ${successful}: ${status} - ${duration}`));

  vuser.on('error', (errors, duration, err) => {
    process.stdout.write('\r\x1b[K');
    process.stderr.write(`err: ${errors}: ${duration}\n`);
  });

  await vuser.init();
  const outputs = await Promise.all([...new Array(concurrent)].map(() => vuser.run()));
  const [ok, err] = outputs.reduce(([ok, err], b) => [ok + b.successful, err + b.errors], [0, 0])

  process.stdout.write(`\r\x1b[Kawesome ok: ${ok}  erros: ${err}\n`);
})();
