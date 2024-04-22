const net = require("net");

const pipePath = "\\\\.\\pipe\\sp_remote_control";

const client = net.createConnection(pipePath, () => {
  client.write("DoPlaySoundFromCategory(1,2)");
});

client.on("data", (data) => {
  console.log("Data recived:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from pipe");
});
