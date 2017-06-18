
VH20.OnWindowBeforeUnload = function() {	
 
alert("A"); 

window.onbeforeunload = function () {   
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 
  
} 

