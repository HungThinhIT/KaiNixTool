// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
var pjson = require("./package.json");
const Store = require('electron-store');
const fs = require('fs');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("views/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.setAboutPanelOptions({
  applicationName: "KaiNix",
  applicationVersion: "Version",
  version: pjson.version,
  copyright: "Copyright © 2020 Kaiser & Phoenix & SinJunior",
});

console.log("User Data path" + app.getPath('userData'));

/*
* SAMPLE ELECTRON-STORE
*/
const store = new Store();

global.share = { ipcMain, store};

if (!fs.existsSync(`${app.getPath('userData')}\\config.json`)) 
  store.set('api-history-menu.history',[]);

/*
 * LOGIC Files
 */
require("./controllers/request");
require("./controllers/menu");
