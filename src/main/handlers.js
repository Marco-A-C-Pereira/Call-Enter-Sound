import { playSound } from './soundpad.js'

export { handlePlaySound }

async function handlePlaySound(event, index) {
  console.log(index)
  playSound(index)
}
