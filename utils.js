import { exec } from "child_process";

export { isDiscordRunning, isSoundpadRunning, checkBothRunning, wait };

let isDiscordRunning;
let isSoundpadRunning;

function isRunning(processName, cb) {
  exec("tasklist", (err, stdout, stderr) => {
    const isProcessRunning =
      stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1;

    // console.log(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1);
    // console.log(isProcessRunning);

    cb(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1);
  });
}

function checkBothRunning() {
  isRunning("Discord.exe", (status) => {
    isDiscordRunning = status;
  });
  isRunning("Soundpad.exe", (status) => {
    isSoundpadRunning = status;
  });

  return isDiscordRunning == true && isSoundpadRunning == true;
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
