const dateFormat = require('dateformat');

function sortByDate(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function sortByDateTime(a, b){
    return new Date(b.timeRequest).getTime() - new Date(a.timeRequest).getTime();
}

/*
 * return isMergedAndData[0,1]
 * isMergedAndData[0] => return result true/false (True -> same date and else)
 * isMergedAndData[1] => return Api modified object
 */
function mergeSameDateInHistoryApiMenu(targetObject, defaultObject){
    let isMergedAndData = [false, null]

    Object.values(defaultObject).map(Object.values).every(function(elem){
        elem.some((el, index) => {
            console.log(el.date);
            console.log(index);
            if(new Date(el.date).getTime() === new Date(targetObject.date).getTime()){
                console.log("[core.js->mergeSameDateInHistoryApiMenu]->Same date");
                defaultObject.history[index].isOpen = true //Set openTab
                defaultObject.history[index].apiEndPoint.push(targetObject.apiEndPoint[0])
                defaultObject.history[index].apiEndPoint.sort(sortByDateTime)
                
                isMergedAndData[0] = true
                isMergedAndData[1] = defaultObject
                return true
            }
            isMergedAndData[0] = false
            isMergedAndData[1] = null
            return false;
        })
    })
    return isMergedAndData;
}

module.exports = {
    sortByDate,
    mergeSameDateInHistoryApiMenu
}
