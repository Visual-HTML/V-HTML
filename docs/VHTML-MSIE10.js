
VHTML.document.SaveAs = function(file) {
	
	// this is added to make it work but clear isn't defined as a save as pre-condition
	VHTML.Clear();
	// It fail a re-open because a dynamic code is re-executed before VH2017 init... 
  
	window.navigator.msSaveBlob(
		new Blob(["<!DOCTYPE html>"
			  +window.document.head.outerHTML
			  +window.document.body.outerHTML
			  + "</html>" ]), file);
	
}



