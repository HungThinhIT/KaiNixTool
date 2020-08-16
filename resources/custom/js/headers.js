var $ = function (selector) {
    return document.querySelectorAll(selector);
};

var srcs = [
    "../resources/custom/js/content-main-child.js",
    "../resources/custom/js/preloadDashboard.js",
    "../resources/custom/js/frame-list.js"
]

var pane = document.getElementById('pcntm');
const oldPane = pane.cloneNode(true);
var tab = document.getElementById('tab-tab-item');
const tabOld = tab.childNodes[0];

function load_js(src)
{
    var reload = document.getElementById('reload-js');
    // var scriptTemp = $('script[src="'+src+'"]')
    // console.log(scriptTemp);
    if (reload.childNodes.length > 0) {
        reload.childNodes.forEach((child, index) => {
            var srcSub = src.substr(2, src.length - 2);
            if (String(child.src).includes(srcSub)) {
                reload.removeChild(child);
            }
        })
    }
    var script= document.createElement('script');
    script.src= src;
    reload.appendChild(script);
}

function newRequest() {
    
    var tabItem = tabOld.cloneNode(true);
    tab.childNodes.forEach((tabItem, index) => {
        if (tabItem.classList.contains('active')) {
            tabItem.classList.remove('active');
        }
    });
    
    tabItem.innerHTML = '<span class="icon icon-cancel icon-close-tab"></span> Untitle Request';
    tabItem.setAttribute('data-api-id', '');
    tabItem.classList.add('active');
    tabItem.addEventListener('click', function() {
        var apiId = this.getAttribute('data-api-id');
        console.log(this.getAttribute('data-api-id'));
        // TODO: get all request data for this ID 
        if (apiId) {
            ipcRenderer.send('find-data-via-menu-id', (event, apiId))
            srcs.forEach((src, index) => {
                load_js(src);
            });
        }
        else {
            pane.innerHTML = oldPane.innerHTML;
            srcs.forEach((src, index) => {
                load_js(src);
            });
        }
        // End TODO
    });
    tab.appendChild(tabItem);
    pane.innerHTML = oldPane.innerHTML;
    srcs.forEach((src, index) => {
        load_js(src);
    });
}