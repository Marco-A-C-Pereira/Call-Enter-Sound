import Store from 'electron-store'

const schema = {
  selectedSound: {
    type: 'string',
    default: '1'
  },
  gatewayToken: { type: 'string', default: '' },
  playOnUnmute: { type: 'boolean', default: false },
  playOnSpeakers: { type: 'boolean', default: true }
}

export const electronStore = new Store({ schema })
