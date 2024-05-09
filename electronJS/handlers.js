import { playSound, returnSounds } from "../soundpad.js";
import { wait } from "../utils.js";

export { handlePlaySound, handleSoundpadStatus, handleGetSounds };

async function handlePlaySound() {
  playSound();
}

async function handleSoundpadStatus(status) {}

async function handleGetSounds() {
  return await returnSounds();
}
