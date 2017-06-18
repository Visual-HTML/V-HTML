

VH20.OnWindowBeforeUnload = function() {	
 
window.addEventListener("beforeunload", function (e) {
 e.preventDefault();
 e.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
});

} 


