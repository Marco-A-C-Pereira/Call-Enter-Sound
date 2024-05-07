import { exec } from "child_process";

export { isRunning, checkBothRunning, wait, watchingStatus };

let watchingStatus = {};
const discordName = "Discord";
const soundpadName = "Soundpad";
watchingStatus[discordName] = false;
watchingStatus[soundpadName] = false;

async function isRunning(processName) {
  return new Promise((resolve, reject) => {
    exec("tasklist", (err, stdout, stderr) => {
      const isProcessRunning =
        stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1;

      resolve(isProcessRunning);
    });
  });
}

async function checkRunning(process) {
  let processStatus = await isRunning(process);

  setInterval(async () => {
    processStatus = await isRunning(process);
  }, 250);
}

async function runningWatcher(process) {
  const treatedName = process.split(".")[0];
  watchingStatus[treatedName] = await isRunning(process);

  setInterval(async () => {
    let prevState = watchingStatus[treatedName];
    let currState = await isRunning(process);

    if (prevState !== currState) {
      // console.log(watchingStatus[treatedName]);
      watchingStatus[treatedName] = currState;
    }

    watchingStatus[treatedName] = currState;
  }, 250);
}

async function checkBothRunning() {
  let isBothRunning =
    watchingStatus.Discord == true && watchingStatus.Soundpad == true;

  while (!isBothRunning) {
    isBothRunning =
      watchingStatus.Discord == true && watchingStatus.Soundpad == true;

    await wait(250);
  }

  // console.log(isBothRunning);

  return isBothRunning;
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function main() {
  runningWatcher("Discord.exe");
  runningWatcher("Soundpad.exe");
}

main();
