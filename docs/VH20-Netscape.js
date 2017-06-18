
VH20.OnWindowBeforeUnload = function() {	
 
alert("A"); window.document.body.addEventListener("beforeunload", function(e) { e.preventDefault(); alert("A1"); });
  
} 

