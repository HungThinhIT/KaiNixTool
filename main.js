// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
var pjson = require("./package.json");
const Store = require('electron-store');
const { sortByDate, mergeSameDateInHistoryApiMenu } = require('./controllers/core');

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

async function getHistoryApiMenu(){
    const hisApiMenu = await store.get('api-history-menu')
    await hisApiMenu.history.sort(sortByDate)
    return hisApiMenu
}

/*
 * LISTENING ALL REQUEST FROM IPC RENDERER
 */
ipcMain.on('menu-history-api', async(event) => {
  const hisApiMenu = await getHistoryApiMenu()
  event.returnValue = await hisApiMenu
});

ipcMain.on('send-api', async(event, api) => {
  let historyApiMenu = await getHistoryApiMenu()
  //Compare date in new request
  let mergeResult = await mergeSameDateInHistoryApiMenu(api, historyApiMenu)
  
  if(mergeResult[0]){
    await store.set('api-history-menu.history', mergeResult[1].history)    
    event.sender.send('excuted-api', mergeResult[1])
  }
  else{
    await historyApiMenu.history.push(api)
    await historyApiMenu.history.sort(sortByDate)
    await store.set('api-history-menu.history', historyApiMenu.history)
    event.sender.send('excuted-api', historyApiMenu)
  }
})

// TODO: IN PROGESS
/*
 * Save state open/close of history api menu bar
 */
ipcMain.on('save-state-menu-history-api', async(event, {date, isOpen}) => {  
  let historyApiMenu = await getHistoryApiMenu()  
  Object.keys(historyApiMenu.history).forEach(key => {    
    if(historyApiMenu.history[key].date.localeCompare(date) == 0){
      historyApiMenu.history[key].isOpen = isOpen
    }
  })
  store.set('api-history-menu.history', historyApiMenu.history)
})