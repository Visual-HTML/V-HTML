
/* isolate editors code within VH20, which become is an Object in window */
VH20 = {};
VH20.document={};
VH20.document.body={};
VH20.document.body.Blank = false;
VH20.document.body.contentEditable={};
VH20.document.body.designMode={};
VH20.CurrentTarget = null;
VH20.DesignerUrl = null;
VH20.SaveAs = function(file) { };
VH20.LoadDesignerScript = function() {

	if (VH20.DesignerUrl == null || VH20.DesignerUrl.replace(/\s/g,"") == "" ) return;
	
	var xReq = new XMLHttpRequest();
	xReq.open("GET", VH20.DesignerUrl, false);
	xReq.send(null);
	var  _element = document.createElement("html");
	_element.innerHTML = xReq.response;
	this._TmpElt = _element;
	var _scr = _element.getElementsByTagName("script")[0];
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH20-dsgk","");
	_elt2.innerHTML =  _scr.childNodes[0].textContent;
	document.head.appendChild(_elt2);
	
};
VH20.AddResource = function(url) {
	
	 var xReq = new XMLHttpRequest();
	 xReq.open("GET", url, false);
	 xReq.send(null);
	 var  _element = document.createElement("html");
	_element.innerHTML = xReq.response;
	var _scr = _element.getElementsByTagName("script")[0];
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH20-Res", url);
	_elt2.innerHTML =  _scr.childNodes[0].textContent;
	 document.head.appendChild(_elt2);

};
VH20.IncludeDynamicScript = function(url) {
	
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH20-Res", "");
	_elt2.src =  url;
	 document.head.appendChild(_elt2);
};
VH20.IncludeDynamicScriptAfter = function(url, elt) {
	
	var _elt = document.createElement("script");
	_elt.setAttribute("data-VH20-Res", "");
	_elt.src =  url;
	elt.parentNode.insertBefore(_elt, elt.nextSibling);
};
VH20.RemoveResource = function(url) {
	
	var _elt2 = document.querySelector("script[data-VH20-Res='"+url+"']");
	 document.head.removeChild(_elt2);

};
VH20.RemoveDynamicScript = function(url) {

	var _elt2 = document.querySelector("script[src='"+url+"']");
	 document.head.removeChild(_elt2);
	 
};
VH20.LoadDesignerCSS = function() {
	
	var  _element = document.createElement("style");
	_element.title = "VH20 . Designer-Toolbar";
	_element.id = "VH20-Designer-Styles";
	_element.innerHTML += "*:not(hr)[data-VH20-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	//_element.innerHTML += "body { margin-top: 100px; border-top: 1px solid gray; } ";	
	_element.innerHTML += "body { border-top: 1px dotted lightgray; padding-top: 37px; } ";	
	_element.innerHTML += "@media screen and (min-width:210px) { body { /*background-color: red;*/ padding-top: 125px; } } ";	
	_element.innerHTML += "@media screen and (min-width:360px) { body { /*background-color: green;*/ padding-top: 75px; } } ";	
	_element.innerHTML += "@media screen and (min-width:480px) { body { /*background-color: blue;*/ padding-top: 65px; } } ";		
	_element.innerHTML += "@media screen and (min-width:640px) { body { /*background-color: transparent;*/ padding-top: 37px; } } ";	
	_element.innerHTML += "@media print { #Designer-Toolbar { display: none; } :not(hr)[data-VH20-hndk] { min-height: inherit; border: none; } } ";	
	//_element.innerHTML += "table, tr, td { border: 1px dotted lightgray; } ";	
	_element.innerHTML += "#Designer-Toolbar { position: fixed; top: 0px; border-bottom: 1px dotted lightgray; } ";		
	_element.innerHTML += "#Designer-Toolbar span { font-size: xx-small; } ";	
	/* Designer styles are added just after this script link */
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src*="VH20.js"]');
	//_aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);
	// CSS come before vh20 script and optional browser specific code
	 _aux1.parentNode.insertBefore(_element, _aux1);

};
VH20.LoadDesignerHTML = function() {
	
	if (document.body.querySelector('#Designer-Toolbar') != null) {
		VH20.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	};
	
	var _defaultDesignerToolbar;
	
	_defaultDesignerToolbar = document.createElement("div");
	_defaultDesignerToolbar.id = "Designer-Toolbar";
	
	_defaultDesignerToolbar.innerHTML = '<span title="navigator.appName">' + navigator.appName + '</span>' + ' ; '  + 
		'<span title="navigator.userAgent">' + navigator.userAgent + '</span>' + ' ; '  + 
		'<span title="VH20.Browser.Class">' + VH20.Browser.Class + '</span>' + '<br />';
		
	
	var _clearButton = document.createElement("input");
	_clearButton.type = "button";
	_clearButton.value = "Clear";
	_clearButton.addEventListener("click", function(e){ e.stopPropagation(); VH20.Clear(); }, false);
	
	_defaultDesignerToolbar.appendChild(_clearButton);
	
	
	if (navigator.appName == "Microsoft Internet Explorer") {
		var _saveAsButton = document.createElement("input");
		_saveAsButton.type = "button";
		_saveAsButton.value = "Save As";
		_saveAsButton.addEventListener("click", function(e){ e.stopPropagation(); VH20.SaveAs("SaveAs.html"); }, false);
		
		_defaultDesignerToolbar.appendChild(_saveAsButton);	
	};
	
	
	var _documentTitle =  document.createElement("input");
	_documentTitle.type = "text";
	_documentTitle.placeholder = "document title...";
	_documentTitle.value = document.title;
	_documentTitle.addEventListener("change", function(e){ e.stopPropagation(); document.title = e.currentTarget.value; }, false);

	_defaultDesignerToolbar.appendChild(_documentTitle);

	document.body.insertBefore(_defaultDesignerToolbar, document.body.firstChild);
	
};
VH20.Clear = function() {
	
	document.removeEventListener('keydown', this.DocumentKeyDown, false);	
	document.body.removeEventListener('click', this.DocumentClick, false);	
	
    	var _elements = document.querySelectorAll('body *[data-VH20-hndk]');
	for (var i = 0 ; i < _elements.length ; i++) {
		this.UnWrapElementCode(_elements[i]);
		_elements[i].removeAttribute("contentEditable");
	}
	
	//_elements = document.body.querySelectorAll("body *[contentEditable='false']");
	_elements = document.body.querySelectorAll("body *[data-VH20-dsge]");
	for (var i = 0 ; i < _elements.length ; i++) { VH20.RemoveElement(_elements[i]); };
	
	// Designer Initialization in Initial document' head element
	var _element = document.head.querySelector("head *[data-VH20-dsgi]");
	if (_element != null) VH20.RemoveElement(_element);
	
	VH20.RemoveElement(document.head.querySelector('#VH20-Designer-Styles'));
	VH20.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	
	// save current script source (can be altered by browser's save as logic)
	var _currentscriptsrc = document.head.querySelector('script[src*="VH20.js"]').src;
	// mht file case
	if (window.location.href.search(/mht$/) > -1) {
		var _aux = document.head.querySelector('script[src*="VH20.js"]').src;
		_currentscriptsrc = _aux.substring(_aux.indexOf('!')+1);
	}

	VH20.RemoveElement(document.head.querySelector('script[src*="VH20.js"]'));
	
	if (document.head.querySelector('script[data-VH20-dsgk]') != null) {	
		VH20.RemoveElement(document.head.querySelector('script[data-VH20-dsgk]'));
	};
	
	// Remove data-VH20-Res
	var _res = document.head.querySelectorAll('script[data-VH20-Res]');
	for (var i = 0; i < _res.length ; i++) { VH20.RemoveElement(_res[i]); };
		
	//Add Get Editor function
	var _backeditorHTML = document.createElement("div");
	_backeditorHTML.id = "Designer-Toolbar";
	_backeditorHTML.setAttribute("style","position: fixed; top: 0px;");
	var _inputButton = document.createElement("input");
	_inputButton.value = "get editor";
	_inputButton.setAttribute("value", "get editor");
	_inputButton.type = "button";
	_inputButton.setAttribute("onclick", "GetBackEditor(); ");
	var _backeditor = document.createElement("script");
	_backeditor.innerHTML += "function GetBackEditor() {";
	_backeditor.innerHTML += "var _elt = document.createElement('script'); ";
	_backeditor.innerHTML += "_elt.src = '" + _currentscriptsrc + "'; ";
	_backeditor.innerHTML += "_elt.onload = function() { VH20.RemoveElement(document.body.querySelector('#Designer-Toolbar')); VH20.Initialize(" + (VH20.DesignerUrl != null ? "'" + VH20.DesignerUrl.toString +"'" : "") + "); }; ";
	//_backeditor.innerHTML += "_elt.onerror = function() { window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code'); }; ";
	_backeditor.innerHTML += "_elt.setAttribute('onerror', 'javascript:window.open(\"https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code\");');";
	_backeditor.innerHTML += "document.head.insertBefore(_elt, document.head.firstChild); ";
	_backeditor.innerHTML += "}; ";
	 
	_backeditorHTML.appendChild(_inputButton);
	_backeditorHTML.appendChild(_backeditor);
		
	document.body.insertBefore(_backeditorHTML, document.body.firstChild);
	
	_element = document.createElement("style");
	_element.title = "VH20 . Designer-Toolbar";
	_element.id = "VH20-Designer-Styles";
	_element.innerHTML += "@media print { #Designer-Toolbar { display: none; } ";	
	document.head.appendChild(_element);
	
};
VH20.WrapElementCode = function(elt) {
	
	/* Initialize element with required events and attributes */ 
	elt.addEventListener('keydown', this.ElementKeyDown, false);
	elt.addEventListener('click', this.ElementClick, false);
	elt.setAttribute("data-VH20-hndk","");
	
};
VH20.UnWrapElementCode = function(elt) {
	
	/* Remove from HTMLElement required events and attributes */
	elt.removeEventListener('keydown', this.ElementKeyDown, false);
	elt.removeEventListener('click', this.ElementClick, false);
	elt.removeAttribute("data-VH20-hndk","");
	
};
VH20.Events = {};
VH20.Events.ElementClick = function(evt) { };
VH20.Events.ElementWrap = function(evt) { };
VH20.WrapDocument = function() { 
	/* look for and attach unhandled elements ...apply on all elements not already handled and elements not set as not editable */
	/* ! this function can be called on a document on which .Clear() has been runned */
	var _elements = document.body.querySelectorAll("body *:not([data-VH20-hndk]):not([contentEditable='false'])");
	
	for (var i = 0 ; i < _elements.length ; i++) {
		if ( _elements[i].nodeType === 1 
					 && !_elements[i].hasAttribute("data-VH20-dsge")
					 && !_elements[i].hasAttribute("data-VH20-dsgk")
					 && !_elements[i].hasAttribute('data-VH20-hndk') ) { 
				
			VH20.WrapElement(_elements[i]);
			
			/* This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work) */
			if ( (_elements[i].childNodes.length === 0) 
					|| (_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
					|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
				_elements[i].contentEditable = true;
				
			/* Send info to handler */ 
			VH20.Events.ElementWrap(_elements[i]);
			}
	}
	/* the whole wrapping logic must be reviewed to allow to : (within document content, provide information to wrapper logic)*/
	/* 1. make an element part of the designer : at this time it is done setting it contentEditable=false, these elements disappear with .Clear()*/
	/* 2. make an element part of the content, but not editable ! these elements remain as content and aren't editable */
	/* often in the specification they say to use custom tag/expando to avoid collision, following this fact I should define custom tags */
	/* for each cases here above and use contentEditable only for its specification purpose */
}
/* Wrapping elements allow to get a handle on them interactivity with a click */
VH20.WrapElement = function(elt) {
	
		VH20.WrapElementCode(elt);
		
		/* This is already a designer option, a designer can choose to provide editing on text otherwise than this function */
		elt.contentEditable = true;
		
		VH20.CurrentTarget = elt;
		VH20.Events.ElementWrap(elt);  /* Inform using handler */
		//VH20.CurrentTarget.focus(); //avoid focusing and scrolling within the wrapping logic
		
}
VH20.WrapElementById = function(id) {
	
	var elt = document.getElementById(id);
	/*
	// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
	//elt.contentEditable = true;
	
	// id can be removed
	*/
	elt.removeAttribute('id');
	
	VH20.WrapElementCode(elt);
	VH20.CurrentTarget = elt;
	/*this is what is done, call removed : VH20.Events.ElementWrap(elt);  --------- Inform using handler */
	VH20.CurrentTarget.focus();
	/*
	// This function is used (and was created by a need of, rather, a designer code, so the editor provide
	// this service while a designer, starter or custom control canmanage this (wrap a new injected element) its own way...
	*/
				  
}
VH20.Browser = {};
VH20.Browser.Class = "default";
VH20.BrowserClass = function() {
	
if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.userAgent.indexOf("MSIE 10") > -1)) {
	VH20.Browser.Class = "MSIE10"; } 
	else if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.userAgent.indexOf("MSIE 11") > -1)) {
		VH20.Browser.Class = "MSIE11"; }
	else if (((navigator.appName == "Opera") && (navigator.userAgent.indexOf("Opera") > -1)) 
		|| ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("OPR") > -1))) {
		VH20.Browser.Class = "Opera"; } 
	else if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("OPR") == -1) && (navigator.userAgent.indexOf("Chrome") == -1)) {
		VH20.Browser.Class = "Netscape"; } 
	else if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Firefox") > -1) && (navigator.userAgent.indexOf("OPR") == -1) && (navigator.userAgent.indexOf("Chrome") == -1)) {
		VH20.Browser.Class = "Firefox"; } 
	else if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("Chrome") > -1)) {
		VH20.Browser.Class = "Chrome"; }
	
 return VH20.Browser.Class;
	
};
VH20.BrowserClass();
VH20.DesignerInitializeDocument = function() {
	
	// This is a designer code: So editor must issue a call to a handler where designer 
  // can choose what to do initializing a document
  
  //if (document.body.childElementCount === 0) {
  if (VH20.document.body.Blank) {  
    // ! if document hold only designer code it is to consider as empty... 
    // this test can be a service of the editor because it's his business
    var _res = document.body.appendChild(document.createElement("p"));
    this.WrapElement(_res);
	  _res.focus();
	  _res.click();
  };
	
};
VH20.OnWindowBeforeUnload = function() {
	
  // identified default code
  window.addEventListener("beforeunload", function (e) {
	  (e || window.event).returnValue = "Document about to be unloaded, this allow to choose to proceed or remain on the document.";     
	  return "Document about to be unloaded, this allow to choose to proceed or remain on the document.";                                
  });
	
} 
VH20.Initialize = function() {
	// process a list of arguments as urls for designer code to load...
	
	/* by time to time (when cache is updated?) I get an error adding events on document : document undefined ? */
	if (document.body == null) return;
	// avoid errors when in debug mode and rfresh that trigger the code...?
	// all these should not be necessary in "normal"/stable context...
	
	VH20.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH20.document.body.designMode.InitialValue = document.designMode;

	document.body.removeAttribute("contentEditable");
	document.designMode = "off";

	// set the document unload warning
	VH20.OnWindowBeforeUnload();		
	
		
	VH20.InitializeDocument();
	
	VH20.InitializeContent();
	
	// loading script on the end make all css and html available to the script 
	//VH20.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?	
	VH20.LoadDesignerCSS(); 
	VH20.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...
		
	// called from VH20 window/load/event handler with no parameters
	if (arguments.length > 0) { VH20.DesignerUrl = arguments; };
	for (var i = 0; i < arguments.length ; i++) {
	  VH20.SwitchDesigner(arguments[i]); 
	}
		
	//The following is designer purpose code, placing this initialization (of the designer toolbar)	
	//here make the document content wrapped and avoid making designer content wrapped...	
	VH20.DesignerInitializeDocument();
	
}
VH20.SwitchDesigner = function(url) {
	//get content at url === VH20._Tmp.... if something with script/css/html is found launch the process
	var xReq = new XMLHttpRequest();
	xReq.open("GET", url, false);
	xReq.send(null);
	
	var  _element = document.createElement("html");
	_element.innerHTML = xReq.response;
	
	// do some checks before proceed to clear
	// Clear isn't needed when designer is loaded in VH20.Initialize
	//VH20.Clear(); 
	// ++ Designer specific code to clear ?

	// loading script on the end make all css and html available to the script 
	//VH20.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?
	// = load script from source code
	var _scr = _element.getElementsByTagName("script")[0];
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH20-dsgk","");
	_elt2.innerHTML =  _scr.childNodes[0].textContent;
	document.head.appendChild(_elt2);

	// VH20.LoadDesignerCSS();
	// = load designer styles	
	 var _overridestyle = document.getElementById("VH20-Designer-Styles");
	 if ( _element.getElementsByTagName("style")[0].length > 0)
	       _overridestyle.innerHTML += _element.getElementsByTagName('style')[0].innerHTML;

	//VH20.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...
	// = load designer body content - this must be inserted within #Designer-Toolbar
	var _designerContent = document.createElement("div");
	_designerContent.innerHTML = _element.getElementsByTagName('body')[0].innerHTML;
	document.getElementById("Designer-Toolbar").appendChild(_designerContent);

	//The following is designer purpose code, placing this initialization (of the designer toolbar)	
	//here make the document content wrapped and avoid making designer content wrapped...	
	VH20.DesignerInitializeDocument();
		
	//Single file holding code to setup designer...
	//VH20._TmpElt = null; //TODO: this must disappear - write the single document designer function - remove from this code the "chain" of process based on this variable
	// this will no longer be needed, the designer loading process will become interactive 
	// the previous version was only at page parsing
}
VH20.RemoveElement = function(elt) { 
	// Default code is to try/catch different instructions that may work
	try { elt.remove(true); console.log("used:.remove(true)"); } 
		catch(xcp) {		
			try {
			elt.removeNode(true); console.log("used:.removeNode(true)"); 
			} catch(xcp) { 
			elt.parentNode.removeChild(elt); console.log("used:.removeChild(elt)"); }
			finally { console.log("cross-browser"); };		
		} 
		finally { console.log("cross-browser"); };
		// This code will be replaced with the right instruction if supplied : Initialize() will load specific code
};
VH20.InitializeDocument = function() {	
	
	// check and remove all remainings from previous edit session
	// If user hasnt cleared the code I can retrieve 
	// a designer toolbar and all elements set with data-VH20-hndk
    	var _elements = document.querySelectorAll('body *[data-VH20-hndk]');
	for (var i = 0 ; i < _elements.length ; i++) {
		VH20.UnWrapElement(_elements[i]);
		_elements[i].removeAttribute("contentEditable");
	}
	if (document.head.querySelector('#VH20-Designer-Styles') != null) {
		VH20.RemoveElement(document.head.querySelector('#VH20-Designer-Styles'));
	}
	if (document.body.querySelector('#Designer-Toolbar') != null) {
		VH20.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	}
	/////////////////// end clear document
	
	
	document.addEventListener('keydown', this.DocumentKeyDown, false);	
	document.body.addEventListener('click', this.DocumentClick, false);	
	
};
VH20.LoadDesigner = function(url) {

	//this.RemoveDesigner(); // This only remove all previous designer codes
	
	// loading script on the end make all css and html available to the script 
	//this.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?
	//this.LoadDesignerCSS();
	//this.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...

	VH20.DesignerUrl = url;

	//this.DesignerInitializeDocument();

};
VH20.InitializeContent = function() {	

	/* Begin with a procces that wrap existing content */
	this.WrapDocument();
	
	if (document.body.querySelector("[contentEditable='true']") != null) {
		/* first child not for designer purpose get focused */
		VH20.CurrentTarget = document.body.querySelector("[contentEditable='true']");
		// here if the document is empty..
		VH20.CurrentTarget.focus();
		try { 
		/* some browser need to trigger a click after .focus() */
		VH20.CurrentTarget.click(); }
		catch(xcp) { 
		/* while some other will not even provide the function ? it's maybe an element without click ? to check! */
		console.log("catch exception : .click() on " + VH20.CurrentTarget.nodeName);  }
		finally { };
	} else {
		// empty document processing
		
		/////////////////////////////////// ? branch to designer
		//Notepad designer:
		//VH20.DesignerUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170226.html";
		//editsDesigner designer:
		//VH20.DesignerUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170307.html";
		
		VH20.document.body.Blank = true;
	}
			
}
VH20.ElementKeyDown =  function(e) { 
         
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));	   
	VH20.OnElementKeyDown(e);
	
}
VH20.OnElementKeyDown =  function(e) {
	
	if (e.which === 13 && !e.shiftKey) {		
		// prevent default only in this case: return down, not even released 		
		e.preventDefault();		
		e.stopPropagation();		
		
		// Add content pressing enter 		
		var _elt = document.createElement("p");					
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);		
		// and wrap it 		
		VH20.WrapElement(_res);
		VH20.CurrentTarget.focus();
	}
	
}
VH20.ElementClick = function(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.stopPropagation();
	e.preventDefault();
	
	VH20.CurrentTarget = e.currentTarget;	
	VH20.Events.ElementClick(e);  /* Inform designer that element was selected */

}
VH20.DocumentClick = function(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
}
VH20.DocumentKeyDown = function(e) { 
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	VH20.OnDocumentKeyDown(e);
	
}
VH20.OnDocumentKeyDown = function(e) { 
	
/* This is designer code! : VH20 default hardcode notepad designer */
	
	if (e.which === 13) {
		// Enter on document add a new paragraph
		e.preventDefault();
		
		var _res = document.body.appendChild(document.createElement("p")); 
		//TODO: designer must be able to say what element is added : div, ul, ol? blockquote?...
		VH20.WrapElement(_res);
		VH20.CurrentTarget.focus();
	}
	
}

/* when page is loaded, start initialization process: set user-agent specific code */
window.addEventListener('load', function() { VH20.Initialize(); } , false);


// ensure script handle missing editor sources at document location
document.head.querySelector('script[src*="VH20.js"]').setAttribute("onerror","window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code');");


// load VH20' browser specific code
if (VH20.Browser.Class === "MSIE10") {
	VH20.IncludeDynamicScriptAfter("https://visual-html.github.io/V-HTML/VH20-MSIE10.js",
		document.head.querySelector('script[src*="VH20.js"]')); } 
else if (VH20.Browser.Class === "MSIE11") {
 	VH20.IncludeDynamicScriptAfter("https://visual-html.github.io/V-HTML/VH20-MSIE11.js",
	 	document.head.querySelector('script[src*="VH20.js"]')); }
else if (VH20.Browser.Class === "Opera") {
 	VH20.IncludeDynamicScriptAfter("https://visual-html.github.io/V-HTML/VH20-Opera.js",
	 	document.head.querySelector('script[src*="VH20.js"]')); }
else if (VH20.Browser.Class === "Netscape") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Netscape.js",
	 	document.head.querySelector('script[src*="VH20.js"]')); }
else if (VH20.Browser.Class === "Firefox") {
 	VH20.IncludeDynamicScriptAfter("https://visual-html.github.io/V-HTML/VH20-Firefox.js",
		document.head.querySelector('script[src*="VH20.js"]')); }
else if (VH20.Browser.Class === "Chrome") {
	VH20.IncludeDynamicScriptAfter("https://visual-html.github.io/V-HTML/VH20-Chrome.js",
		document.head.querySelector('script[src*="VH20.js"]'));
}


