import WebSocket from "ws";
import ENV from "./config.json" assert { type: "json" };

const gatewayUrl = "wss://gateway.discord.gg/";
let url = gatewayUrl,
  sessionId = "";
let ws;
let interval = 0,
  seq = -1;

let payload = {
  op: 2,
  d: {
    token: ENV.GATEWAY_TOKEN,
    intents: 33280,
    properties: {
      $os: "windows",
      $browser: "chrome",
      $device: "chrome",
    },
  },
};

const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 1, d: null }));
  }, ms);
};

const startWebStocket = () => {
  if (ws && ws.readyState !== 3) ws.close();

  let wasReady = false;

  ws = new WebSocket(url + "/?v=10&enconding=json");

  ws.on("open", function open() {
    if (url !== gatewayUrl) {
      const resumePayload = {
        op: 6,
        d: {
          token: ENV.GATEWAY_TOKEN,
          sessionId,
          seq,
        },
      };

      ws.send(JSON.stringify(resumePayload));
    }
  });

  ws.on("error", function error(e) {
    console.log(e);
  });

  ws.on("close", function close() {
    if (wasReady) console.log("Gateway closed, trying to reconnect");

    setTimeout(() => {
      startWebStocket();
    }, 2500);
  });

  ws.on("message", function incoming(data) {
    let p = JSON.parse(data);
    const { t, op, d, s } = p;

    switch (op) {
      case 10:
        const { heartbeat_interval } = d;
        interval = heartbeat(heartbeat_interval);
        wasReady = true;

        if (url === gatewayUrl) ws.send(JSON.stringify(payload));
        break;

      case 0:
        seq = s;
        break;
    }

    switch (t) {
      case "READY":
        console.log("Gateway Ready");
        url = d.resume_gateway_url;
        sessionId = d.session_id;
        break;

      case "RESUME":
        console.log("Gateway Resumed");
        break;

      case "VOICE_STATE_UPDATE":
        let author = d.author.username;
        let disc = d.author.discriminator;
        let content = d.content;

        console.log(`${author}#${disc}: ${content}`);
    }
  });
};

startWebStocket();
