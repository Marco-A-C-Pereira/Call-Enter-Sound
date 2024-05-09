import { app, BrowserWindow, ipcMain } from "electron";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

import {
  handlePlaySound,
  handleSoundpadStatus,
  handleGetSounds,
} from "./handlers.js";

function createWindow() {
  const directory = dirname(fileURLToPath(import.meta.url));

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(directory, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("electronJs/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  addIpcMainChannels();
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

function addIpcMainChannels() {
  ipcMain.handle("play-sound", handlePlaySound);
  ipcMain.handle("get-sounds", handleGetSounds);
  ipcMain.handle("pipe-status", handleSoundpadStatus);
}
