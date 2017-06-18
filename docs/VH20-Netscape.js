
VH20.OnWindowBeforeUnload = function() {	
 
alert("C"); 
 
window.addEventListener("beforeunload", function(event) {
  event.returnValue = "my Coucara-salsa";
  alert("C1"); 
}, true); 
 
  
} 

