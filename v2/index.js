import tests from "./tests";
import Manager from "./Manager";
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const name = argv.name || tests.names[0];
const times = argv.times || 1;
const duration = argv.duration || -1;

(async () => {
  if (argv.h || argv.help) {
    console.log(`Example:`);
    console.log(`  --name [${tests.names.join('|')}]`);
    console.log(`  --times 30`);
    console.log(`  ---duration 10`);
    return;
  }
  
  const test = tests.test(name);
  const manager = duration > 0 ? Manager.duration(test, duration * 1000) : Manager.times(test, times);

  manager.on('successful', metric =>
    process.stdout.write(`\r\x1b[KIter: ${metric.iter} Sg: ${metric.seconds} - [OK: #${metric.successful}]`));

  manager.on('error', (metric, err) => {
    process.stdout.write('\r\x1b[K');
    process.stderr.write(`Iter: ${metric.iter} Sg: ${metric.seconds} - [ERR #${metric.errors} | ${err.name}]\n`);
  });

  const iniMsg = duration > 0 ? `for ${duration} seconds` : `${times} times`;
  console.log(`running ${name} ${iniMsg}`);

  await manager.init();
  var metric = await manager.run();
  process.stdout.write(`\r\x1b[K${metric.print()}\n`);
})();
