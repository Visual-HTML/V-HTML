
VH20.OnWindowBeforeUnload = function() {	
 
 alert(window.onunload);
 alert(window.onbeforeunload);
 
window.onunload = function () {  
 alert("event caught ?");
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 
  
} 

