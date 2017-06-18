
VH20.OnWindowBeforeUnload = function() {	
 
alert("E"); 
 
//TODO: find the code to handle document unload warning - Safari' code 
document.body.setAttribute("onbeforenload", "function(e){ return 'xxx'; }", true);
  
} 

