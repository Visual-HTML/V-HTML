
VH20.OnWindowBeforeUnload = function() {	
 
 alert(window.document.body.onunload);
 alert(window.document.body.onbeforeunload);
 alert(window.document.onunload);
 alert(window.document.onbeforeunload);
 
window.onunload = function () {  
 alert("event caught ?");
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 
  
} 

