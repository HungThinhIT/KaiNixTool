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
	setTimeout(function() {
		titleResponse.style.display = 'block';
		gifPreload.style.display = 'none';
		var preloadResponse = document.getElementsByClassName('pre-load-response')[0];
		preloadResponse.style.display = 'none';
	}, 1000);

	return data;
}

