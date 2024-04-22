const { exec } = require("child_process");
var path = require("path");

const soundID = 1;
const filePath = `C:\\Program Files (x86)\\Steam\\steamapps\\common\\Soundpad`;
const playCommand = `-rc DoPlaySound(${soundID})`;
const doPlay = `${filePath} ${playCommand}`;

exec(doPlay);
// console.log(doPlay);

console.log(typeof path.parse(filePath));

// console.log(filePath);
// console.log(doPlay);
// console.log("aaaaa");
