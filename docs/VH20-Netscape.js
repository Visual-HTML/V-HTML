

VH20.OnWindowBeforeUnload = function() {	
 
alert("Z");

window.addEventListener("beforeunload", function(e) { e.preventDefault(); alert("Z1"); });
  
} 

