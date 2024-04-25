import { exec } from "child_process";
import { resolve } from "path";

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

async function checkBothRunning() {
  let isBothRunning = isDiscordRunning == true && isSoundpadRunning == true;

  while (!isBothRunning) {
    isRunning("Discord.exe", (status) => {
      console.log("Discord is: ", isDiscordRunning ? "Running" : "Not Running");
      isDiscordRunning = status;
    });
    isRunning("Soundpad.exe", (status) => {
      console.log(
        `Soundpad is: ${isSoundpadRunning ? "Running" : "Not Running"}`
      );

      isSoundpadRunning = status;
    });

    isBothRunning = isDiscordRunning == true && isSoundpadRunning == true;

    await wait(250);
  }

  resolve;
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
