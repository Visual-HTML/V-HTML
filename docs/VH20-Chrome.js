

VH20.OnWindowBeforeUnload = function() {	
 
document.body.onbeforeunload = function() {
 return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
};

 
} 


