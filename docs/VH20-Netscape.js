

VH20.OnWindowBeforeUnload = function() {	
 
 alert("C");
 
 window.addEventListener("beforeunload", function (event) {
  alert("C1");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
});
 
(
 document.body.setAttribute("onbeforeunload", "return myFunction()");
)();
 
 function myFunction() { 
  alert("C2");
  event.returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";
 };
 
} 

