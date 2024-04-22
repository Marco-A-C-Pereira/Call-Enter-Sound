const cmd = require("node-cmd");
const ipc = require("node-ipc");
var path = require("path");

const soundID = 1;
const filePath = "c:/Program Files (x86)/Steam/steamapps/common/Soundpad";
const playCommand = `-rc DoPlaySound(${soundID})`;
const doPlay = `${filePath} ${playCommand}`;

cmd.run(
  "c:/Program Files (x86)/Steam/steamapps/common/Soundpad -rc DoPlaySound(1)"
);

// cmd.run("c:/Program Files (x86)/Steam/steamapps/common/Soundpad.exe");

// console.log(path.resolve(filePath));
// console.log(typeof path.parse(filePath));

// console.log(filePath);
// console.log(doPlay);
// console.log("aaaaa");
