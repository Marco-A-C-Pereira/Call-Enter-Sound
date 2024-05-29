import { electronStore } from './settings.js'
import { playSound } from './soundpad.js'

export { handlePlaySound, handleGetStorage, handleSetStorage }

async function handlePlaySound(event, index) {
  playSound(index)
}

function handleSetStorage(event, key, data) {
  electronStore.set(key, data)
}

function handleGetStorage(event, key) {
  event.returnValue = electronStore.get(key)
}
