VH20.OnWindowBeforeUnload = function() {	
  
window.addEventListener("beforeunload", function( event ) {
  event.preventDefault();
});
} 
