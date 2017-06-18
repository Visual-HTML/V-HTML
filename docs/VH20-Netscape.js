

VH20.OnWindowBeforeUnload = function() {	
 
 alert("D");
 
 window.addEventListener("beforeunload", function () {
  alert("D1");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
});
 
(
 document.body.setAttribute("onbeforeunload", "return myFunction()");
)();
 
 function myFunction() {
  
  alert("D2");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  
 };
 
} 

