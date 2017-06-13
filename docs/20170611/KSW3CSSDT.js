// This is my designer code for KSW3CSSDT.html

//The first thing is to ensure VH20 is included
if (document.head.querySelector('script[src*="vh20.js"]') === null) {
  var _elt = document.createElement("script");
  _elt.src = "VH20.js";
  var _currentscriptnode = document.head.querySelector('script[src*="KSW3CSSDT.js"]');
  
  _elt.onload = function() {
    VH20.InitializeUserAgent = function(){ alert("and now ?...");}
    VH20.InitializeUserAgent();
    
  }
  
  
  document.head.appendChild(_elt, _currentscriptnode.nextElementSibling);  
}

// Setup the intialization code


// Make the intialization run


////////////////////// Other codes introduced by the designer

