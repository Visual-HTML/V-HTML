

VH20.OnWindowBeforeUnload = function() {	
 
 alert("E");
 
 window.addEventListener("beforeunload", function () {
  alert("E1");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
});
 
(
 document.body.setAttribute("onbeforeunload", "return myFunction()");
)();
 
 function myFunction() {
  
  alert("E2");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
  
 };
 
} 

