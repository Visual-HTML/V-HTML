

VH20.OnWindowBeforeUnload = function() {	
 
 alert("B");
 
 window.onbeforeunload = function (e) {
  //event.preventDefaults();
  alert("B1");
  e.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}
 
window.addEventListener('beforeunload', function(e) {
 alert("B2");
 e.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
 return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}, false);
 
} 
