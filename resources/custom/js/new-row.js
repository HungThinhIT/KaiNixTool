
function onChangeHandler(event) {
  // some browser abstraction
  if (!event) event = window.event;
  var changedElement = event.srcElement || this;
  if (changedElement.parentNode.parentNode.classList.contains("class")) changedElement.parentNode.parentNode.removeAttribute("class");
  if (changedElement.parentNode.parentNode.classList.contains("id")) changedElement.parentNode.parentNode.removeAttribute("id");
  var lastTR = changedElement.parentNode.parentNode.childNodes;
  if (lastTR[1].childNodes[1].hasAttribute("onkeydown")) lastTR[1].childNodes[1].removeAttribute("onkeydown");
  if (lastTR[3].childNodes[1].hasAttribute("onkeydown")) lastTR[3].childNodes[1].removeAttribute("onkeydown");
  if (lastTR[5].childNodes[1].hasAttribute("onkeydown")) lastTR[5].childNodes[1].removeAttribute("onkeydown");
  
  var oldLast = '<tr>' + lastTR.innerHTML + '</tr>';
  console.log(oldLast);
  var textLastTR = '<tr class="item-last" id="last-row">' +
                      '<td class="params-check text-right">' +
                        '<input type="checkbox" onkeydown="changesHeaders()" class="input-params">' +
                      '</td>' +
                      '<td class="params-key">' +
                        '<input type="text" onkeydown="changesHeaders()" class="input-params">' +
                      '</td>' +
                      '<td class="params-value">' +
                        '<input type="text" onkeydown="changesHeaders()" class="input-params">' +
                      '</td>' +
                      '<td class="params-description">' +
                        '<input type="text" class="input-params">' +
                      '</td>' +
                    '</tr>';
  var table = document.getElementById("table-params");
  console.log(table);
  var rowCount = table.rows.length;
  table.deleteRow(rowCount -1);

  var tbody = document.getElementById("tbody-headers");
  tbody.innerHTML += textLastTR;
}
function changesHeaders(input) {
  var table = document.getElementById("table-headers");
  var tbody = document.getElementById("tbody-headers");

  var trParent = input.parentNode.parentNode;
  var newTrParent = trParent.cloneNode(true);
  var newTdParent = newTrParent.childNodes;
  newTdParent[1].childNodes[1].value = "";
  newTdParent[3].childNodes[1].value = "";
  newTdParent[5].childNodes[1].value = "";
  // 
  tbody.appendChild(trParent);
  if (typeof trParent.id != undefined) trParent.removeAttribute("id");
  tbody.appendChild(newTrParent);
  var tdParent = trParent.childNodes;
  if (tdParent[1].childNodes[1].hasAttribute("onkeydown")) tdParent[1].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[3].childNodes[1].hasAttribute("onkeydown")) tdParent[3].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[5].childNodes[1].hasAttribute("onkeydown")) tdParent[5].childNodes[1].removeAttribute("onkeydown");
  tdParent[1].childNodes[1].checked = true;
  input.focus();
  var lastRow = table.rows[table.rows.length - 1];
  lastRow.setAttribute("id", "last-row-headers");
}

function changesForms(input) {
  var table = document.getElementById("table-forms");
  var tbody = document.getElementById("tbody-forms");

  var trParent = input.parentNode.parentNode;
  var newTrParent = trParent.cloneNode(true);
  var newTdParent = newTrParent.childNodes;
  newTdParent[1].childNodes[1].value = "";
  newTdParent[3].childNodes[1].value = "";
  newTdParent[5].childNodes[1].value = "";
  // 
  tbody.appendChild(trParent);
  if (typeof trParent.id != undefined) trParent.removeAttribute("id");
  tbody.appendChild(newTrParent);
  var tdParent = trParent.childNodes;
  if (tdParent[1].childNodes[1].hasAttribute("onkeydown")) tdParent[1].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[3].childNodes[1].hasAttribute("onkeydown")) tdParent[3].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[5].childNodes[1].hasAttribute("onkeydown")) tdParent[5].childNodes[1].removeAttribute("onkeydown");
  tdParent[1].childNodes[1].checked = true;
  input.focus();
  var lastRow = table.rows[table.rows.length - 1];
  lastRow.setAttribute("id", "last-row-headers");
}

function changesParams(input) {
  var table = document.getElementById("table-params");
  var tbody = document.getElementById("tbody-params");

  var trParent = input.parentNode.parentNode;
  var newTrParent = trParent.cloneNode(true);
  var newTdParent = newTrParent.childNodes;
  newTdParent[1].childNodes[1].value = "";
  newTdParent[3].childNodes[1].value = "";
  newTdParent[5].childNodes[1].value = "";
  // 
  tbody.appendChild(trParent);
  if (typeof trParent.id != undefined) trParent.removeAttribute("id");
  tbody.appendChild(newTrParent);
  var tdParent = trParent.childNodes;
  if (tdParent[1].childNodes[1].hasAttribute("onkeydown")) tdParent[1].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[3].childNodes[1].hasAttribute("onkeydown")) tdParent[3].childNodes[1].removeAttribute("onkeydown");
  if (tdParent[5].childNodes[1].hasAttribute("onkeydown")) tdParent[5].childNodes[1].removeAttribute("onkeydown");
  tdParent[1].childNodes[1].checked = true;
  input.focus();
  var lastRow = table.rows[table.rows.length - 1];
  lastRow.setAttribute("id", "last-row-params");
}

function changeValue() {
  var listRecord = [];  

  var tbodyParams = document.getElementById("tbody-params");
  var trParent = tbodyParams.childNodes;
  trParent.forEach( function(element, index) {
      if (element.nodeName != '#text') {
      var check = element.childNodes[1].childNodes[1].checked;
      var key = element.childNodes[3].childNodes[1].value;
      var value = element.childNodes[5].childNodes[1].value;
      var description = element.childNodes[7].childNodes[1].value;
      var recordValue = new RecordValue(key, value, description, check);
      listRecord.push(recordValue);
    }
  });
  fillPath(listRecord);
}

function fillPath(listRecord) {
  var path = document.getElementById("path").value;
  if (path.length > 0) {
    if (path.length > 2) {
      var ls = path.split('?');
      path = ls[0] + "?";
    }
    else {
      if (!path.includes('?')) {
        path += "?";
      }
    }
  }
  else {
    path = "?";
  }
  var count = 0;
  listRecord.forEach( function(element, index) {
    if (index >= 1) {
      if (element.check == true) {
        if (element.value != "") {
          path += "&" + element.key + '=' + element.value;
        }
        else {
          if (element.key != "") {
            path += "&" + element.key ;
          }
        }
      }
    }
    else {
      if (element.check == true) {
        if (element.value != "") {
          path += element.key + '=' + element.value;
        }
        else {
          if (element.key != "") {
            path += element.key ;
          }
        }
        count ++;
      } 
    }
  });
  var tmpLs = path.split('?');
  if (tmpLs[1].substr(0, 1) == "&") {
    tmpLs[1] = tmpLs[1].substr(1, tmpLs[1].length - 1);
  }
  // if (count <= 0) {
  //   document.getElementById("path").value = tmpLs[0];
  // }
  // else {
  var tempPath = tmpLs[0] + "?" + tmpLs[1];
  var endPath = changeBlank(tempPath.toString());
  document.getElementById("path").value = endPath;
  // }
}

function firstCheck(input) {
  var trParent = input.parentNode.parentNode;
  var tdParent = trParent.childNodes;
  tdParent[1].childNodes[1].checked = true;
}

function changeBlank(val) {
  if (val.length > 1) {
    if (val.includes("?")) {
      if (val.substr(0, 1) != "?") {
        var ls = val.split('?');
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
  return val;
}


class RecordValue {
  constructor(key, value, description, check) {
    this.key = key;
    this.value = value;
    this.description = description;
    this.check = check;
  }
}