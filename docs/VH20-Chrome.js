

VH20.OnWindowBeforeUnload = function() {	
 
 window.onbeforeunload = function () {
  //e.returnValue =  "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}

} 


