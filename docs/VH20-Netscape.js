
VH20.OnWindowBeforeUnload = function() {	
 
 alert(window.onunload);
 alert(window.onbeforeunload);
 alert(window.document.onunload);
 alert(window.document.onbeforeunload);
 alert(window.document.body.onunload);
 alert(window.document.body.onbeforeunload);
 
window.onunload = function () {  
 alert("event caught ?");
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 
  
} 

