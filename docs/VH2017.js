window.addEventListener('load', InitializeUserAgent, true);

VH2017 = {};
VH2017.MainPanelUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/testmain.html";
VH2017.PreviewPanelUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/Default/Article000.txt";
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};
VH2017.handlerKey = Date.now();
VH2017.currentTarget = null;

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
	
    var _elements = document.body.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].addEventListener('click', ElementClicked, false);
		_elements[i].addEventListener('keydown', ReturnPressed, false);
		_elements[i].style.border = "1px dashed gray";
		_elements[i].setAttribute("data-VH2017-hndk",VH2017.handlerKey);
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
				InitializeDesigner_Step1();
				} else {
				
				}
			}
		}
	xReq.send(null);
}

function InitializeDesigner_Step1() {
	var xReq = new XMLHttpRequest();
	xReq.open("GET", VH2017.PreviewPanelUrl, true); 
	xReq.timeout = 2000;
	xReq.ontimeout = function () { };
	xReq.onreadystatechange = function (e) {
		if (xReq.readyState == 4) {         
			if (xReq.status = "200") { 
			    var _element1 = document.createElement("div");
				_element1.Id = Date.now();
				_element1.style.position="fixed";
				_element1.style.right="0";
				_element1.style.width="320px";				
				_element1.style.height="480px";
				_element1.style.overflowX="scroll";
				_element1.innerHTML = xReq.response;
				document.body.appendChild(_element1);
				} else {
				
				}
			}
		}
	xReq.send(null);
}

function ElementClicked(e) {
  e.stopPropagation();
  e.preventDefault();
   
  /* look for and attahc un handed child nodes */
  for (var i = 0 ; i < e.currentTarget.childNodes.length ; i++) {
	  if (e.currentTarget.childNodes[i].nodeType != 3 && 
		  e.currentTarget.childNodes[i].getAttribute('data-VH2017-hndk') === null){ 
		e.currentTarget.childNodes[i].addEventListener('click', ElementClicked, false);
		e.currentTarget.childNodes[i].addEventListener('keydown', ReturnPressed, false);
		e.currentTarget.childNodes[i].setAttribute("data-VH2017-hndk",VH2017.handlerKey);
		e.currentTarget.childNodes[i].style.border = "1px dashed gray";
	  }
  }

  // a handle on current element is available in e.currentTarget
  VH2017.currentTarget = e.currentTarget;
  // now exposed to library code
}
function ReturnPressed(e) {
	
  if (e.which === 13) {
	  e.preventDefault();
	  
	  /* look for and attahc un handed child nodes */
	  for (var i = 0 ; i < e.currentTarget.childNodes.length ; i++) {
		  if (e.currentTarget.childNodes[i].nodeType != 3 && 
			  e.currentTarget.childNodes[i].getAttribute('data-VH2017-hndk') === null){ 
			e.currentTarget.childNodes[i].addEventListener('click', ElementClicked, false);
			e.currentTarget.childNodes[i].addEventListener('keydown', ReturnPressed, false);
			e.currentTarget.childNodes[i].setAttribute("data-VH2017-hndk",VH2017.handlerKey);
			e.currentTarget.childNodes[i].style.border = "1px dashed gray";
		  }
	  }
	  
	  var _element = document.createElement("p");
	  
		_element.addEventListener('click', ElementClicked, false);
		_element.addEventListener('keydown', ReturnPressed, false);
		_element.setAttribute("data-VH2017-hndk",VH2017.handlerKey);
		_element.style.border = "1px dashed gray";
		
		_element.contentEditable = true;
		document.body.appendChild(_element).focus();
  }
}



function ReplaceNode(elt, tagName) {
	
	if (elt == null) return;
	
	_element = document.createElement(tagName);
	_element.innerHTML = elt.innerHTML;
	_element.contentEditable = true;
	for(var i = 0 ; i < elt.classList.length ; i++) {
	_element.classList.add(elt.classList[i]);
	}
	
	_element.addEventListener('click', ElementClicked, false);
	_element.addEventListener('keydown', ReturnPressed, false);
	_element.setAttribute("data-VH2017-hndk",VH2017.handlerKey);
	_element.style.border = "1px dashed gray";
				
	elt.parentNode.replaceChild(_element,elt);
	
	_element.focus();
	_element.click();
	
}




function Align(elt, align) {
	
	if (elt == null) return;
		
	elt.style.textAlign = align;
	
	elt.focus();
	elt.click();
	
}
