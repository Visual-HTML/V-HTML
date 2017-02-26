// when page is loaded, start initialization process: set user-agent specific code
window.addEventListener('load', InitializeUserAgent, true);



// isolate editors code within VH2017, which become is an Object in window
VH2017 = {};
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};
VH2017.currentTarget = null;
VH2017.Clear = function() {
	
	document.removeEventListener('keydown', DocumentKeyDown, false);	
	document.body.removeEventListener('click', DocumentClick, false);	
	
    	var _elements = document.querySelectorAll('body *[data-VH2017-hndk]');
	for (var i = 0 ; i < _elements.length ; i++) {
		this.UnWrapElement(_elements[i]);
		_elements[i].removeAttribute("contentEditable");
	}
	
	_elements = document.body.querySelectorAll("body *[contentEditable='false']");
	for (var i = 0 ; i < _elements.length ; i++) {
		try { _elements[i].xremove(true);  console.log("used:.remove(true)"); } 
		catch(xcp) { 
			
			try {
			_elements[i].removeNode(true); console.log("used:.removeNode(true)");  
			} catch(xcp) { 
			_elements[i].parentNode.removeChild(_elements[i]); console.log("used:.removeChild(elt)");
			}
			finally { console.log("cross-browser"); };			
		} 
		finally { console.log("cross-browser"); };
	}
	
	try { document.head.querySelector('#VH2017-Designer-Styles').xremove(true); console.log("used:.remove(true)"); } 
	catch(xcp) {		
		try {
		document.head.querySelector('#VH2017-Designer-Styles').removeNode(true); console.log("used:.removeNode(true)"); 
		} catch(xcp) { 
		document.head.removeChild(document.head.querySelector('#VH2017-Designer-Styles')); console.log("used:.removeChild(elt)"); }
		finally { console.log("cross-browser"); };		
	} 
	finally { console.log("cross-browser"); };
	
};
VH2017.WrapElement = function(elt) {
	// Initialize element with required events and attributes
	elt.addEventListener('keydown', ElementKeyDown, false);
	elt.addEventListener('click', ElementClick, false);
	elt.setAttribute("data-VH2017-hndk","");
}
VH2017.UnWrapElement = function(elt) {
	// Remove from HTMLElement required events and attributes
	elt.removeEventListener('keydown', ElementKeyDown, false);
	elt.removeEventListener('click', ElementClick, false);
	elt.removeAttribute("data-VH2017-hndk","");
}


VH2017.ElementClick = function(evt) { };
VH2017.ElementWrap = function(elt) { };



function InitializeUserAgent(e) {
	// jQuery remain the best solution to solve user-agent specific code but I'm trying to avoid using it at start
	// Custom Controls and starters can use it but at the editor level I wish to implement a kind of dynamic loading
	
	InitializeDocument();
	
}



function InitializeDocument() {
	
	VH2017.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH2017.document.body.designMode.InitialValue = document.designMode;

	document.body.removeAttribute("contentEditable");
	document.designMode = "off";

	document.addEventListener('keydown', DocumentKeyDown, false);	
	document.body.addEventListener('click', DocumentClick, false);	

	// This is a designer code: So editor must issue a call to a handler where designer can choose what to do initializing a document
    	if (document.body.childElementCount === 0) {
		// ! if document hold only designer code it is to consider as empty... this test can be a service of the editor because it's his business
		var _res = document.body.appendChild(document.createElement("p"));
		VH2017.currentTarget = _res;
		WrapElements(_res);
	}

	// Styles also are designer dependent, what editor can do is to add the designer's styles just after the script node
	// Here a function such as VH2017.head.AddDesignerStyles(code)---why do I need to manage this, to clean the code, to provide basic enable/disable...
	// Add designer' styles
	var  _element = document.createElement("style");
	_element.title = "VH2017- Designer Styles";
	_element.id = "VH2017-Designer-Styles";
	_element.innerHTML += "*:not(hr)[data-VH2017-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	// Designer styles are added just after this script link
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src="VH2017.js"]');
	 _aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);

	InitializeContent();
	
}



function InitializeContent() {	

	// Begin with a procces that wrap existing content
	WrapElements();
	
    	// first child not for designer purpose get focused
	VH2017.currentTarget = document.body.querySelector("[contentEditable='true']");
	VH2017.currentTarget.focus();
	try { 
	// some browser need to trigger a click after .focus()
	VH2017.currentTarget.click(); }
	catch(xcp) { 
	// while some other will not even provide the function ? it's maybe an element without click ? to check!
	console.log("catch exception : .click() on "+VH2017.currentTarget.nodeName);  }
	finally { };

}



function ElementKeyDown(e) { 
         
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));

	// All the following seem to be designer code!

	if (e.which === 13 && e.shiftKey) {	
	// this allow to prevent defaults for what I override, and not for a backspace , delete...
	// This is a code related to shift+enter handling
	   	e.preventDefault();
		e.stopPropagation();
 
		
		// shift+enter must insert a br element at the current cursor position 
		// https://www.w3.org/TR/html/single-page.html#the-br-element
		var _elt = document.createElement("br"); 
		_elt.id = Date.now();

                if ( typeof(document.getSelection().focusNode.data) !== "undefined") {
			var _pos= e.currentTarget.innerHTML.indexOf(document.getSelection().focusNode.data);
			_pos = (_pos === -1 ? 0 : _pos);
			// using getSelection may need index re-compute: result in _pos
			// document.getSelection().focusOffset only give me the cursor position within a node
			
			e.currentTarget.innerHTML = 
				e.currentTarget.innerHTML.substring(0, _pos + document.getSelection().focusOffset)
				+ _elt.outerHTML
				+ e.currentTarget.innerHTML.substring(_pos + document.getSelection().focusOffset, e.currentTarget.innerHTML.length);
		} else {
			console.log("cross-browser code used");
			var _tmp = _elt.outerHTML.replace(">"," />")
			e.currentTarget.innerHTML += _tmp;			
		}
		
		WrapElementById(_elt.id); // This process with its id
		//e.currentTarget.focus();
		
	}
		
	if (e.which === 13 && !e.shiftKey) {
		// prevent default only in this case: return down, not even released
	   	e.preventDefault();
		e.stopPropagation();

		// Add content pressing enter
		var _elt = document.createElement("p");			
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);
		// and wrap it
		WrapElements(_res);
	}
	   
}



function ElementClick(e) {
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.stopPropagation();
	e.preventDefault();
	
	VH2017.currentTarget = e.currentTarget;	
	VH2017.ElementClick(e);  // Inform designer that element was selected

}



function DocumentClick(e) {
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
}



function DocumentKeyDown(e) { 
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	// This is designer code!
	if (e.which === 13) {
		// Enter on document add a new paragraph
		e.preventDefault();
		
		var _res = document.body.appendChild(document.createElement("p")); //TODO: designer must be able to say what element is added : div ? ul, ol? blockquote?...
		WrapElements(_res);
	}
	
}


// Wrapping elements allow to get a handle on them interactivity with a click
function WrapElements(elt) {
	// This is called without parameter, elt argument is undefined : the process apply on...
	if (typeof(elt) === "undefined") {
			
		// look for and attach unhandled elements ...apply on all elements not already handled and elements not set as not editable
		var _elements = document.body.querySelectorAll("body *:not([data-VH2017-hndk]):not([contentEditable='false'])");
		
		for (var i = 0 ; i < _elements.length ; i++) {
			if ( _elements[i].nodeType === 1 
						 && !_elements[i].hasAttribute("data-VH2017-dsgk")
						 && !_elements[i].hasAttribute('data-VH2017-hndk') ) { 
					
				VH2017.WrapElement(_elements[i]);
				
				// This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work)
				if ((_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
						|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
					_elements[i].contentEditable = true;
					
				// Send info to handler	
				VH2017.ElementWrap(_elements[i]);
				}
		}
	
	} else {
		
		VH2017.WrapElement(elt);
		
		// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
		elt.contentEditable = true;
		
		VH2017.currentTarget = elt;
		VH2017.ElementWrap(elt);  // Inform using handler
		VH2017.currentTarget.focus();
		
	}
	
}



function WrapElementById(id) {
	// This is the wrapper code for a temporarily identified element, 
	// created by code generator these elements get an id only
	// to enable this code to do a getElementById...
	var elt = document.getElementById(id);
	
	// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
	//elt.contentEditable = true;
	
	// id can be removed
	elt.removeAttribute('id');
	
	VH2017.WrapElement(elt);
	VH2017.currentTarget = elt;
	//this is what is done, call removed : VH2017.ElementWrap(elt);  // Inform using handler
	VH2017.currentTarget.focus();
	
	// This function is used (and was created by a need of, rather, a designer code, so the editor provide
	// this service while a designer, starter or custom control canmanage this (wrap a new injected element) its own way...
				  
}


