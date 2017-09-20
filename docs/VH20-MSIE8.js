

/*
VH20.InitializeEvent = function() {
  
   window.attachEvent('load', function() { VH20.Initialize(); } );
  
}
*/



VH20.OnWindowBeforeUnload = function() {
	
  // identified default code
  window.attachEvent("onbeforeunload", function (e) {
	  (e || window.event).returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";     
	  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";                                
  });
	
} 



VH20.document.getHead = function() { return document.getElementsByTagName('head')[0]; } 



VH20.document.InitializeEvents = function() {
   document.attachEvent('onkeydown', VH20.DocumentKeyDown);
   document.body.attachEvent('onclick', VH20.DocumentClick);
}
	

VH20.WrapDocument = function() { 
	/* look for and attach unhandled elements ...apply on all elements not already handled and elements not set as not editable */
	/* ! this function can be called on a document on which .Clear() has been runned */
	var _elements = document.body.querySelectorAll("body *");
	
	for (var i = 0 ; i < _elements.length ; i++) {
		if ( _elements[i].nodeType === 1 
					 && !_elements[i].hasAttribute("data-VH20-dsge")
					 && !_elements[i].hasAttribute("data-VH20-dsgk")
					 && !_elements[i].hasAttribute('data-VH20-hndk') ) { 
				
			VH20.WrapElement(_elements[i]);
			
			/* This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work) */
			if ( (_elements[i].childNodes.length === 0) 
					|| (_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
					|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
				_elements[i].contentEditable = true;
				
			/* Send info to handler */ 
			VH20.Events.ElementWrap(_elements[i]);
			}
	}
	/* the whole wrapping logic must be reviewed to allow to : (within document content, provide information to wrapper logic)*/
	/* 1. make an element part of the designer : at this time it is done setting it contentEditable=false, these elements disappear with .Clear()*/
	/* 2. make an element part of the content, but not editable ! these elements remain as content and aren't editable */
	/* often in the specification they say to use custom tag/expando to avoid collision, following this fact I should define custom tags */
	/* for each cases here above and use contentEditable only for its specification purpose */
}



VH20.WrapElementCode = function(elt) {
	
	/* Initialize element with required events and attributes */ 
	elt.attachEvent('onkeydown', VH20.ElementKeyDown);
	elt.attachEvent('onclick', VH20.ElementClick);
	elt.setAttribute("data-VH20-hndk","");
	
};



VH20.LoadDesignerCSS = function() {
	
	var  _element = document.createElement("style");
	_element.title = "VH20 . Designer-Toolbar";
	_element.id = "VH20-Designer-Styles";
	
	
	// _element.innerHTML += "*:not(hr)[data-VH20-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	// //_element.innerHTML += "body { margin-top: 100px; border-top: 1px solid gray; } ";	
	// _element.innerHTML += "body { border-top: 1px dotted lightgray; padding-top: 37px; } ";	
	// _element.innerHTML += "@media screen and (min-width:210px) { body { /*background-color: red;*/ padding-top: 125px; } } ";	
	// _element.innerHTML += "@media screen and (min-width:360px) { body { /*background-color: green;*/ padding-top: 75px; } } ";	
	// _element.innerHTML += "@media screen and (min-width:480px) { body { /*background-color: blue;*/ padding-top: 65px; } } ";		
	// _element.innerHTML += "@media screen and (min-width:640px) { body { /*background-color: transparent;*/ padding-top: 37px; } } ";	
	// _element.innerHTML += "@media print { #Designer-Toolbar { display: none; } :not(hr)[data-VH20-hndk] { min-height: inherit; border: none; } } ";	
	// //_element.innerText += "table, tr, td { border: 1px dotted lightgray; } ";	
	// _element.innerHTML += "#Designer-Toolbar { position: fixed; top: 0px; border-bottom: 1px dotted lightgray; } ";		
	// _element.innerHTML += "#Designer-Toolbar span { font-size: xx-small; } ";
 	

	/* Designer styles are added just after this script link */
	var _aux = VH20.document.getHead().querySelectorAll('script');
	var _aux1 = VH20.document.getHead().querySelector('script[src*="VH20.js"]');
	//_aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);
	// CSS come before vh20 script and optional browser specific code
	 _aux1.parentNode.insertBefore(_element, _aux1);

};


