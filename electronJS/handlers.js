const { playSound } = require("../soundpad");

module.exports = { handlePlaySound };

async function handlePlaySound() {
  playSound();
}
