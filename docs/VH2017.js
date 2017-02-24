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
		_elements[i].removeEventListener('keydown', ElementKeyDown, false);
		_elements[i].removeEventListener('keyup', ElementKeyUp, false);
		_elements[i].removeEventListener('click', ElementClick, false);
		_elements[i].removeAttribute("data-VH2017-hndk");
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

    	if (document.body.childElementCount === 0) {
		var _res = document.body.appendChild(document.createElement("p"));
		VH2017.currentTarget = _res;
		WrapElements(_res);
	}

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

	WrapElements();
	
    	// first child not for designer purpose 
	VH2017.currentTarget = document.body.querySelector(":nth-child(1)[contentEditable='true']");
	VH2017.currentTarget.focus();
	try { VH2017.currentTarget.click(); }
	catch(xcp) { console.log("catch exception : .click() on "+VH2017.currentTarget.nodeName);  }
	finally { };

}



function ElementKeyDown(e) { 
         
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	     
	    	
	if (e.which === 13 && e.shiftKey) {	
	// this allow to prevent defaults for what I override, and not for a backspace , delete...
	// This is a code related to shift+enter handling 
	   	e.preventDefault();
		e.stopPropagation();
	}
		
	if (e.which === 13 && !e.shiftKey) {
		// prevent default only in this case: return down, not even released
	   	e.preventDefault();
		e.stopPropagation();

		var _elt = document.createElement("p");			
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);
		WrapElements(_res);
	}
	   
}



function ElementKeyUp(e) { 
         
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	   
	/*e.preventDefault();
	e.stopPropagation();*/
		
	if (e.which === 13 && e.shiftKey) {	
		// shift+enter must insert a br element at the current cursor position 
		// https://www.w3.org/TR/html/single-page.html#the-br-element
	   	e.preventDefault();
		e.stopPropagation();

		var _pos= e.currentTarget.innerHTML.indexOf(document.getSelection().focusNode.data);
		_pos = (_pos === -1 ? 0 : _pos);
		// using getSelection may need index re-compute: result in _pos
		// document.getSelection().focusOffset only give me the cursor position within a node
		
		var _elt = document.createElement("br"); 
		_elt.id = Date.now();
		
		e.currentTarget.innerHTML = 
			e.currentTarget.innerHTML.substring(0, _pos + document.getSelection().focusOffset)
			+ _elt.outerHTML
			+ e.currentTarget.innerHTML.substring(_pos + document.getSelection().focusOffset, e.currentTarget.innerHTML.length);
			
		WrapElementById(_elt.id); // This process with its id
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
			_elements[i].addEventListener('keydown', ElementKeyDown, false);
			_elements[i].addEventListener('keyup', ElementKeyUp, false);
			_elements[i].addEventListener('click', ElementClick, false);
			_elements[i].setAttribute("data-VH2017-hndk","");
			
			// This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work)
			if ((_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
 					|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
				_elements[i].contentEditable = true;
				
			// Send info to handler	
			VH2017.ElementWrap(_elements[i]);
		  }
		}
	
	} else {
		// This is the wrapper code
		elt.addEventListener('keydown', ElementKeyDown, false);
		elt.addEventListener('keyup', ElementKeyUp, false);
		elt.addEventListener('click', ElementClick, false);
		elt.setAttribute("data-VH2017-hndk","");
		
		// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
		elt.contentEditable = true;
		
		VH2017.currentTarget = elt;
		VH2017.ElementWrap(elt);  // Inform using handler
		VH2017.currentTarget.focus();
		
	}
	
}



function WrapElementById(id) {
	// This is the wrapper code for an identified element
	var elt = document.getElementById(id);
	// This is the wrapper code
	elt.addEventListener('keydown', ElementKeyDown, false);
	elt.addEventListener('keyup', ElementKeyUp, false);
	elt.addEventListener('click', ElementClick, false);
	elt.setAttribute("data-VH2017-hndk","");
	//////////// note: these are the invariant instructions, these can become a function.
	
	// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
	//elt.contentEditable = true;
	
	elt.removeAttribute('id');
	
	VH2017.currentTarget = elt;
	//this is what is done, call removed : VH2017.ElementWrap(elt);  // Inform using handler
	VH2017.currentTarget.focus();
	
}



