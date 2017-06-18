

VH20.OnWindowBeforeUnload = function() {	
 
alert("A");
 
window.document.onbeforeunload = function(e){
   event.preventDefault(); 
alert("A1 " + e.type);
  alert("Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  return false;
};
 
} 

