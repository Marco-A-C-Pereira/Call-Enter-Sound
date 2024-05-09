import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("soundpad", {
  playSound: () => ipcRenderer.invoke("play-sound"),
});
