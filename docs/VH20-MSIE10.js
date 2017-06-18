VH20.SaveAs = function(file) {
	
	// this is added to make it work but clear isn't defined as a save as pre-condition
	VH20.Clear();
	// It fail a re-open because a dynamic code is re-executed before VH2017 init... 
  
	window.navigator.msSaveBlob(
		new Blob(["<!DOCTYPE html>"
			  +window.document.head.outerHTML
			  +window.document.body.outerHTML
			  + "</html>" ]), window.document.title+".html");
	
}



VH20.RemoveElement = function(elt) { elt.parentNode.removeChild(elt); };



VH20.OnWindowBeforeUnload = function() {
	
window.addEventListener('beforeunload', function() { return "Document about to be unloaded, this allow to choose to proceed or remain on the document."; }, false); 	

} 
