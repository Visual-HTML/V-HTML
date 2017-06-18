

VH20.OnWindowBeforeUnload = function() {	
 alert("A");
 window.onbeforeunload = function () {
  //event.preventDefaults();
  alert("A");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}

} 
