
VH20.OnWindowBeforeUnload = function() {	
  
window.onunload = function () {  
 
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return "//TODO:window.onunload";    
  
} 
 
window.onbeforeunload = function () {
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return "//TODO:window.onbeforeunload";   
  
} 

} 

