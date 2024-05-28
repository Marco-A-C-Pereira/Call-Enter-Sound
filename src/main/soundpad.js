import { isRunning, watcher } from './utils.js'

import { createConnection } from 'net'
import { updatePipe } from './main.js'
import { xml2json } from 'xml-js'

export { playSound, returnSounds, soundList, soundpadOperations }

let soundpadClient
let soundList = []

function playSound() {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  soundpadClient.write('DoPlaySoundFromCategory(3,1,true,true)')
}

async function createPipe() {
  soundpadClient = await createPipeConnection()
  addEvents()
}

async function createPipeConnection() {
  const pipePath = '\\\\.\\pipe\\sp_remote_control'

  return createConnection(pipePath, () => {
    console.log('Soundpad Pipe Ready')
    soundpadClient.write('GetSoundlist()')
    updatePipe('Soundpad', true)
  })
}

function addEvents() {
  soundpadClient.on('data', async (data) => {
    if (data.toString() !== 'R-200') await generateSoundList(data)
  })

  soundpadClient.on('end', () => {
    console.log('Disconnected from pipe')
    cleanup()
  })

  soundpadClient.on('error', cleanup)
}

async function generateSoundList(data) {
  const parsedData = JSON.parse(xml2json(data, { compact: true }))
  const parsedSoundList = parsedData.Soundlist.Sound

  parsedSoundList.forEach((sound) => {
    const { index, title, url } = sound._attributes
    let soundObj = {
      index: index,
      name: title,
      path: url
    }
    soundList.push(soundObj)
  })
}

function cleanup() {
  soundpadClient = undefined
  soundList = []
  updatePipe('Soundpad', false)
  watcher('Soundpad.exe', soundpadOperations)
}

async function soundpadOperations() {
  const processName = 'Soundpad.exe'

  if (await isRunning(processName)) createPipe()
  else watcher(processName, soundpadOperations)
}

async function returnSounds() {
  return soundList
}
