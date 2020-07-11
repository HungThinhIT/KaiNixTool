const { sortByDate, mergeSameDateInHistoryApiMenu } = require('./core');

const store = global.share.store;
const ipcMain = global.share.ipcMain;

/*
|-----------------------------------------------
| Get history api menu from local store
|-----------------------------------------------
|
| Get all object history menu from local store
| then sort category by date and return value.
| 
|
|
*/
async function getHistoryApiMenu() {
    const hisApiMenu = await store.get('api-history-menu')
    await hisApiMenu.history.sort(sortByDate)
    return hisApiMenu
}

/*
 * LISTENING ALL REQUEST FROM IPC RENDERER
 */

/*
|-----------------------------------------------
| Get history api menu
|-----------------------------------------------
|
| Call to getHistoryApiMenu() function and
| return value through event.returnValue
| prototype from ipcMain
|
|
*/

ipcMain.on('get-history-api-menu', async (event) => {
    const hisApiMenu = await getHistoryApiMenu()
    event.returnValue = await hisApiMenu
});

/*
|-----------------------------------------------
| Save api history json object to local store
|-----------------------------------------------
|
| Compare with date of old api category (date)
| if it's same, merge it to same category and
| save all to local-store. Then send a event
| to preload.js to parse new history api
|
*/

ipcMain.on('set-executed-api-to-local-store', async (event, api) => {
    let historyApiMenu = await getHistoryApiMenu()
    //Compare date in new request
    let mergeResult = mergeSameDateInHistoryApiMenu(api, historyApiMenu)

    if (mergeResult[0]) {
        store.set('api-history-menu.history', mergeResult[1].history)
        event.sender.send('parse-executed-api-to-history-menu', mergeResult[1])
    }
    else {
        await historyApiMenu.history.push(api)
        await historyApiMenu.history.sort(sortByDate)
        store.set('api-history-menu.history', historyApiMenu.history)
        event.sender.send('parse-executed-api-to-history-menu', historyApiMenu)
    }
})

/*
|-----------------------------------------------
| Save state of category from history menu
|-----------------------------------------------
| 
| Get the object history-menu from local store 
| then set state (isOpen) if date of
| category matched. 
| Save it again to local store
| 
*/

ipcMain.on('save-state-category-history-api', async (event, { date, isOpen }) => {
    let historyApiMenu = await getHistoryApiMenu()
    Object.keys(historyApiMenu.history).forEach(key => {
        if (historyApiMenu.history[key].date.localeCompare(date) == 0) {
            historyApiMenu.history[key].isOpen = isOpen
        }
    })
    store.set('api-history-menu.history', historyApiMenu.history)
})
