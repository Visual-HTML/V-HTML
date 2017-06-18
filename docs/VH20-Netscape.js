

VH20.OnWindowBeforeUnload = function() {	
 
alert("H");
 
window.onbeforeunload = function(){
   event.preventDefault(); 
alert("H1");
  alert("Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  return false;
};
 
} 

