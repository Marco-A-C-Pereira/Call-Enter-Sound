import { contextBridge, ipcRenderer } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

const api = {
  playSound: () => ipcRenderer.invoke('play-sound'),
  updatePipe: (callback) => ipcRenderer.on('pipe-update', (_event, value) => callback(value))
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
