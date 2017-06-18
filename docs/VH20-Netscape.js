

VH20.OnWindowBeforeUnload = function() {	
 
alert("D");

 window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  alert("D1");
  //e.returnValue = confirmationMessage;    
  
  //return confirmationMessage;
  
  return;
}, false);
  
 
} 

