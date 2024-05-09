const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("soundpad", {
  pipeStatus: () => ipcRenderer.invoke("pipe-status"),
  getSounds: () => ipcRenderer.invoke("get-sounds"),
  playSound: () => ipcRenderer.invoke("play-sound"),
});
