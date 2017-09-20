

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
   document.attachEvent('onkeydown', this.DocumentKeyDown);
   document.body.attachEvent('onclick', this.DocumentClick);
}
	
