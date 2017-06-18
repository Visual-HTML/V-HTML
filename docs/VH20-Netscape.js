

VH20.OnWindowBeforeUnload = function() {	
 
 alert("F");
 
 document.body.setAttribute("onbeforeunload", "return myFunction()");

 
 function myFunction() {
    event.preventDefault(); 
  alert("Document about to be unloaded, this allow to choose to proceed or remain on the document.");
  
 };
 
} 

