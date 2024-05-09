const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("soundpad", {
  playSound: () => ipcRenderer.invoke("play-sound"),
});
