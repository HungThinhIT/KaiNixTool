function allData() {
	var tbodyHeaders = document.getElementById("tbody-headers");
	var tbodyBodys = document.getElementById("tbody-forms");
	var oauthCheck = document.getElementsByName('authorize-type');
	
	var authValue = oauthCheck[0].value;
	console.log(authValue)
	var isAuthentication = false;
	var authContent = "";
	if (authValue != "none") {
		isAuthentication = true;
		authContent = document.getElementsByName("auth-token")[0];
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
		body.type = checkValueForm;
		var trBodyParent = tbodyBodys.childNodes;
		var countBody = 0;
		console.log(trBodyParent);
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

	var data = { 
		Req: {
			Authen: authen,
			Headers: headersParams,
			Body: body
		}
	}

	console.log(data);
	return data;
}
