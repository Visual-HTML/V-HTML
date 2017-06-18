

VH20.OnWindowBeforeUnload = function() {	
 
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";

  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});
 
} 


