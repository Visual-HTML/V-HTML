

VH20.OnWindowBeforeUnload = function() {	
 
alert("B");

window.document.body.onbeforeunload = function(e){
   event.preventDefault(); 
alert("B1 " + e.type);
  alert("Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  return false;
};
 
} 

