import { contextBridge, ipcRenderer } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

const api = {
  playSound: (index) => ipcRenderer.send('play-sound', index),
  updatePipe: (callback) => ipcRenderer.on('pipe-update', (_event, value) => callback(value)),
  sendSounds: (callback) => ipcRenderer.on('send-sound', (_event, value) => callback(value))
}

const storage = {
  get: (key) => ipcRenderer.sendSync('get-storage', key),
  set: (key, data) => ipcRenderer.send('set-storage', key, data)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('storage', storage)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
