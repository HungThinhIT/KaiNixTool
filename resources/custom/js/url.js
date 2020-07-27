function checkSpecialSymbol(input) {
	var val = input.value;
	if (val.length > 1) {
		if (val.includes("?")) {
			if (val.substr(0, 1) != "?") {
				var ls = val.split("?");
				if (ls[0].length > 1) {
					if (ls[0].substr(ls[0].length - 1, 1) == "/") {
						val = ls[0].substr(0, ls[0].length - 1) + "?" + ls[1]; 
					}
				}
			}
			
		}
		else {
			if (val.length > 1) {
				if (val.substr(val.length - 1, 1) == '/') {
					val = val.substr(0, val.length - 1);
				}
			}
		}
	}
	val = val.replace(/\s/g, '-');
	input.value = val;
}

function fillParamsTable(input) {
	var tbodyParams = document.getElementById("tbody-params");
	var trBodyParams = tbodyParams.childNodes;

	var trTmpBodyParams = [];
	trBodyParams.forEach( function(element, index) {
		if (element.tagName == "TR") {
			if (element.id != "last-row-params") {
				trTmpBodyParams.push(element);
			}
		}
	});

	var tempParams = {};
	var val = input.value;
	var countParam = 0;
	if (val.length > 1) {
		if (val.includes("?")) {
			if (val.substr(0, 1) != "?") {
				var ls = val.split('?');
				if (ls[1].length > 1) {
					if (ls[1].includes('&')) {
						var params = ls[1].split('&');
						params.forEach( function(prEle, prIndex) {
							if (prEle.includes('=')) {
								var prLs = prEle.split('=');
								// console.log(prLs[0]);
								var countValid = 0;
								trTmpBodyParams.forEach( function(trEle, trIndex) {
									
									if (prLs[0] == trEle.childNodes[3].childNodes[1]) {
										countValid++;
									}
								});
								if (countValid == 0) {
									tempParams[countParam] = {
										key: prLs[0],
										value: prLs[1],
									}
									countParam++;
								}
							}
						});
					}
				}
			}
		}
	}

	var trFirstNew = tbodyParams.childNodes[1].cloneNode(true);
	// console.log(tempParams);
	if (countParam > 0) {
		var countNode = 1;
		for (var i = 1; i < tbodyParams.rows.length; i++) {
			tbodyParams.deleteRow(i);
		}
		// tbodyParams.deleteRow(tbodyParams.rows.length);
		for (var i = 0; i < countParam; i++) {
			trFirstNew.childNodes[1].childNodes[1].checked = true;
			trFirstNew.childNodes[3].childNodes[1].value = tempParams[i].key;
			trFirstNew.childNodes[5].childNodes[1].value = tempParams[i].value;
	        tbodyParams.appendChild(trFirstNew);
	        trFirstNew = tbodyParams.childNodes[countNode].cloneNode(true);
	        countNode++;
		}
		trFirstNew = tbodyParams.childNodes[1].cloneNode(true);
		trFirstNew.id = "last-row-params";
		trFirstNew.childNodes[1].childNodes[1].checked = false;
		trFirstNew.childNodes[3].childNodes[1].value = "";
		trFirstNew.childNodes[5].childNodes[1].value = "";
		trFirstNew.childNodes[7].childNodes[1].value = "";
	    tbodyParams.appendChild(trFirstNew);
		tbodyParams.deleteRow(1);
	}
	
	// if (val.length > 1) {
	// 	if (val.includes("?")) {
	// 		var ls = val.split("?");
	// 		if (ls[1].length > 1) {
	// 			var keyParams = ls[1].split('=');
	// 			trBodyParams.forEach( function(element, index) {
	// 				element[1].childNodes[1].checked = false;
	// 			});
	// 			keyParams.forEach( function(kEle, index) {
	// 				var countDup = 0;
	// 				trBodyParams.forEach( function(trEle, index) {
	// 					if (trEle[3].childNodes[1] == kEle) {
	// 						countDup++;
	// 					}
	// 					if (countDup > 1) {
	// 						trBodyParams.removeChild(trEle);
	// 					}
	// 				});
	// 			});
	// 			trBodyParams.forEach( function(trBodyEle, index) {
	// 				var countDuplicate = 0;
	// 				keyParams.forEach( function(kPrEle, index) {
	// 					if (trBodyEle[3].childNodes[1].value == kPrEle) {
	// 						trBodyEle[1].childNodes[1].checked = true;
	// 						countDuplicate++;
	// 					}
	// 				});
	// 			});
	// 		}
	// 	}
	// }
}