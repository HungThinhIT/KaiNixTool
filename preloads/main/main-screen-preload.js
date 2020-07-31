const ipcRenderer = require('electron').ipcRenderer;
const dateFormat = require('dateformat');


window.addEventListener('DOMContentLoaded', () => {

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
    });

    /**
     * GET all request data by api-data-id when click li element
     * 
     */
    window.onclick = function() {
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
});

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
    }
    else {
        var errorEle = document.getElementById('error-log-response');
        errorEle.style.display = 'block';
        var errorContentEle = document.getElementById('error-content');
        errorContentEle.innerText = bodyResponse;
    }
}