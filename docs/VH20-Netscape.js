

VH20.OnWindowBeforeUnload = function() {	
 
alert("I");
 
window.document.onbeforeunload = function(e){
   event.preventDefault(); 
alert("I1"+e.type);
  alert("Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  return false;
};
 
} 

