import { playSound, returnSounds } from './soundpad.js'

export { handlePlaySound, handleGetSounds }

async function handlePlaySound() {
  console.log('Playing')
  playSound()
}

async function handleGetSounds() {
  return returnSounds()
}

export async function handleReciveMsg(_event, value) {
  console.log('RECIVE')
  console.log(value) // will print value to Node console
}
