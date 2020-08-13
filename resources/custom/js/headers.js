var $ = function (selector) {
    return document.querySelectorAll(selector);
};

var pane = document.getElementById('pcntm');
var oldPane = pane.cloneNode(true);
var tab = document.getElementById('tab-tab-item');
var tabOld = tab.childNodes[0];


function newRequest() {
    
    var tabItem = tabOld.cloneNode(true);
    tab.childNodes.forEach((tabItem, index) => {
        if (tabItem.classList.contains('active')) {
            tabItem.classList.remove('active');
        }
    });
    
    tabItem.innerHTML = '<span class="icon icon-cancel icon-close-tab"></span> Untitle Request';
    tabItem.classList.add('active');
    tab.appendChild(tabItem);
    pane.innerHTML = oldPane.innerHTML;
    
}