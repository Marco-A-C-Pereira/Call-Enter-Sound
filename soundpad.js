import * as net from "net";
import ENV from "./config.json" assert { type: "json" };
import { watchingStatus } from "./utils.js";

export let soundpadPipeStatus = false;

let client;
let soundList;

export function playSound() {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  client.write(
    `DoPlaySoundFromCategory(${ENV.SOUNDPAD_CATEGORY_INDEX},${ENV.SOUNDPAD_SOUND_INDEX},${ENV.SOUNDPAD_PLAY_ON_SPEAKERS},true)`
  ); // TODO: FIX SOUND LIB INDEX BUG
}

async function createConnection() {
  const pipePath = "\\\\.\\pipe\\sp_remote_control";

  return net.createConnection(pipePath, () => {
    console.log("Soundpad Pipe Ready");
    soundpadPipeStatus = true;
    getSoundList();
  });
}

function addEvents() {
  client.on("data", (data) => {
    if (data.toString() !== "R-200") {
      let parsedData = JSON.parse(parser.toJson(data));
      SoundList = parsedData.Soundlist.Sound;

      SoundList.forEach((sound) => {
        const { index, title, url } = sound;
        console.log(fs.existsSync(url));
        // console.log("Index: ", sound.index, " Name: ", sound.title);
      });
    }
  });

  client.on("end", () => {
    console.log("Disconnected from pipe");
    soundpadPipeStatus = false;
  });

  client.on("error", cleanup);
}

function cleanup(err) {
  client = undefined;
  soundpadPipeStatus = false;
}

function soundpadOperations() {
  setInterval(async () => {
    if (watchingStatus.Soundpad && client == undefined) {
      client = await createConnection();
      addEvents();
    } else if (!watchingStatus.Soundpad && client !== undefined) {
      client = await createConnection();
    }
  }, 250);
}

async function getSoundList() {
  return client.write("GetSoundlist()");
}

soundpadOperations();
