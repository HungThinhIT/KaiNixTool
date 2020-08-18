const ipcRenderer = require('electron').ipcRenderer;
const dateFormat = require('dateformat');
require("./preloads/main/main-screen-preload.js");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

/*
 * IPC_RENDERER ON SEND HERE
 */
const historyMenuApi = ipcRenderer.sendSync('get-history-api-menu');
const collectionMenuApi = ipcRenderer.sendSync('get-collection-api-menu');
// console.log(collectionMenuApi);
/*
 * IPC_RENDERER LISTENER HERE
 */
ipcRenderer.on('parse-executed-api-to-history-menu', (event, apiHistoryMenu) => {
  setHistoryApiMenu(apiHistoryMenu);
})


/*
 * DOM CONTENT_LOADED
*/
window.addEventListener('DOMContentLoaded', () => {
  //Parse old data;
  setOldUserData(historyMenuApi, collectionMenuApi);    
  
  // setOldUserData(historyMenuApi);
  
})  

//Check State of Category Menu (Open or Close)
window.addEventListener("click",  (event) => {
  var isChildCategory = hasParentClass(event.target, "category-history-api");
  var categoryHistoryApiMenu = isChildCategory.parents[isChildCategory.parents.length - 1];
  saveStateHistoryApiMenuCategory(categoryHistoryApiMenu.dataset.historyapidate, !categoryHistoryApiMenu.open)
})



/*
 * All function below.
 */
function setHistoryApiMenu(historyMenuApi){
  var historyMenuApiHtml = '';
  var data = historyMenuApi;  
  Object.keys(data.history).forEach(key => {
    historyMenuApiHtml = historyMenuApiHtml
      .concat(
        `<details class="category-history-api" data-historyApiDate="${data.history[key].date}" ${data.history[key].isOpen == true ? 'open' : ''}>
          <summary>${data.history[key].date}</summary>
          <ul>
            ${Object.keys(data.history[key].apiEndPoint).map(keyOfApiEP => (
            `<li data-api-id="${data.history[key].apiEndPoint[keyOfApiEP].id}">
              <span class="method method-${data.history[key].apiEndPoint[keyOfApiEP].method}">${data.history[key].apiEndPoint[keyOfApiEP].method}</span>
              <span class="method-link">${data.history[key].apiEndPoint[keyOfApiEP].url}</span>
            </li>\n`
            )).join('')}
          </ul>
        </details>\n`
      );    
  });
  document.querySelector('#dashboard-history > div > div > ul > li').innerHTML = historyMenuApiHtml;
}

function setCollectionMenu(collectionMenuApi){
  var collectionMenu = '';
  var data = collectionMenuApi;  
  Object.keys(data).forEach(key => {
    collectionMenu = collectionMenu
      .concat(
        `<details class="category-history-api" data-historyApiDate="${data[key].date}" ${data[key].isOpen == true ? 'open' : ''}>
          <summary>${data[key].date}</summary>
          <ul>
            ${Object.keys(data[key].apiEndPoint).map(keyOfApiEP => (
            `<li data-collection-id="${data[key].apiEndPoint[keyOfApiEP].id}">
              <span class="method method-${data[key].apiEndPoint[keyOfApiEP].method}">${data[key].apiEndPoint[keyOfApiEP].method}</span>
              <span class="method-link">${data[key].apiEndPoint[keyOfApiEP].url}</span>
            </li>\n`
            )).join('')}
          </ul>
        </details>\n`
      );    
  });
  document.querySelector('#dashboard-collection > div > div > ul > li').innerHTML = collectionMenu;
}
function setRequestingApiContent(){}

function setOldUserData(historyMenuApi, collectionMenuApi){
  if(historyMenuApi.history.length > 0){
    setHistoryApiMenu(historyMenuApi);
  }
  setCollectionMenu(collectionMenuApi); //TODO: IN PROGRESS
  // setRequestingApiContent(); //TODO: IN PROGRESS
}

function SaveApiToHistory(api){

}

function saveStateHistoryApiMenuCategory(date, isOpen){
  ipcRenderer.send('save-state-category-history-api',( event, {date, isOpen}))
}

