

VH20.OnWindowBeforeUnload = function() {	
 
 alert("A");
 
 window.addEventListener("beforeunload", function (event) {
  alert("A1");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
});
 
} 
