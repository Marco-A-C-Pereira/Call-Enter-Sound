import { soundpadPipeStatus } from "./soundpad.js";
import { startWebSocket, discordGateStatus } from "./discord.js";
import { checkBothRunning, wait, isRunning, watchingStatus } from "./utils.js";

async function main() {
  while (!(await checkBothRunning())) {
    console.log("waiting");
    await wait(250);
  }

  // console.log("Soundpad Pipe:", soundpadPipeStatus);
  // console.log("Discord Gate:", discordGateStatus);

  console.log("Both are running");

  await wait(1000 * 10);
}

main();
