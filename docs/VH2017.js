window.addEventListener('load', InitializeUserAgent, true);

VH2017 = {};
VH2017.MainPanelUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/testmain.html";
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};

function InitializeUserAgent(e) {
	
	InitializeDocument();
}

function InitializeDocument() {
	VH2017.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH2017.document.body.designMode.InitialValue = document.designMode;
	
	if (VH2017.document.body.designMode.InitialValue.toLowerCase === "Inherit") return;
	
	InitializeContent();
}

function InitializeContent() {
	
	var _autoBlank=false;
	if (document.body.childNodes.length === 1) {
		var _element = document.createElement("p");
		_element.contentEditable = true;
		document.body.appendChild(_element).focus();
		_autoBlank=true;
	}
	
    _elements = document.body.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].addEventListener('click', ElementClicked, false);
		_elements[i].addEventListener('keydown', ReturnPressed, false);
		_elements[i].style.border = "1px dashed gray";		
		_elements[i].contentEditable = true;
	}
	
	if (_autoBlank) !InitializeDesigner();
}

function InitializeDesigner(){
	var xReq = new XMLHttpRequest();
	xReq.open("GET", VH2017.MainPanelUrl, true); 
	xReq.timeout = 2000;
	xReq.ontimeout = function () { };
	xReq.onreadystatechange = function (e) {
		if (xReq.readyState == 4) {         
			if (xReq.status = "200") { 
			    var _element = document.createElement("div");
				_element.Id = Date.now();
				_element.innerHTML = xReq.response;
				document.body.appendChild(_element);
				} else {
				
				}
			}
		}
	xReq.send(null);
}

function ElementClicked(e) {
  e.stopPropagation();
  e.preventDefault();
  // a handle on current element is available in e.currentTarget
}
function ReturnPressed(e) {
	
  if (e.which === 13) {
	  e.preventDefault();
	  var _element = document.createElement("p");
	  
		_element.addEventListener('click', ElementClicked, false);
		_element.addEventListener('keydown', ReturnPressed, false);
		_element.style.border = "1px dashed gray";
		
		_element.contentEditable = true;
		document.body.appendChild(_element).focus();
  }
}
