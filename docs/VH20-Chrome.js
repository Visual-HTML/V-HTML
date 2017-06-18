

VH20.OnWindowBeforeUnload = function() {	
 
window.onbeforeunload = function(event) { 
 event.preventDefault();
 event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
 return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
};
 
} 


