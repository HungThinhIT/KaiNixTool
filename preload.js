const fs = require('fs')
const fileContents = fs.readFileSync('./data/menu-history.json', 'utf8')

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

//Load menu-history and parse all old data
console.log("Hello.");
var data;
try {
  data = JSON.parse(fileContents)
  // console.log(data.history);

} catch (err) {
  console.error(err)
}
var historyMenuHtml = '';
Object.keys(data.history).forEach(key => {
  historyMenuHtml = historyMenuHtml.concat(`<details ${data.history[key].isOpen == true ? 'open' : '' }>
    <summary>${data.history[key].date}</summary>
    <ul>
      ${Object.keys(data.history[key].apiEndPoint).map(keyOfApiEP => (
      `
      <li><span class="method method-${data.history[key].apiEndPoint[keyOfApiEP].method}">${data.history[key].apiEndPoint[keyOfApiEP].method}</span><span class="method-link">${data.history[key].apiEndPoint[keyOfApiEP].api}</span></li>\n`
      )).join('')}
    </ul>
  </details>\n`);
});
  console.log(historyMenuHtml);


window.addEventListener('DOMContentLoaded', () => {
  console.log(document);
  document.querySelector('#dashboard-history > div > div > ul > li').innerHTML = historyMenuHtml;
  
})