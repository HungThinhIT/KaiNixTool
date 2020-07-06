const { sortByDate, mergeSameDateInHistoryApiMenu } = require('./core');

const store = global.share.store;
const ipcMain = global.share.ipcMain;

async function getHistoryApiMenu() {
    const hisApiMenu = await store.get('api-history-menu')
    await hisApiMenu.history.sort(sortByDate)
    return hisApiMenu
}

/*
 * LISTENING ALL REQUEST FROM IPC RENDERER
 */


ipcMain.on('menu-history-api', async (event) => {
    const hisApiMenu = await getHistoryApiMenu()
    event.returnValue = await hisApiMenu
});

ipcMain.on('send-api', async (event, api) => {
    let historyApiMenu = await getHistoryApiMenu()
    //Compare date in new request
    let mergeResult = mergeSameDateInHistoryApiMenu(api, historyApiMenu)

    if (mergeResult[0]) {
        store.set('api-history-menu.history', mergeResult[1].history)
        event.sender.send('excuted-api', mergeResult[1])
    }
    else {
        await historyApiMenu.history.push(api)
        await historyApiMenu.history.sort(sortByDate)
        store.set('api-history-menu.history', historyApiMenu.history)
        event.sender.send('excuted-api', historyApiMenu)
    }
})

// TODO: IN PROGESS
/*
 * Save state open/close of history api menu bar
 */
ipcMain.on('save-state-menu-history-api', async (event, { date, isOpen }) => {
    let historyApiMenu = await getHistoryApiMenu()
    Object.keys(historyApiMenu.history).forEach(key => {
        if (historyApiMenu.history[key].date.localeCompare(date) == 0) {
            historyApiMenu.history[key].isOpen = isOpen
        }
    })
    store.set('api-history-menu.history', historyApiMenu.history)
})
