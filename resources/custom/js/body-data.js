function allData() {

	var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
	preloadResponse.style.display = 'block';
	var titleResponse = document.getElementById('title-response');
	titleResponse.style.display = 'none';
	var gifPreload = document.getElementsByClassName('gif-pre-load')[0];
	gifPreload.style.display = 'block';
	var url = document.getElementsByName("path")[0].value;
	var ls = {};
	if (url.length > 0) {
		ls = url.split('?');
		if (ls[0].length <= 0) url = "http://localhost?" + ls[1];
		else if (ls[0].includes("https://") || ls[0].includes("http://")) {
			url = ls[0] + "?" + ls[1];
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
			authContent = "Bearer " + authContent;
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
			authContent = "Bearer " + authContent;
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

	console.log(data);

	// Test preload response => 
	setTimeout(function() {
		titleResponse.style.display = 'block';
		gifPreload.style.display = 'none';
		var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
		preloadResponse.style.display = 'none';
	}, 1000);

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
	return data;
}


function responseData(response) {
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
	var statusCode = response.statusCode;
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
	
	responseStatus.innerText = status;
	responseTime.innerText = response.time;
	responseSize.innerText = response.size;

	var headerData = response.header;
	var data = response.data;
	if (headerData != undefined) {
		responseHeader.style.display = "block";
		Object.keys(headerData).forEach(key => {
		  trChild.childNodes[3].innerText = headerData[key].key;
		  trChild.childNodes[5].innerText = headerData[key].value;
		  tbodyResponseTable.appendChild(trChild);
		  trChild = trChild.cloneNode(true);
		});
	}
	else {
		responseHeader.style.display = "none";
	}
	

	var jsonText = JSON.stringify(data, undefined, 2);
	var raw = JSON.stringify(data);
	raw = raw.replace('\\', /\s/g);
	textareaPretty.value = jsonText;
	textareaRaw.value = raw;
	preview.innerText = raw;
}