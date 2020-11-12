"use strict";
import childProc from "child_process";
const NUM = 60;
const CHILD_PROCESSES = 1000;
const URL = 'http://127.0.0.1:5001/api/public';

(async () => {
  let times = [];
  let children = [];

  for (let i = 0; i < CHILD_PROCESSES; i++) {
    let childProcess = childProc.spawn("node", ["--experimental-modules", "child.js", `--times=${NUM}`, `--url=${URL}`])
    children.push(childProcess);
  }

  let responses = children.map(function wait(child) {
    return new Promise(function c(res) {
      child.stdout.on('data', (data) => {
        console.log(`child stdout: ${data}`);
        times.push(parseInt(data));
      });
      child.on("exit", function (code) {
        if (code === 0) {
          res(true);
        } else {
          res(false);
        }
      });
    });
  });

  responses = await Promise.all(responses);

  if (responses.filter(Boolean).length == responses.length) {
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = (sum / times.length) || 0;
    console.log(`average: ${avg}`);
    console.log("success!");
  } else {
    console.log("failures!");
  }
})();
