

VH20.OnWindowBeforeUnload = function() {	
 
 alert("A");
 
 window.onbeforeunload = function () {
  //event.preventDefaults();
  alert("A1");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}
 
window.addEventListener('beforeunload', function() {
 alert("A2");
 return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}, false);
 
} 
