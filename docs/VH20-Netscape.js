
VH20.OnWindowBeforeUnload = function() {	
 
alert("B"); 
 
window.addEventListener("beforeunload", function (event) {
  event.returnValue = "my Coucara-salsa";
  alert("B1"); 
}); 
 
  
} 

