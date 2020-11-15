import tests from "./tests";
import Manager from "./Manager";
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const name = argv.name || tests.names[0];
const parallel = argv.parallel || 1;
const times = argv.times || 1;
const wait = argv.wait || 0;

(async () => {
  if (argv.h || argv.help) {
    console.log(`Example:`);
    console.log(`  --name [${tests.names.join('|')}]`);
    console.log(`  --times 30`);
    console.log(`  --parallel 3`);
    console.log(`  --wait 500`);
    return;
  }
  
  const test = tests.test(name);
  const manager = new Manager(test, times, wait);
  manager.on('successful', (successful, duration, status) =>
    process.stdout.write(`\r\x1b[Kok: ${successful}: ${status} - ${duration}`));

  manager.on('error', (errors, duration, err) => {
    process.stdout.write('\r\x1b[K');
    process.stderr.write(`err: ${errors}: ${duration}\n`);
  });

  console.log(`running ${name} ${times} times in parallel ${parallel} more times...`);

  await manager.init();
  const outputs = await Promise.all([...new Array(parallel)].map(() => manager.run()));
  const [ok, err] = outputs.reduce(([ok, err], b) => [ok + b.successful, err + b.errors], [0, 0])

  process.stdout.write(`\r\x1b[Kawesome ok: ${ok}  erros: ${err}\n`);
})();
