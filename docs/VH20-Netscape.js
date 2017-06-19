
VH20.OnWindowBeforeUnload = function() {	
 
window.onbeforeunload = function () {  
 alert("event caught ?");
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 
  
} 

