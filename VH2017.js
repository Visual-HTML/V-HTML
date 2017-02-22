window.addEventListener('load', InitializeUserAgent, true);



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
		_elements[i].removeEventListener('click', ElementClick, false);
		_elements[i].removeEventListener('focusout', ElementFocusOut, false); 
		_elements[i].removeAttribute("data-VH2017-hndk");
		_elements[i].removeAttribute("contentEditable");
	}
	
	_elements = document.body.querySelectorAll("body *[contentEditable='false']");
	for (var i = 0 ; i < _elements.length ; i++) {
		try { _elements[i].remove(); } catch(xcp) { _elements[i].removeNode(); } finally { console.log("cross-browser"); };
	}
	
};
VH2017.ElementClick = function(evt) { };
VH2017.ElementWrap = function(elt) { };



function InitializeUserAgent(e) {
	
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
	}
		
	var  _element = document.createElement("style");
	_element.title = "VH2017- Designer Styles";
	_element.id = "VH2017-Designer-Styles";
	_element.innerHTML = "*:not(hr)[data-VH2017-hndk] { min-height: 20px; border: 1px dotted gray; }";	
	
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src="VH2017.js"]');
	 _aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);

	InitializeContent();
	
}



function InitializeContent() {	

	WrapElements();

	VH2017.currentTarget = document.body.querySelector(':nth-child(1)');
	VH2017.currentTarget.focus();
	VH2017.currentTarget.click();

}



function ElementKeyDown(e) { 
         
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
   if (e.which === 13) {	   
	   	e.preventDefault();
		e.stopPropagation();

		var _elt = document.createElement("p");			
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);
		WrapElements(_res);
   }
   
}



function ElementClick(e) {
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
    e.stopPropagation();
	e.preventDefault();
	
	VH2017.currentTarget = e.currentTarget;
	VH2017.currentTarget.contentEditable = true;	
	VH2017.currentTarget.focus();
	
	VH2017.ElementClick(e);

}



function ElementFocusOut(e) {
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.currentTarget.removeAttribute("contentEditable");

}



function DocumentClick(e) {
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
}



function DocumentKeyDown(e) { 
	
	console.log( e.type + " " + e.currentTarget.nodeName + " " +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
   if (e.which === 13) {
	   
	 // if (document.body.hasAttribute("contentEditable")) { removed because of new initialisation 
	    //   WrapElements(); 
	
		//} else {
			e.preventDefault();
			
			var _res = document.body.appendChild(document.createElement("p"));
			WrapElements(_res);
		//}
   }
}



function WrapElements(elt) {
	
	if (typeof(elt) === "undefined") {
			
		// look for and attach unhandled elements
		var _elements = document.body.querySelectorAll("body *:not([data-VH2017-hndk]):not([contentEditable='false'])");
		
		for (var i = 0 ; i < _elements.length ; i++) {
		  if ( _elements[i].nodeType === 1 
						 && !_elements[i].hasAttribute("data-VH2017-dsgk")
						 && !_elements[i].hasAttribute('data-VH2017-hndk') ) { 
			_elements[i].addEventListener('keydown', ElementKeyDown, false);
			_elements[i].addEventListener('click', ElementClick, false);
			_elements[i].addEventListener('focusout', ElementFocusOut, false); 
			_elements[i].setAttribute("data-VH2017-hndk","");
			VH2017.ElementWrap(_elements[i]);
		  }
		}
	
	} else {
		
		elt.addEventListener('keydown', ElementKeyDown, false);
		elt.addEventListener('click', ElementClick, false);
		elt.addEventListener('focusout', ElementFocusOut, false); 
		elt.setAttribute("data-VH2017-hndk","");
	
		VH2017.currentTarget = elt;
		VH2017.ElementWrap(elt);
		elt.contentEditable = true;
		VH2017.currentTarget.focus();
		
	}
	
}


