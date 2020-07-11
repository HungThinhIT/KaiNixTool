const ipcRenderer = require('electron').ipcRenderer;
const dateFormat = require('dateformat');

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
  setOldUserData(historyMenuApi);    

  // setOldUserData(historyMenuApi);
  
  
  /*
  |-----------------------------------------------
  | Request the Api
  |-----------------------------------------------
  |
  | Collect all data via DOM and execute the api 
  | All data will forward to request.js for 
  | handle and return result.
  |
  |
  */
  document.querySelector('#btnTestAPI').addEventListener('click', async () => { //NOT YET    

    const date = dateFormat(new Date(), "yyyy-mm-dd");
    const idApi = dateFormat(new Date(), "yyyymmddHHMMssL");
    const timeRequest = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:L"); //2020-06-01 15:04:16:09 -> example
    //const isOpen = '' //TODO: WAITING UI is finish.
    //const api = ''//TODO: WAITING UI is finish.
    //const method = ''//TODO: WAITING UI is finish.
    console.log(timeRequest)
    let api = {
      date: date,
      isOpen: true,
      apiEndPoint: [
        {
          id: idApi,
          timeRequest: timeRequest,
          api: 'api.hungthinhit.com/v1/phoenix/is/legend',
          method: 'get'
        }
      ]
    }
    //
    const dataRequest  = ipcRenderer.sendSync('prepare-api-request', (event, api.apiEndPoint))
    console.log(dataRequest);
    ipcRenderer.send('set-executed-api-to-local-store', (event, api))
    

    // ipcRenderer.on
    
  })
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
              <span class="method-link">${data.history[key].apiEndPoint[keyOfApiEP].api}</span>
            </li>\n`
            )).join('')}
          </ul>
        </details>\n`
      );    
  });
  document.querySelector('#dashboard-history > div > div > ul > li').innerHTML = historyMenuApiHtml;
}

function setHistoryCollectionMenu(){}
function setRequestingApiContent(){}

function setOldUserData(historyMenuApi){
  if(historyMenuApi.history.length > 0){
    setHistoryApiMenu(historyMenuApi);
  }
  // setHistoryCollectionMenu(); //TODO: IN PROGRESS
  // setRequestingApiContent(); //TODO: IN PROGRESS
}

function SaveApiToHistory(api){

}

function saveStateHistoryApiMenuCategory(date, isOpen){
  ipcRenderer.send('save-state-category-history-api',( event, {date, isOpen}))
}

