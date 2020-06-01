const ipcRenderer = require('electron').ipcRenderer;

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
 * GET HISTORY DATA FROM IPC Main
 */
const historyMenuApi = ipcRenderer.sendSync('menu-history-api');

/*
 * All function below.
 */
function setHistoryApiMenu(){
  var historyMenuApiHtml = '';
  var data = historyMenuApi;  
  Object.keys(data.history).forEach(key => {    
    historyMenuApiHtml = historyMenuApiHtml
      .concat(
        `<details ${data.history[key].isOpen == true ? 'open' : ''}>
          <summary>${data.history[key].date}</summary>
          <ul>
            ${Object.keys(data.history[key].apiEndPoint).map(keyOfApiEP => (
            `<li>
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

function setOldUserData(){
  setHistoryApiMenu();
  // setHistoryCollectionMenu(); //TODO: IN PROGRESS
  // setRequestingApiContent(); //TODO: IN PROGRESS
}


window.addEventListener('DOMContentLoaded', () => {
  setOldUserData();
  document.querySelector('#btnTestAPI').addEventListener('click', async () => { //NOT YET
    // ipcRenderer.send('send-api', his)
  })
})
