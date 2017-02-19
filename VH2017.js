window.addEventListener('load', InitializeUserAgent, true);

VH2017 = {};
VH2017.MainPanelUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/testmain.html";
VH2017.PreviewPanelUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/Default/Article000.txt";
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};
VH2017.currentTarget = null;
VH2017.RemovePanel = function() { (document.getElementById('VH2017-main') ? document.body.removeChild(document.getElementById('VH2017-main')) : false ); };
VH2017.RemoveStarters = function() { (document.getElementById('VH2017-starters') ? document.body.removeChild(document.getElementById('VH2017-starters')) : false ); };
VH2017.RemovePanels = function() { this.RemovePanel(); this.RemoveStarters(); }
VH2017.Clear = function() { 
	document.body.removeAttribute("contentEditable");	
	document.removeEventListener('keydown', DocumentKeyDown, false);	
	document.removeEventListener('click', DocumentClicked, false);	
	document.removeEventListener('focusout', DocumentLoseFocus, false);
	this.RemovePanels();
    var _elements = document.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].removeEventListener('click', ElementClicked, false);
		_elements[i].style.border = "";
		_elements[i].removeAttribute("contentEditable");
		_elements[i].removeAttribute("data-VH2017-hndk");
	}	
	document.body.removeAttribute("contentEditable");
	document.styleSheets[0].disabled = true;
	document.getElementById("data-VH2017-dsgk").removeNode(true);
};

function InitializeUserAgent(e) {
	
	InitializeDocument();
}

function InitializeDocument() {
	
	VH2017.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH2017.document.body.designMode.InitialValue = document.designMode;
	
	document.body.contentEditable = true;	
	document.addEventListener('keydown', DocumentKeyDown, false);	
	document.addEventListener('click', DocumentClicked, false);	
	document.addEventListener('focusout', DocumentLoseFocus, false);
		
	/* without taking dimension specs I don't trigger click event from body
	document.body.addEventListener('click', BodyClicked, false);
	so I set-it on document
	*/
	//document.addEventListener('click', BodyClicked, false);
	
	//if (VH2017.document.body.designMode.InitialValue.toLowerCase() === "Inherit") return;
	InitializeContent();
}

function InitializeContent() {
	
	var _autoBlank=false;
	/*if (document.body.childNodes.length === 1) {
		var _element = document.createElement("div");
		VH2017.currentTarget = document.body.appendChild(_element);
		_autoBlank = true;
	}
	
    var _elements = document.body.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].addEventListener('click', ElementClicked, false);
		_elements[i].addEventListener('focusout', ElementLoseFocus, false);
		_elements[i].setAttribute("data-VH2017-hndk", "L" + Date.now() + Math.floor(Math.random() * 101));
	}
	*/
	VH2017.currentTarget = document.body;
	
	// if (_autoBlank) InitializeDesigner();
	InitializeDesigner();
	VH2017.currentTarget.focus();
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
				_element.id = "VH2017-main";
				_element.contentEditable = false;
				_element.setAttribute("data-VH2017-dsgk","");
				_element.innerHTML = xReq.response;
				
				var _elements = _element.querySelectorAll('*');
				for (var i = 0; i < _elements.length ; i++) {
					_elements[i].contentEditable = false;
					_elements[i].setAttribute("data-VH2017-dsgk","");
				}
				
				document.body.insertBefore(_element, document.body.firstChild);
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
			    var _element = document.createElement("div");
				_element.id = "VH2017-starters";
				_element.contentEditable = false;
				_element.setAttribute("data-VH2017-dsgk","");
				_element.style.position="fixed";
				_element.style.right="0";
				_element.style.top="0";
				_element.style.width="320px";				
				_element.style.height="480px";
				_element.style.overflowY="scroll";
				_element.style.overflowX="hidden";
				_element.innerHTML = xReq.response;			
				
				var _elements = _element.querySelectorAll('*');
				for (var i = 0; i < _elements.length ; i++) {
					_elements[i].contentEditable = false;
					_elements[i].setAttribute("data-VH2017-dsgk","");
				}
				
				document.body.insertBefore(_element, document.body.firstChild);
				
				
		VH2017.currentTarget.focus();
				} else {
				
				}
			}
		}
	xReq.send(null);
}


function ElementClicked(e) {	
	
	/* must be an authored element, not a designer element */
	if (e.currentTarget.hasAttribute("data-VH2017-hndk") && ! e.currentTarget.hasAttribute("data-VH2017-dsgk")) {
		e.stopPropagation(); e.preventDefault();
		VH2017.currentTarget = e.currentTarget;
		
		VH2017.currentTarget.contentEditable = true;
		
		//don't need to focus
		//VH2017.currentTarget.focus();
	}
	
}

function ReturnKeyDown(e) {
	if (e.which === 13) {
		//e.preventDefault();
		
		var _elements = document.body.childNodes;
		/* look for and attach unhandled child nodes */
		for (var i = 0 ; i < _elements.length ; i++) {
		  if (_elements[i].nodeType === 1 && !_elements[i].hasAttribute("data-VH2017-dsgk")  &&
			  ! _elements[i].hasAttribute('data-VH2017-hndk') ) { 
			_elements[i].addEventListener('click', ElementClicked, false);
			_elements[i].addEventListener('keydown', ReturnKeyDown, false);
			_elements[i].addEventListener('focusin', ElementGetFocus, false);
			_elements[i].addEventListener('focusout', ElementLoseFocus, false);
			_elements[i].setAttribute("data-VH2017-hndk","");
		  }
		}
		
		
		/*
		var _element = document.createElement("div");
		
		_element.addEventListener('click', ElementClicked, false);
		_element.addEventListener('keydown', ReturnPressed, false);
		_element.setAttribute("data-VH2017-hndk", "G" + Date.now() + Math.floor(Math.random() * 101));
		_element.style.border = "1px dashed gray";
		_element.id = "F" + Date.now() + Math.floor(Math.random() * 101);
		
		_element.contentEditable = true;
		VH2017.currentTarget = document.body.appendChild(_element);
		VH2017.currentTarget.focus();*/
		}
}

function ElementLoseFocus(e) {
	
	if (e.currentTarget.nodeName !== "#document") {
		e.stopPropagation();
		e.preventDefault();
		
		VH2017.currentTarget = e.currentTarget;
		VH2017.currentTarget.removeAttribute("contentEditable");
	} else {
		
		var _elements = document.body.childNodes;
		/* look for and attach unhandled child nodes */
		for (var i = 0 ; i < _elements.length ; i++) {
		  if ( _elements[i].nodeType === 1 && (! _elements[i].hasAttribute("data-VH2017-dsgk"))  &&
			  (! _elements[i].hasAttribute('data-VH2017-hndk'))  ) { 
			_elements[i].addEventListener('click', ElementClicked, false);
			_elements[i].addEventListener('keydown', ReturnKeyDown, false);
			_elements[i].addEventListener('focusin', ElementGetFocus, false);
			_elements[i].addEventListener('focusout', ElementLoseFocus, false);
			_elements[i].setAttribute("data-VH2017-hndk","");
		  }
		}
		
	}
	
}


function ElementGetFocus(e) {
	
	/* must be an authored element, not a designer element */
	if (e.currentTarget.hasAttribute("data-VH2017-hndk") && ! e.currentTarget.hasAttribute("data-VH2017-dsgk")) {
		e.stopPropagation(); e.preventDefault();
		VH2017.currentTarget = e.currentTarget;
		
		VH2017.currentTarget.contentEditable = true;
		
		//don't need to focus
		//VH2017.currentTarget.focus();
	}
}

function DocumentClicked(e) {
	
	var _elements = document.body.querySelectorAll('*');
		/* look for and attach unhandled child nodes */
		for (var i = 0 ; i < _elements.length ; i++) {
		  if ( _elements[i].nodeType === 1 && (! _elements[i].hasAttribute("data-VH2017-dsgk"))  &&
			  (! _elements[i].hasAttribute('data-VH2017-hndk'))  ) { 
			_elements[i].addEventListener('click', ElementClicked, false);
			_elements[i].addEventListener('keydown', ReturnKeyDown, false);
			_elements[i].addEventListener('focusin', ElementGetFocus, false);
			_elements[i].addEventListener('focusout', ElementLoseFocus, false);
			_elements[i].setAttribute("data-VH2017-hndk","");
		  }
		}
	
}

function DocumentKeyDown() { }

function DocumentLoseFocus() { }





function ReplaceNode(elt, tagName) {
	
	event.cancelBubble=true;
	
	if (elt == null) return;
	
	_element = document.createElement(tagName);
	_element.innerHTML = elt.innerHTML;
	_element.contentEditable = true;
	
	for(var i = 0 ; i < elt.classList.length ; i++) {
	_element.classList.add(elt.classList[i]);
	}
	
	_element.style.textAlign = elt.style.textAlign;
	_element.addEventListener('click', ElementClicked, false);
	_element.addEventListener('focusin', ElementGetFocus, false);
	_element.addEventListener('focusout', ElementLoseFocus, false);
	_element.setAttribute("data-VH2017-hndk","");
				
	elt.parentNode.replaceChild(_element,elt);
	
	_element.focus();
	_element.click();
	
}



function Align(elt, align) {	

	event.cancelBubble=true;
	
	if (elt == null) return;		
	elt.style.textAlign = align;	
	elt.focus();
	elt.click();	
}


function injectHTML(e) {
	
	e.stopPropagation();
	e.preventDefault();
	
	var _element = document.createElement("div");
	_element.innerHTML = e.currentTarget.innerHTML;
	var _elements = _element.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		  if ( _elements[i].nodeType === 1 && _elements[i].hasAttribute("data-VH2017-dsgk")  ) { 
		    _elements[i].removeAttribute("data-VH2017-dsgk");
		    _elements[i].removeAttribute("contentEditable");
		  }
	}
	
	if (VH2017.currentTarget.localName.toLowerCase() === "body") VH2017.currentTarget.innerHTML += _element.innerHTML;
	else VH2017.currentTarget.innerHTML = _element.innerHTML;

	var _elements = document.body.querySelectorAll('*');
		/* look for and attach unhandled child nodes */
		for (var i = 0 ; i < _elements.length ; i++) {
		  if ( _elements[i].nodeType === 1 && (! _elements[i].hasAttribute("data-VH2017-dsgk"))  &&
			  (! _elements[i].hasAttribute('data-VH2017-hndk'))  ) { 
			_elements[i].addEventListener('click', ElementClicked, false);
			_elements[i].addEventListener('keydown', ReturnKeyDown, false);
			_elements[i].addEventListener('focusin', ElementGetFocus, false);
			_elements[i].addEventListener('focusout', ElementLoseFocus, false);
			_elements[i].setAttribute("data-VH2017-hndk","");
		  }
		}
	
}




