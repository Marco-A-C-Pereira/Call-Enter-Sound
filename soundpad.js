import * as net from "net";
import ENV from "./config.json" assert { type: "json" };

const pipePath = "\\\\.\\pipe\\sp_remote_control";

export let soundpadPipeStatus = false;

const client = net.createConnection(pipePath, () => {
  console.log("Soundpad Pipe Ready");
  soundpadPipeStatus = true;
});

client.on("data", (data) => {
  // console.log("Data recived:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from pipe");
  soundpadPipeStatus = false;
});

export function playSound() {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  console.log(ENV.SOUNDPAD_CATEGORY_INDEX);
  console.log(ENV.SOUNDPAD_SOUND_INDEX);
  client.write(
    `DoPlaySoundFromCategory(-1,${ENV.SOUNDPAD_SOUND_INDEX},${ENV.SOUNDPAD_PLAY_ON_SPEAKERS}, true)`
  );
  // `DoPlaySoundFromCategory(-1,${ENV.SOUNDPAD_SOUND_INDEX},${ENV.SOUNDPAD_PLAY_ON_SPEAKERS}, true)`
}
