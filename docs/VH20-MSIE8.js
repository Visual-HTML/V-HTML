

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


