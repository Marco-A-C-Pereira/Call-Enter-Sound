import * as net from "net";
import ENV from "./config.json" assert { type: "json" };
import { watchingStatus } from "./utils.js";
import { xml2json } from "xml-js";

let soundpadClient;
let soundList = [];
export let soundpadPipeStatus = false;

export function playSound() {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  soundpadClient.write("DoPlaySoundFromCategory(3,1,true,true)");
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
  soundpadClient.on("data", async (data) => {
    if (data.toString() !== "R-200") {
      await getSounds(data);
    } else {
      // Data ?
    }
  });

  soundpadClient.on("end", () => {
    console.log("Disconnected from pipe");
    soundpadPipeStatus = false;
  });

  soundpadClient.on("error", cleanup);
}

function cleanup(err) {
  soundpadClient = undefined;
  soundpadPipeStatus = false;
}

function soundpadOperations() {
  setInterval(async () => {
    if (watchingStatus.Soundpad && soundpadClient == undefined) {
      soundpadClient = await createConnection();
      addEvents();
    } else if (!watchingStatus.Soundpad && soundpadClient !== undefined) {
      soundpadClient = await createConnection();
    }
  }, 250);
}

async function getSoundList() {
  return soundpadClient.write("GetSoundlist()");
}

async function getSounds(data) {
  const parsedData = JSON.parse(xml2json(data, { compact: true }));
  const parsedSoundList = parsedData.Soundlist.Sound;

  parsedSoundList.forEach((sound) => {
    const { index, title, url } = sound._attributes;
    let soundObj = {
      index: index,
      name: title,
      path: url,
    };
    soundList.push(soundObj);
  });
}

soundpadOperations();
