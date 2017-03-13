
VH20.CrossBrowser.SaveAs = function(file) {
	
	// this is added to make it work but clear isn't defined as a save as pre-condition
	VH2017.Clear();
	// It fail a re-open because a dynamic code is re-executed before VH2017 init... 
  
	window.navigator.msSaveBlob(
		new Blob(["<!DOCTYPE html>"
			  +window.document.head.outerHTML
			  +window.document.body.outerHTML
			  + "</html>" ]), file);
	
}



VH20.CrossBrowser.RemoveElement = function(elt) {
	elt.parentNode.removeChild(elt);
	
	/*
	// Default code is to try/catch different instructions that may work
	try { elt.remove(true); console.log("used:.remove(true)"); } 
		catch(xcp) {		
			try {
			elt.removeNode(true); console.log("used:.removeNode(true)"); 
			} catch(xcp) { 
			elt.parentNode.removeChild(elt); console.log("used:.removeChild(elt)"); }
			finally { console.log("cross-browser"); };		
		} 
		finally { console.log("cross-browser"); };
		// This code will be replaced with the right instruction if supplied : InitializeUserAgent will load specific code
	*/
};
