
VH20.OnWindowBeforeUnload = function() {	
 
alert("D"); 
 
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "D1";

  (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
  return confirmationMessage;                                //Webkit, Safari, Chrome etc.
});
 
  
} 

