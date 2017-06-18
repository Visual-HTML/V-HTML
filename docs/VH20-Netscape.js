

VH20.OnWindowBeforeUnload = function() {	
 
alert("Z");

window.addEventListener("beforeunload", function(event) { event.preventDefault(); });
  
} 

