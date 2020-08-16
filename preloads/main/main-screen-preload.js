const ipcRenderer = require('electron').ipcRenderer;
const dateFormat = require('dateformat');


window.addEventListener('DOMContentLoaded', () => {
    
    var tab = document.getElementById('tab-tab-item');
    const tabOld = tab.childNodes[0];
    var pane = document.getElementById('pcntm');
    const oldPane = pane.cloneNode(true);
    const sendButton = document.getElementById('send');
    /*
    |-----------------------------------------------
    | DOM Data from FE and send it via IPC
    |-----------------------------------------------
    |
    | DOM all data from UI like url, method, header
    | authentication, and merge it into an object,
    | then send to IPC for handle
    |
    |
    */
    docReady(() => {
        document.querySelector('#send').addEventListener('click', async () => { //NOT YET    
            var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
            var titleResponse = document.getElementById('title-response');
            var gifPreload = document.getElementsByClassName('gif-pre-load')[0];               
            preloadResponse.style.display = 'block';
            titleResponse.style.display = 'none';
            gifPreload.style.display = 'block';
            var errorEle = document.getElementById('error-log-response');
            errorEle.style.display = 'none';
            
            var url = document.getElementsByName("path")[0].value;
            console.log(url);
            var ls = {};
            if (url.length > 0) {
                ls = url.split('?');
                if (ls[1] != undefined) {
                    if (ls[0].length <= 0) url = "http://localhost?" + ls[1];
                    else if (ls[0].includes("https://") || ls[0].includes("http://")) {
                        url = ls[0] + "?" + ls[1];
                    }
                }
                
            }
            else {
                url = "http://localhost";
            }
        
            var tbodyHeaders = document.getElementById("tbody-headers");
            var tbodyBodys = document.getElementById("tbody-forms");
            var oauthCheck = document.getElementsByName('authorize-type');
            var methodRequest = document.getElementsByName("method-request");
            var methodType = methodRequest[0].value;
        
            var authValue = oauthCheck[0].value;
            var isAuthentication = false;
            var authContent = "";
            if (authValue != "none") {
                if ("oauth-2".localeCompare(authValue) == 0) authValue = "Bearer";
                isAuthentication = true;
                authContent = document.getElementsByName("auth-token")[0].value;
                if (!authContent.includes("Bearer")) {
                    authContent = authContent.trim();
                    if (authContent.length > 1) {
                        var authList = authContent.split(/\s/g);
                        authContent = "";
                        authList.forEach( function(element, index) {
                            authContent += element;
                        });
                    }
                }
                else {
                    authContent = authContent.substr("Bearer ".length - 1, authContent.length - 1);
                    authContent = authContent.trim();
                    if (authContent.length > 1) {
                        var authList = authContent.split(/\s/g);
                        authContent = "";
                        authList.forEach( function(element, index) {
                            authContent += element;
                        });
                    }
                }
            }
        
            // Authentication
            var authen = {
                type: authValue,
                isAuthen: isAuthentication,
                token: authContent
            }
        
            // Header
            var trHeadersParent = tbodyHeaders.childNodes;
            var headersParams = {}
            var countHeader = 0;
            trHeadersParent.forEach( function(element, index) {
                if (element.tagName == 'TR') {
                    var param = {}
                    var tdParams = element.childNodes;
                    var isCheck = tdParams[1].childNodes[1].checked;
                    var key = tdParams[3].childNodes[1].value;
                    var value = tdParams[5].childNodes[1].value;
                    var description = tdParams[7].childNodes[1].value;
                    if (isCheck == true) {
                        headersParams[countHeader] = {
                            isCheck: isCheck,
                            key: key,
                            value: value,
                            description: description
                        }
                        countHeader++;
                    }
                }
            });
            if (countHeader == 0) headersParams = {};
        
            // Body
            var checkValueForm = "none";
            var formCheck = document.getElementsByName('body-form');
            formCheck.forEach( function(element, index) {
                if (element.checked) {
                    checkValueForm = element.value;
                }
            });
            var body = {}
            if (checkValueForm != "none") {
                if (checkValueForm == "form-data") {
                    body.type = checkValueForm;
                    var trBodyParent = tbodyBodys.childNodes;
                    var countBody = 0;
                    trBodyParent.forEach( function(element, index) {
                        if (element.tagName == 'TR') {
                            var tdParams = element.childNodes;
                            var isCheck = tdParams[1].childNodes[1].checked;
                            var key = tdParams[3].childNodes[1].value;
                            var value = tdParams[5].childNodes[1].value;
                            var description = tdParams[7].childNodes[1].value;
                            if (isCheck == true) {
                                body[countBody] = {
                                    isCheck: isCheck,
                                    key: key,
                                    value: value,
                                    description: description
                                }
                                countBody++;
                            }
                        }
                    });
                    if (countBody == 0) body = {};
                }
                else if (checkValueForm == "raw"){
                    body.type = checkValueForm;
                    
                }
            }
        
            var data = { 
                Req: {
                    Url: url,
                    Authen: authen,
                    Headers: headersParams,
                    Body: body,
                    Type: methodType
                }
            }
        
            // console.log(data);
        
            // Test preload response => 
            // setTimeout(function() {
            //     titleResponse.style.display = 'block';
            //     gifPreload.style.display = 'none';
            //     var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
            //     preloadResponse.style.display = 'none';
            // }, 1000);
        
            // Change above code by below code
        
            // titleResponse.style.display = 'block';
            // gifPreload.style.display = 'none';
            // var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
            // preloadResponse.style.display = 'none';
        
        
            // Test show response data 
        
            // var response = {
            // 	header: {
            // 		0: {
            // 			key: "Content-type",
            // 			value: "application/json"
            // 		},
            // 		1: {
            // 			key: "Content-type",
            // 			value: "application/json"
            // 		},
            // 		2: {
            // 			key: "Content-type",
            // 			value: "application/json"
            // 		},
            // 	},
            // 	time: 100,
            // 	size: 100,
            // 	statusCode: 200,
            // 	data: {data:"fa", fa:"data"},
            // 	request: ""
            // }
            // responseData(response);
            
            const date = dateFormat(new Date(), "yyyy-mm-dd");
            const idApi = dateFormat(new Date(), "yyyymmddHHMMssL");
            const timeRequest = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:L"); //2020-06-01 15:04:16:09 -> example
            //const isOpen = '' //TODO: WAITING UI is finish.
            //const api = ''//TODO: WAITING UI is finish.
            //const method = ''//TODO: WAITING UI is finish.
            let api = {
                date: date,
                isOpen: true,
                apiEndPoint: [{
                    id: idApi,
                    timeRequest: timeRequest,
                    url: data.Req.Url,
                    method: data.Req.Type,
                    headers: data.Req.Headers,
                    authenticate: data.Req.Authen,
                    body: data.Req.Body
                }],
            }
            //
            console.log(data);
            console.log("=================");
            console.log(api);
            // const dataResponse  = ipcRenderer.sendSync('send-api-request', (event, api.apiEndPoint[0]))
            
            // var dataResponse = null;
            // var errorLog = document.getElementById('error-log');
            ipcRenderer.send('send-api-request', (event, api))
        })
    })
    

    /**
     * GET all request data by api-data-id when click li element
     * 
     */
    // window.onclick = function() {
    //     var $ = function (selector) {
    //         return document.querySelectorAll(selector);
    //     };
    //     var nodes = $('[data-api-id]');
    //     nodes.forEach(function(li, index) {
    //         if (li.getAttribute('click') !== 'true') {
    //             li.addEventListener('click', function() {
    //                 var apiId = this.getAttribute('data-api-id');
    //                 console.log(this.getAttribute('data-api-id'));
    //                 // TODO: get all request data for this ID 
    //                 ipcRenderer.send('find-data-via-menu-id', (event, apiId))
    //                 // End TODO
    //             });
    //         }
    //     });
    //     nodes.forEach(function(li, index) {
    //         if (li.getAttribute('click') === 'true') {
    //             li.removeEventListener('click');
    //         }
    //     });
    // }
    docReady(() => {
        var $ = function (selector) {
            return document.querySelectorAll(selector);
        };
        var nodes = $('[data-api-id]');
        nodes.forEach(function(li, index) {
            if (li.getAttribute('click') !== 'true') {
                li.addEventListener('click', function() {
                    var apiId = this.getAttribute('data-api-id');
                    // console.log(this.getAttribute('data-api-id'));
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
            }
        });
        
        srcs.forEach((src, index) => {
            load_js(src);
        });
        nodes.forEach(function(li, index) {
            if (li.getAttribute('click') === 'true') {
                li.removeEventListener('click');
            }
        });
    });
});

    /*
    |-----------------------------------------------
    | IPC ON Response api requested and fill to UI
    |-----------------------------------------------
    |
    | When the api executed and send response, this
    | function will listen and check, then fill
    | data to UI
    |
    |
    */
    ipcRenderer.on('response-api-data', (event, dataResponse) => {
        const method = document.getElementById('method-request')[0].value;
        const timeRequest = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:L");
        var errorLog = document.getElementById('error-log');
        try {
            console.log("DATA_RESPONSE IN [main-screen-preload.js]");
            console.log(dataResponse);
            errorLog.style.display = "none";
            if (typeof(dataResponse) != null) {
                fillResponseData(dataResponse);
            }
        } catch (error) {
            console.log(error);
            //2 CASE ERROR
            // CHECK IF error.isFatalError = true and ELSE
            // fillWrongData(method, timeRequest, error);
            fillWrongData(error);
        }
    })

    /*
    |-----------------------------------------------
    | Get data when click an element in left menu 
    |-----------------------------------------------
    |
    | 
    | 
    | 
    |
    |
    */
    ipcRenderer.on('response-data-in-menu-history', (event, apiRequested) => {
        console.log(apiRequested);
        addTabItem(apiRequested);
    })

    /**
     * 
     * @param {*} apiRequested
     * 
     * Check exist and add new Tab Item 
     */
    
    function addTabItem(apiRequested) {
        var id = apiRequested.id;
        var name = apiRequested.url;
        var tab = $('#tab-tab-item');
        // console.log(tab)
        var tabItem = tabOld.cloneNode(true);
        var exist = false;
        
        if (tab[0].childNodes.length > 1) {
            tab[0].childNodes.forEach(function(item, index) {
                console.log(item.getAttribute('data-api-id'))
                // console.log(id)
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
                if (item.getAttribute('data-api-id') === id) {
                    exist = true;
                }
                // console.log(item)
                fillRequest(apiRequested);
            })
        } else {
            if (tab[0].childNodes.length === 1) {
                var item = tab[0].childNodes[0];
                // console.log(item)
                // console.log(id)
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
                if (item.getAttribute('data-api-id') === id) {
                    exist = true;
                }
                // console.log(item)
                fillRequest(apiRequested);
            }
        }
        // console.log(exist);
        
        if (!exist) {
            if (!tabItem.classList.contains('active')) {
                tabItem.classList.add('active');
            }
            tabItem.innerHTML = '<span class="icon icon-cancel icon-close-tab"></span>' + name;
            tabItem.setAttribute("data-api-id", id);
            tabItem.addEventListener('click', function() {
                var apiId = this.getAttribute('data-api-id');
                // console.log(this.getAttribute('data-api-id'));
                fillRequest(apiRequested);
                srcs.forEach((src, index) => {
                    load_js(src);
                });
                // TODO: get all request data for this ID 
                // End TODO
            });
            // console.log(apiRequested)
            tab[0].appendChild(tabItem);
            fillRequest(apiRequested);
            srcs.forEach((src, index) => {
                load_js(src);
            });
        }
        else {
            tab[0].childNodes.forEach((tabItem, index) => {
                if (tabItem.getAttribute('data-api-id') === id) {
                    tabItem.classList.add('active');
                }
            })
            fillRequest(apiRequested);
            srcs.forEach((src, index) => {
                load_js(src);
            });
        }
        
    }

    function fillRequest(request) {
        pane.innerHTML = oldPane.innerHTML;
        // console.log(request)
        var methodOption = document.getElementById('method-request');
        var path = document.getElementById('path');
        var tbodyParam = document.getElementById('tbody-params')
        var authorizeType = document.getElementById('authorize-type')
        var tbodyHeader = document.getElementById('tbody-headers')
        var tbodyForms = document.getElementById('tbody-forms')
        var authToken = document.getElementById('auth-token')
        tbodyForms.childNodes.forEach(function(item, index) {
            if (item.nodeName === '#text') tbodyForms.removeChild(item);
        })
        tbodyHeader.childNodes.forEach(function(item, index) {
            if (item.nodeName === '#text') tbodyHeader.removeChild(item);
        })
        tbodyParam.childNodes.forEach(function(item, index) {
            if (item.nodeName === '#text') tbodyParam.removeChild(item);
        })
        // console.log(authorizeType)
        // console.log(path)
        // console.log(authToken)

        /**
         * Check and fill data for request
         */
        var url = request.url
        var method = request.method
        var headers = request.headers
        var body = request.body
        var authen = request.authenticate

        path.value = url

        methodOption.childNodes.forEach(function(item, index) {
            if (item.value === method) item.setAttribute('selected', 'selected')
        })

        if (authen.isAuthen == true) {
            authorizeType.childNodes.forEach(function(item, index) {
                if(item.value === authen.type) item.setAttribute('selected', 'selected')
            })
            var authContent = document.getElementById("authorization-content-right");
  
            authContent.innerHTML = "";
            var txt = '<div class="col-12 d-flex">' +
                                '<div class="col-3">Bearer Token</div>' +
                                '<div class="col-9 ">' +
                                '<input class="full-width" value="'+ authen.token +'" type="text" name="auth-token"' + 'id="auth-token">' +
                                '</div>' +
                            '</div>';
            authContent.innerHTML = txt;
            // authorizeType.value = authen.type
            
        } else {
            authorizeType.childNodes.forEach(function(item, index) {
                if(item.value === authen.type) item.setAttribute('selected', 'selected')
            })
            var authContent = document.getElementById("authorization-content-right");
            authContent.innerHTML = null;
        }

        if (!isEmpty(headers)) {
            tbodyHeader.deleteRow(tbodyHeader.rows.length - 1)
            var trChild = tbodyHeader.childNodes[0];
            console.log(trChild.childNodes[1])
            var count = 0;
            Object.keys(headers).forEach(key => {
                if (count > 0) {
                    trChild = tbodyHeader.childNodes[0].cloneNode(true);
                    trChild.childNodes[1].childNodes[1].selected = headers[key].isCheck;
                    trChild.childNodes[3].childNodes[1].value = headers[key].key;
                    trChild.childNodes[5].childNodes[1].value = headers[key].value;
                    trChild.childNodes[7].childNodes[1].value = headers[key].description;
                    tbodyHeader.appendChild(trChild);
                }
                else {
                    trChild.childNodes[1].childNodes[1].selected = headers[key].isCheck;
                    trChild.childNodes[3].childNodes[1].value = headers[key].key;
                    trChild.childNodes[5].childNodes[1].value = headers[key].value;
                    trChild.childNodes[7].childNodes[1].value = headers[key].description;
                }
                count+=1;
            });
            trChild = tbodyHeader.childNodes[0].cloneNode(true);
            trChild.childNodes[1].childNodes[1].selected = false;
            trChild.childNodes[3].childNodes[1].value = "";
            trChild.childNodes[5].childNodes[1].value = "";
            trChild.childNodes[7].childNodes[1].value = "";
            trChild.setAttribute('id', 'last-row-headers');
            tbodyHeader.appendChild(trChild);
        }
        else {

        }

        if (!isEmpty(body)) {
            tbodyForms.deleteRow(tbodyForms.rows.length - 1)
            var trChild = tbodyForms.childNodes[0];
            console.log(trChild.childNodes[1])
            var count = 0;
            Object.keys(headers).forEach(key => {
                if (count > 0) {
                    trChild = tbodyForms.childNodes[0].cloneNode(true);
                    trChild.childNodes[1].childNodes[1].selected = headers[key].isCheck;
                    trChild.childNodes[3].childNodes[1].value = headers[key].key;
                    trChild.childNodes[5].childNodes[1].value = headers[key].value;
                    trChild.childNodes[7].childNodes[1].value = headers[key].description;
                    tbodyForms.appendChild(trChild);
                }
                else {
                    trChild.childNodes[1].childNodes[1].selected = headers[key].isCheck;
                    trChild.childNodes[3].childNodes[1].value = headers[key].key;
                    trChild.childNodes[5].childNodes[1].value = headers[key].value;
                    trChild.childNodes[7].childNodes[1].value = headers[key].description;
                }
                
                
                count+=1;
            });
            trChild = tbodyForms.childNodes[0].cloneNode(true);
            trChild.childNodes[1].childNodes[1].selected = false;
            trChild.childNodes[3].childNodes[1].value = "";
            trChild.childNodes[5].childNodes[1].value = "";
            trChild.childNodes[7].childNodes[1].value = "";
            trChild.setAttribute('id', 'last-row-headers');
            tbodyForms.appendChild(trChild);
        }
        else {

        }

        if (url.includes('?')) {
            var ls = url.split('?')
            if (ls[1].length > 0) {
                if (ls[1].includes('&')) {
                    var pairLs = ls[1].split('&')
                    if (pairLs.length > 1) {
                        tbodyParam.deleteRow(tbodyParam.rows.length - 1)
                        pairLs.forEach(function(item, index) {
                            if (item.includes('=')) {
                                var pair = item.split('=');
                                var trParam = tbodyParam.childNodes[0].cloneNode(true);
                                trParam.childNodes[1].childNodes[1].checked= true;
                                trParam.childNodes[3].childNodes[1].value = pair[0];
                                trParam.childNodes[5].childNodes[1].value = pair[1];
                                tbodyParam.appendChild(trParam);
                            }
                        })
                        var trParam = tbodyParam.childNodes[0].cloneNode(true);
                        trParam.childNodes[1].childNodes[1].checked= false;
                        trParam.childNodes[3].childNodes[1].value = "";
                        trParam.childNodes[5].childNodes[1].value = "";
                        trParam.setAttribute('id', 'last-row-params');
                        tbodyParam.appendChild(trParam);
                    }
                    else {
                        if (pairLs[0].includes('=')) {
                            var pair = pairLs[0].split('=');
                            var trParam = tbodyParam.childNodes[0];
                            trParam.childNodes[1].childNodes[1].checked= true;
                            trParam.childNodes[3].childNodes[1].value = pair[0];
                            trParam.childNodes[5].childNodes[1].value = pair[1];
                        }
                    }
                }
                else {
                    if (ls[1].includes('=')) {
                        var pair = ls[1].split('=');
                        var trParam = tbodyParam.childNodes[0];
                        trParam.childNodes[1].childNodes[1].checked= true;
                        trParam.childNodes[3].childNodes[1].value = pair[0];
                        trParam.childNodes[5].childNodes[1].value = pair[1];
                    }
                }
            }
        } else {

        }

        var preloadResponse = document.getElementById('pre-load-response')
        var errorLogResponse = document.getElementById('error-log-response')
        errorLogResponse.style.display = 'none';
        preloadResponse.style.display = 'block';
    }
    
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    function fillWrongData(error) {
        var errorEle = document.getElementById('error-log-response');
        errorEle.style.display = 'block';
        var errorContentEle = document.getElementById('error-content');
        errorContentEle.innerText = error;
        var titleResponse = document.getElementById('title-response');
        var gifPreload = document.getElementsByClassName('gif-pre-load')[0];
        titleResponse.style.display = 'block';
        gifPreload.style.display = 'none';
        var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
        preloadResponse.style.display = 'none';
    }

function fillWrongDatav2(method, requestTime, error) {
    /**
     * Set hide preview
     */
    var titleResponse = document.getElementById('title-response');
    var gifPreload = document.getElementsByClassName('gif-pre-load')[0];
    titleResponse.style.display = 'block';
    gifPreload.style.display = 'none';
    var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
    preloadResponse.style.display = 'none';

    /**
     * Get data from response package
     */
    // var headersResponse = responseData.headers;
    // var bodyResponse = responseData.responseBody;
    // var statusCode = responseData.statusCode;
    // var timeRequest = responseData.timeMs;
    // var size = responseData.size;
    // var originRequest = responseData.originRequest;

    /**
     * DOM element
     */
    var requestResponseType = document.getElementById('response-request-type');
    var responseStatus = document.getElementById('response-status');
    var responseTime = document.getElementById('response-time');
    var responseSize = document.getElementById('response-size');
    var textareaPretty = document.getElementById('textarea-pretty');
    var textareaRaw = document.getElementById('textarea-raw');
    var preview = document.getElementById('load-preview');
    var cookies = document.getElementById('load-cookies');
    var tbodyResponseTable= document.getElementById('tbody-response-table');
    var responseHeader = document.getElementById('response-header');
    var trChild = tbodyResponseTable.childNodes[1];
    var status = status = "404 Not Found";
    requestTime = new Date(requestTime);
    var currentTime = new Date();
    var time = currentTime - requestTime;
    var size = undefined;
    if (size == undefined) size = "0 B";
    else {
        size += " B";
    }

    var methodType = method;

    responseStatus.innerText = status;
    responseTime.innerText = time + ' ms';
    responseSize.innerText = size;
    requestResponseType.innerText = methodType.toUpperCase();

    responseHeader.style.display = "none";
    textareaPretty.value = error;
    textareaRaw.value = error;
    preview.innerHTML = error;
}

function fillResponseData(responseData) {
    

    /**
     * Get data from response package
     */
    var headersResponse = responseData.responseHeaders;
    var bodyResponse = responseData.responseBody;
    var statusCode = responseData.statusCode;
    var timeRequest = responseData.timeMs;
    var size = responseData.size;
    var originRequest = responseData.originRequest;
    var isFatalError = responseData.isFatalError;
    if (!isFatalError) {

        ipcRenderer.send('set-executed-api-to-local-store', (event, responseData.stockOriginRequest))

        /**
         * Set hide error content
         */
        var errorEle = document.getElementById('error-log-response');
        errorEle.style.display = 'none';
        var errorContentEle = document.getElementById('error-content');
        errorContentEle.innerText = "";
        /**
         * Set hide preview
         */
        var titleResponse = document.getElementById('title-response');
        var gifPreload = document.getElementsByClassName('gif-pre-load')[0];
        titleResponse.style.display = 'block';
        gifPreload.style.display = 'none';
        var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
        preloadResponse.style.display = 'none';
        /**
         * DOM element
         */
        var requestResponseType = document.getElementById('response-request-type');
        var responseStatus = document.getElementById('response-status');
        var responseTime = document.getElementById('response-time');
        var responseSize = document.getElementById('response-size');
        var textareaPretty = document.getElementById('textarea-pretty');
        var textareaRaw = document.getElementById('textarea-raw');
        var preview = document.getElementById('load-preview');
        var loadCookies = document.getElementById('load-cookies');
        var cookies = document.getElementById('cookies');
        var tbodyResponseTable= document.getElementById('tbody-response-table');
        var trChild = null;
        if (tbodyResponseTable.childNodes.length > 3) {
            while(tbodyResponseTable.hasChildNodes())
            {
                if (tbodyResponseTable.childNodes.length < 2) break;
                tbodyResponseTable.removeChild(tbodyResponseTable.firstChild);
            }
            trChild = tbodyResponseTable.childNodes[0];
        } else {
            trChild = tbodyResponseTable.childNodes[1];
        }
        
        var responseHeader = document.getElementById('response-header');
        loadCookies.style.display = "block";
        cookies.style.display = 'none';
        var status = "";
        switch (statusCode) {
            case 200:
                status = "200 Ok";
                break;
            case 201:
                status = "201 Created";
                break;
            case 203:
                status = "203";
                break;
            case 204:
                status = "204 No Content";
                break;
            case 400:
                status = "400 Bad Request";
                break;
            case 401:
                status = "401 Unauthorized";
                break;
            case 403:
                status = "403 Forbidden";
                break;
            case 404:
                status = "404 Not Found";
                break;
            case 409:
                status = "409 Conflict";
                break;
            case 500:
                status = "500 Internal Server Error";
                break;
            case 501:
                status = "501 Not Implemented";
                break;
            case 502:
                status = "502 Bad Gateway";
                break;
            case 503:
                status = "503 Service Unavailable";
                break;
            case 504:
                status = "504 Gateway Timeout";
                break;
            case 599:
                status = "599 Network Timeout";
                break;
            default:
                status = statusCode;
                break;
        }
        
        var time = "";
        if (timeRequest > 9999) {
            timeRequest = (timeRequest/1000).toFixed(2);
            time = timeRequest + " s";
        } else {
            time = timeRequest + " ms";
        }

        if (size == undefined) size = "0 B";
        else {
            size += " B";
        }

        var methodType = originRequest.method;

        responseStatus.innerText = status;
        responseTime.innerText = time;
        responseSize.innerText = size;
        requestResponseType.innerText = methodType.toUpperCase();

        if (headersResponse != undefined) {
            responseHeader.style.display = "block";
            Object.keys(headersResponse).forEach(key => {
                if (String(key) == 'set-cookie') {
                    loadCookies.style.display = 'none';
                    cookies.style.display = 'block';
                    var tbodyCookies = document.getElementById('tbody-cookies');
                    console.log(tbodyCookies);
                    var trChildCookie = tbodyCookies.childNodes[0];
                    var cookiesValue = headersResponse[key];
                    if (cookiesValue.length > 0) {
                        cookiesValue.forEach(function(cookie, index) {
                            var lsCookie = cookie.split(';');
                            if (lsCookie.length > 0) {
                                var name = "";
                                lsCookie.forEach(function(pairValue, index) {
                                    var lsPair = pairValue.split('=');
                                    if (index == 0) name = lsPair[0];
                                    trChildCookie.childNodes[index+1].innerText = lsPair[1];
                                });
                                trChildCookie.childNodes[0].innerText = name;
                            }
                        });
                    }
                } else {
                    trChild.childNodes[3].innerText = key;
                    trChild.childNodes[5].innerText = headersResponse[key];
                    tbodyResponseTable.appendChild(trChild);
                    trChild = trChild.cloneNode(true);
                }
            });
        }
        else {
            responseHeader.style.display = "none";
        }
        

        if (typeof(bodyResponse) === 'object') {
            var jsonText = JSON.stringify(bodyResponse, undefined, 2);
            var raw = JSON.stringify(bodyResponse);
            raw = raw.replace('\\', /\s/g);
            textareaPretty.value = jsonText;
            textareaRaw.value = raw;
            preview.innerHTML = raw;
        }
        else {
            textareaPretty.value = "";
            textareaRaw.value = "";
        }
        docReady(() => {
            var $ = function (selector) {
                return document.querySelectorAll(selector);
            };
            var nodes = $('[data-api-id]');
            nodes.forEach(function(li, index) {
                if (li.getAttribute('click') !== 'true') {
                    li.addEventListener('click', function() {
                        var apiId = this.getAttribute('data-api-id');
                        console.log(this.getAttribute('data-api-id'));
                        // TODO: get all request data for this ID 
                        ipcRenderer.send('find-data-via-menu-id', (event, apiId))
                        // End TODO
                    });
                }
            });
            nodes.forEach(function(li, index) {
                if (li.getAttribute('click') === 'true') {
                    li.removeEventListener('click');
                }
            });
        });
    }
    else {
        var errorEle = document.getElementById('error-log-response');
        errorEle.style.display = 'block';
        var errorContentEle = document.getElementById('error-content');
        errorContentEle.innerText = bodyResponse;
    }
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    }
}

function addClickEventListener() {
    var $ = function (selector) {
        return document.querySelectorAll(selector);
    };
    var nodes = $('[data-api-id]');
    nodes.forEach(function(li, index) {
        if (li.getAttribute('click') !== 'true') {
            li.addEventListener('click', function() {
                var apiId = this.getAttribute('data-api-id');
                console.log(this.getAttribute('data-api-id'));
                // TODO: get all request data for this ID 
                ipcRenderer.send('find-data-via-menu-id', (event, apiId))
                // End TODO
            });
        }
    });
    nodes.forEach(function(li, index) {
        if (li.getAttribute('click') === 'true') {
            li.removeEventListener('click');
        }
    });
}

var $ = function (selector) {
    return document.querySelectorAll(selector);
};

var srcs = [
    "../resources/custom/js/content-main-child.js",
    "../resources/custom/js/preloadDashboard.js",
    "../resources/custom/js/frame-list.js"
]

function load_js(src)
{
    var reload = document.getElementById('reload-js');
    var scriptTemp = $('script[src="'+src+'"]')
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
