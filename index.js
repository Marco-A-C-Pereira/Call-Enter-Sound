import { soundpadPipeStatus } from "./soundpad.js";
import { startWebSocket, discordGateStatus } from "./discord.js";
import {
  isDiscordRunning,
  isSoundpadRunning,
  checkBothRunning,
  wait,
} from "./utils.js";

async function main() {
  await checkBothRunning();
  console.log("Soundpad Pipe:", soundpadPipeStatus);
  console.log("Discord Gate:", discordGateStatus);
  startWebSocket();

  console.log("Both are running");

  await wait(1000 * 10);
}

main();
