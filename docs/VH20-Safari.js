

VH20.OnWindowBeforeUnload = function() {	
 alert("called");
 window.onbeforeunload = function () {
  event.returnValue = confirmationMessage;
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document."
}

} 
