
VH20.OnWindowBeforeUnload = function() {	
 
alert("E"); 
 
document.body.setAttribute('onbeforenload', "function(e){ return 'xxx'; }", true);
  
} 

