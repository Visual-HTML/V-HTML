

VH20.OnWindowBeforeUnload = function() {	
 
 window.onbeforeunload = function () {
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}

} 


