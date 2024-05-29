import { WebSocket } from 'ws'
import ENV from './config.json' assert { type: 'json' }
import { electronStore } from './settings.js'
import { playSound } from './soundpad.js'
import { isRunning, watcher } from './utils.js'
import { updatePipe } from './main.js'

export { newMain }

const gatewayUrl = 'wss://gateway.discord.gg/'
let url = gatewayUrl,
  sessionId = ''
let ws
let interval = 0,
  seq = -1

let payload = {
  op: 2,
  d: {
    token: ENV.GATEWAY_TOKEN,
    intents: 128, // Just to read guild activity
    // intents: 33280,
    properties: {
      $os: 'windows',
      $browser: 'chrome',
      $device: 'chrome'
    }
  }
}

const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 1, d: null }))
  }, ms)
}

const startWebSocket = () => {
  let clientUserId
  let clientCurrentChanel = null

  if (ws && ws.readyState !== 3) ws.close()

  let wasReady = false

  ws = new WebSocket(url + '/?v=10&enconding=json')

  ws.on('open', () => {
    if (url !== gatewayUrl) {
      const resumePayload = {
        op: 6,
        d: {
          token: ENV.GATEWAY_TOKEN,
          sessionId,
          seq
        }
      }

      ws.send(JSON.stringify(resumePayload))
    }
  })

  ws.on('error', async () => {
    await cleanup()
  })

  ws.on('close', async () => {
    if (wasReady) console.log('Gateway closed, trying to reconnect')

    if (await isRunning(processName)) {
      setTimeout(() => {
        startWebSocket()
      }, 2500)
    }

    await cleanup()
  })

  ws.on('message', function incoming(data) {
    let p = JSON.parse(data)
    const { t, op, d, s } = p

    switch (op) {
      case 10:
        const { heartbeat_interval } = d
        interval = heartbeat(heartbeat_interval)
        wasReady = true

        if (url === gatewayUrl) ws.send(JSON.stringify(payload))
        break

      case 0:
        seq = s
        break
    }

    switch (t) {
      case 'READY':
        console.log('Gateway Ready')
        url = d.resume_gateway_url
        sessionId = d.session_id

        clientUserId = d.user.id

        updatePipe('Discord', true)
        break

      case 'RESUME':
        console.log('Gateway Resumed')
        break

      case 'VOICE_STATE_UPDATE':
        const isFromUser = clientUserId === d.user_id
        const canPlay =
          clientCurrentChanel == null ||
          (d.channel_id !== null && clientCurrentChanel != d.channel_id)
        // const playAfterUnmute = electronStore.get('playOnUnmute') ? d.self_mute !== true : true
        const playAfterUnmute = d.self_mute !== true && electronStore.get('playOnUnmute')

        if (isFromUser && playAfterUnmute && canPlay) {
          setTimeout(() => {
            playSound(electronStore.get('selectedSound'))
          }, 500)
        }

        clientCurrentChanel = d.channel_id
        break
    }
  })
}

async function cleanup() {
  url = gatewayUrl
  if (ws !== undefined) await ws.close()
  ws = undefined
  updatePipe('Discord', false)
}

async function newMain() {
  const processName = 'Discord.exe'

  if ((await isRunning(processName)) && ws === undefined) startWebSocket()
  else {
    await cleanup()
    watcher(processName, newMain)
  }
}

function discordOperations() {
  setInterval(async () => {
    if (watchingStatus.Discord && ws == undefined) {
      console.log('Discord Service is starting ...')
      startWebSocket()
    } else if (!watchingStatus.Discord && ws !== undefined) {
      console.log('Discord Service is shutting down ...') // TODO: Fix LOG SPAM
      url = gatewayUrl
      await ws.close()
      ws = undefined
    }
  }, 250)
}
