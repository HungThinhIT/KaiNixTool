function checkSpecialSymbol(input) {
	var val = input.value;
	if (val.length > 1) {
		if (val.includes("?")) {
			if (val.substr(0, 1) != "?") {
				var ls = val.spit("?");
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

