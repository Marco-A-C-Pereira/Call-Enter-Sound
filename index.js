import { soundpadPipeStatus } from "./soundpad.js";
import { startWebSocket, discordGateStatus } from "./discord.js";
import {
  checkBothRunning,
  isDiscordRunning,
  isSoundpadRunning,
  wait,
} from "./utils.js";

async function main() {
  console.log("Soundpad Pipe:", soundpadPipeStatus);
  console.log("Discord Gate:", discordGateStatus);
  startWebSocket();
  while (!checkBothRunning()) {
    console.log("Discord is: ", isDiscordRunning ? "Running" : "Not Running");
    console.log("Soundpad is: ", isSoundpadRunning ? "Running" : "Not Running");

    await wait(250);
  }

  console.log("Both are running");
}

main();
