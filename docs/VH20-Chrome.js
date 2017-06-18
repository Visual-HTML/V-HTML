

VH20.OnWindowBeforeUnload = function() {	
 
window.document.addEventListener("beforeunload", function (e) {
 e.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
 return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
}, false);

 
} 


