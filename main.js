// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
var pjson = require("./package.json");
const Store = require('electron-store');

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
  copyright: "Copyright © 2020 Kaiser & Phoenix",
});

console.log("User Data path" + app.getPath('userData'));

/*
* SAMPLE ELECTRON-STORE
*/
const store = new Store();

async function restoreHistoryApiMenu(){
    const hisApiMenu = await store.get('api-history-menu')
    return hisApiMenu
    
}

/*
 * LISTENING ALL REQUEST FROM IPC RENDERER
 */
ipcMain.on('menu-history-api', async(event) => {
  const hisApiMenu = await restoreHistoryApiMenu()
  event.returnValue = await hisApiMenu
});

// TODO: IN PROGESS

// ipcMain.on('send-api', async(event, arg) => {
//   console.log("SEND_API_IN_MAIN_IS_RUNNING");
//   console.log(arg);
  
//   event.sender.send('rec-api-history',' OK OK OK')
// })

// let historyMenu = {
//   history: [
//     date
//     isOpen,
//     {
//       apiEndPoint : [
//         api,
//         method
//       ]
//     },
      
    
//   ]
// }

// let historyMenu = {
//   history: [
//     {
//       date: 'Today',
//       isOpen: true,
//       apiEndPoint: [
//         {
//           api: 'api.hungthinhit.com/v1/phoenix/is/legend',
//           method: 'get'
//         },
//         {
//           api: 'api.hungthinhit.com/v1/phoenix/is/legend2',
//           method: 'post'
//         },
//         {
//           api: 'api.hungthinhit.com/v1/phoenix/is/legend-never-die',
//           method: 'put'
//         }
//       ]
//     },
//     {
//       date: '07101999',
//       isOpen: false,
//       apiEndPoint: [
//         {
//           api: 'api.hungthinhit.com/v1/phoenix/is/legend',
//           method: 'delete'
//         }
//       ]
//     }
//   ]
// }
// console.log(historyMenu.history);

// // historyMenu.history.date = 'Today';
// // historyMenu.history.push({date : "Today", "isOpen": false, apiEndPoint: [ api = 'apineee', method = 'get']});

// // store.set('api-history-menu',historyMenu);
// // store.set('history[].isOpen',true);

// // store.set('unicorn', '🦄');
// // console.log(store.get('unicorn'));
// // //=> '🦄'

// // // Use dot-notation to access nested properties
// // store.set('foo.bar', true);
// obbjhs = store.get('api-history-menu.history');
// console.log("-=-=");

// Object.keys(obbjhs).forEach(key => {
//   console.log(obbjhs[key].date)
//   });
// // //=> {bar: true}

// // store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined