import * as net from "net";
import ENV from "./config.json" assert { type: "json" };
import { isSoundpadRunning, wait } from "./utils.js";

export let soundpadPipeStatus = false;

const client = await createConnection();
addEvents();

export function playSound() {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  // console.log(ENV.SOUNDPAD_CATEGORY_INDEX);
  // console.log(ENV.SOUNDPAD_SOUND_INDEX);
  client.write(
    `DoPlaySoundFromCategory(-1,${ENV.SOUNDPAD_SOUND_INDEX},${ENV.SOUNDPAD_PLAY_ON_SPEAKERS}, true)` // TODO: FIX SOUND LIB INDEX BUG
  );
}

async function createConnection() {
  const pipePath = "\\\\.\\pipe\\sp_remote_control";

  while (isSoundpadRunning == false) {
    wait(250);
  }

  return net.createConnection(pipePath, () => {
    console.log("Soundpad Pipe Ready");
    soundpadPipeStatus = true;
  });
}

function addEvents() {
  client.on("data", (data) => {
    console.log("Data recived:", data.toString());
  });

  client.on("end", () => {
    console.log("Disconnected from pipe");
    soundpadPipeStatus = false;
  });
}
