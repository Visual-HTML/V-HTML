

VH20.OnWindowBeforeUnload = function() {	
 
alert("C");

 window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  alert("C1");
  //e.returnValue = confirmationMessage;    
  
  //return confirmationMessage;
  
  return;
});
  
 
} 

