
VH20.OnWindowBeforeUnload = function() {	
  
window.onunload = function () {  
 alert("event caught ?");
 //TODO: find the Safari' code to handle document unload warning
  window.event.returnValue = false;   
  return false;    
} 


 alert(window.onunload);
 alert(window.onbeforeunload);
 alert(window.document.body.onunload);
 alert(window.document.body.onbeforeunload);

} 

