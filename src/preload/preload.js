import { contextBridge, ipcRenderer } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

const api = {
  sendMsg: (callback) => ipcRenderer.on('send-msg', (_event, value) => callback(value)),
  reciveMsg: (msg) => ipcRenderer.send('recive-msg', msg),
  playSound: () => ipcRenderer.invoke('play-sound')
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
