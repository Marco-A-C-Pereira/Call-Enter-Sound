import { isRunning, watcher } from './utils.js'
import { sendSoundList, updatePipe } from './main.js'

import { createConnection } from 'net'
import { xml2json } from 'xml-js'

export { playSound, soundpadOperations }

let soundpadClient

function playSound(index) {
  // Cat Index, Sound Index, Play to Speakers, Play to Mic
  // soundpadClient.write('DoPlaySoundFromCategory(3,1,true,true)')
  soundpadClient.write(`DoPlaySound(${index}},true,true)`)
  // soundpadClient.write(`DoPlaySound(${index}},true,true)`)
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
  let soundList = []

  parsedSoundList.forEach((sound) => {
    const { index, title, duration } = sound._attributes
    let soundObj = {
      index: index,
      name: title,
      duration: duration
    }
    soundList.push(soundObj)
  })

  sendSoundList(soundList)
}

function cleanup() {
  soundpadClient = undefined
  updatePipe('Soundpad', false)
  watcher('Soundpad.exe', soundpadOperations)
}

async function soundpadOperations() {
  const processName = 'Soundpad.exe'

  if (await isRunning(processName)) createPipe()
  else watcher(processName, soundpadOperations)
}
