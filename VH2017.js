window.addEventListener('load', InitializeUserAgent, true);



VH2017 = {};
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};
VH2017.currentTarget = null;
VH2017.Clear = function() { 
	document.body.removeAttribute("contentEditable");
	document.removeEventListener('keydown', DocumentKeyDown, false);	
	document.removeEventListener('click', DocumentClick, false);
	
    var _elements = document.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].removeEventListener('click', ElementClick, false);
		_elements[i].removeAttribute("data-VH2017-hndk");
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
		
	document.body.addEventListener('keydown', DocumentKeyDown, false);	
	document.body.addEventListener('click', DocumentClick, false);
	
	
	document.body.contentEditable = true;
	
	VH2017.currentTarget = document.body;
	VH2017.currentTarget.focus();

	InitializeContent();
	
}



function InitializeContent() {	WrapElements(); }



function ElementClick(e) {
	
    e.stopPropagation();
	
	VH2017.currentTarget = e.currentTarget;
	VH2017.currentTarget.contentEditable = true;
	VH2017.currentTarget.focus();
	
	VH2017.ElementClick(e);

}



function ElementFocusOut(e) {
	
	e.currentTarget.removeAttribute("contentEditable");

}



function DocumentClick(e) {
	
	VH2017.currentTarget = e.currentTarget;
	VH2017.currentTarget.focus();
}



function DocumentKeyDown(e) { 
   if (e.which === 13) {
	   
	   if (document.body.hasAttribute("contentEditable")) {
	       WrapElements(); 
	
		} else {
			e.preventDefault();
			
			var _element = document.createElement("p");
			WrapElements(document.body.appendChild(_element));
		}
   }
}



function WrapElements(elt) {
	
	if (typeof(elt) === "undefined") {
		
	// look for and attach unhandled elements
	var _elements = document.body.querySelectorAll('body *:not([data-VH2017-hndk])');
	
	for (var i = 0 ; i < _elements.length ; i++) {
	  if ( _elements[i].nodeType === 1 
					 && !_elements[i].hasAttribute("data-VH2017-dsgk")
					 && !_elements[i].hasAttribute('data-VH2017-hndk') ) { 
		_elements[i].addEventListener('focusout', ElementFocusOut, false); 
		_elements[i].addEventListener('click', ElementClick, false);
		_elements[i].setAttribute("data-VH2017-hndk","");
		VH2017.ElementWrap(_elements[i]);
	  }
	  document.body.removeAttribute("contentEditable");
	}
	
	
	} else {
		elt.addEventListener('click', ElementClick, false);
		elt.addEventListener('focusout', ElementFocusOut, false); 
		elt.setAttribute("data-VH2017-hndk","");
		VH2017.ElementWrap(elt);
		elt.contentEditable = true;
		elt.focus();
	}
}


