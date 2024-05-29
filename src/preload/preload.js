import { contextBridge, ipcRenderer } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

const api = {
  playSound: (index) => ipcRenderer.send('play-sound', index),
  updatePipe: (callback) => ipcRenderer.on('pipe-update', (_event, value) => callback(value)),
  sendSounds: (callback) => ipcRenderer.on('send-sound', (_event, value) => callback(value))
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
