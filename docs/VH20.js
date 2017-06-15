
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
VH20._TmpElt = null;
VH20.LoadDesignerScript = function() {

	if (this.DesignerUrl == null || this.DesignerUrl.replace(/\s/g,"") == "" ) return;
	
	var xReq = new XMLHttpRequest();
	xReq.open("GET", this.DesignerUrl, false);
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
VH20.RemoveResource = function(url) {
	
	var _elt2 = document.querySelector("script[data-VH20-Res='"+url+"']");
	 document.head.removeChild(_elt2);

};
VH20.RemoveDynamicScript = function(url) {

	var _elt2 = document.querySelector("script[src='"+url+"']");
	 document.head.removeChild(_elt2);
	 
};
//VH20.DesignerInitializeDocument = function() { console.log("VH20.DesignerInitializeDocument()' document initialization not provided."); };
VH20.LoadDesignerCSS = function() {
	
	var  _element = document.createElement("style");
	_element.title = "VH20- Designer Styles";
	_element.id = "VH20-Designer-Styles";
	_element.innerHTML += "*:not(hr)[data-VH20-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	//_element.innerHTML += "body { margin-top: 100px; border-top: 1px solid gray; } ";	
	_element.innerHTML += "body { border-top: 1px solid gray; } ";	
	_element.innerHTML += "#Designer-Toolbar { position: fixed; top: 0px; } ";	
	/* Designer styles are added just after this script link */
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src*="VH20.js"]');
	_aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);
	 
	 
	if (this._TmpElt == null) return;	
	 var _overridestyle = document.getElementById("VH20-Designer-Styles");
	 if ( this._TmpElt.getElementsByTagName('style').length > 0)
	       _overridestyle.innerHTML += this._TmpElt.getElementsByTagName('style')[0].innerHTML;


};
VH20.LoadDesignerHTML = function() {
	
	if (document.body.querySelector('#Designer-Toolbar') != null) {
		VH20.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	};
	
	var _defaultDesignerToolbar;
	
	_defaultDesignerToolbar = document.createElement("div");
	_defaultDesignerToolbar.id = "Designer-Toolbar";
	
	_defaultDesignerToolbar.innerHTML = navigator.appName + "<br />"  + navigator.userAgent + "<br />";
	
	var _clearButton = document.createElement("input");
	_clearButton.type = "button";
	_clearButton.value = "Clear";
	_clearButton.addEventListener("click", function(e){ e.stopPropagation(); VH20.Clear(); }, false);
	
	_defaultDesignerToolbar.appendChild(_clearButton);	
	
	if (navigator.appName == "Microsoft Internet Explorer") {
		var _saveAsButton = document.createElement("input");
		_saveAsButton.type = "button";
		_saveAsButton.value = "Save As";
		_saveAsButton.addEventListener("click", function(e){ e.stopPropagation(); VH20.CrossBrowser.SaveAs("SaveAs.html"); }, false);
		
		_defaultDesignerToolbar.appendChild(_saveAsButton);	
	};
	
	
	if (this._TmpElt != null) {
	 if ( this._TmpElt.getElementsByTagName('body').length > 0)
	       //_defaultDesignerToolbar.innerHTML += this._TmpElt.getElementsByTagName('body')[0].innerHTML;
				 var _designerContent = document.createElement("div");
				 _designerContent.innerHTML = this._TmpElt.getElementsByTagName('body')[0].innerHTML;
				 _defaultDesignerToolbar.appendChild(_designerContent);	
	};
	
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
	for (var i = 0 ; i < _elements.length ; i++) { VH20.CrossBrowser.RemoveElement(_elements[i]); };
	
	VH20.CrossBrowser.RemoveElement(document.head.querySelector('#VH20-Designer-Styles'));
	VH20.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	
	// save current script source (can be altered by browser's save as logic)
	var _currentscriptsrc = document.head.querySelector('script[src*="VH20.js"]').src;
	// mht file case
	if (window.location.href.search(/mht$/) > -1) {
		var _aux = document.head.querySelector('script[src*="VH20.js"]').src;
		_currentscriptsrc = _aux.substring(_aux.indexOf('!')+1);
	}

	VH20.CrossBrowser.RemoveElement(document.head.querySelector('script[src*="VH20.js"]'));
	
	if (document.head.querySelector('script[data-VH20-dsgk]') != null) {	
		VH20.CrossBrowser.RemoveElement(document.head.querySelector('script[data-VH20-dsgk]'));
	};
	
	// Remove data-VH20-Res
	var _res = document.head.querySelectorAll('script[data-VH20-Res]');
	for (var i = 0; i < _res.length ; i++) { VH20.CrossBrowser.RemoveElement(_res[i]); };
		
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
	_backeditor.innerHTML += "_elt.onload = function() { VH20.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar')); VH20.InitializeUserAgent(" + (this.DesignerUrl != null ? "'"+this.DesignerUrl+"'" : "") + "); }; ";
	_backeditor.innerHTML += "_elt.onerror = function() { window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code'); }; ";
	_backeditor.innerHTML += "document.head.insertBefore(_elt, document.head.firstChild); ";
	_backeditor.innerHTML += "}; ";
	 
	_backeditorHTML.appendChild(_inputButton);
	_backeditorHTML.appendChild(_backeditor);
		
	document.body.insertBefore(_backeditorHTML, document.body.firstChild);
	
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
		VH20.CurrentTarget.focus();
		
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
	 
		VH20.Browser.Class = "MSIE10";
	} else
	if ((navigator.appName == "Microsoft Internet Explorer") && (navigator.userAgent.indexOf("MSIE 11") > -1)) {
	
		VH20.Browser.Class = "MSIE11";
	} else
	if (((navigator.appName == "Opera") && (navigator.userAgent.indexOf("Opera") > -1)) 
		|| ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("OPR") > -1))) {
	
		VH20.Browser.Class = "Opera";
	} else
	if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("OPR") == -1))   {
	
		VH20.Browser.Class = "Netscape";
	} else
	if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Firefox") > -1) && (navigator.userAgent.indexOf("OPR") == -1)) {
	
		VH20.Browser.Class = "Firefox";
	} else 
	if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("Chrome") > -1))   {
	
         VH20.Browser.Class = "Chrome"; }
 return VH20.Browser.Class;
};
VH20.BrowserClass();

VH20.InitializeUserAgent = function(url) {
	/*
	// jQuery remain the best solution to solve user-agent specific code but I'm trying to avoid using it at start
	// Custom Controls and starters can use it but at the editor level I wish to implement a kind of dynamic loading
	*/ 
	
	VH20.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH20.document.body.designMode.InitialValue = document.designMode;

	document.body.removeAttribute("contentEditable");
	document.designMode = "off";
	/* by time to time (when cache is updated?) I get an error adding events on document : document undefined ? */

	// ensure script handle missing editor sources at document location
	// can happen if you code script reference to VH20.js
 	document.head.querySelector('script[src*="VH20.js"]').setAttribute("onerror","window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code');");
	
	/////////////////////////////////////// This introduce Platform-independent model where deigner code model things but no code is provided
	/// In designer code case there is a code provided : it's the last specification instructions but for cross-browser support they can be overriden
	// using expando, virtual functions, provided by javascript
	// define key/test on appName and userAgent to load appropriate code for the browser
	if (VH20.Browser.Class === "MSIE10") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-MSIE10.js");
	} else
	if (VH20.Browser.Class === "MSIE11") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-MSIE11.js");
	} else
	if (VH20.Browser.Class === "Opera") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Opera.js");
	} else
	if (VH20.Browser.Class === "Netscape")   {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Netscape.js");
	} else
	if (VH20.Browser.Class === "Firefox") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Firefox.js");
	} else 
	if (VH20.Browser.Class === "Chrome")   {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Chrome.js");
        }
	
	///////////////// end useragent specific code
	this.DesignerUrl = url;
	
	/* in the scope of an event I ca't say this.InitializeDocument(); */
	VH20.InitializeDocument();
	
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
		// This code will be replaced with the right instruction if supplied : InitializeUserAgent will load specific code
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
		VH20.CrossBrowser.RemoveElement(document.head.querySelector('#VH20-Designer-Styles'));
	}
	if (document.body.querySelector('#Designer-Toolbar') != null) {
		VH20.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	}
	/////////////////// end clear document
	
	
	document.addEventListener('keydown', this.DocumentKeyDown, false);	
	document.body.addEventListener('click', this.DocumentClick, false);	


	this.InitializeContent();
	
	
};

VH20.LoadDesigner = function(url) {

	//this.RemoveDesigner(); // This only remove all previous designer codes
	
	// loading script on the end make all css and html available to the script 
	//this.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?
	//this.LoadDesignerCSS();
	//this.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...

	this.DesignerUrl = url;

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
	
	//The following is designer purpose code, placing this initialization (of the designer toolbar)	
	//here make the document content wrapped and avoid making designer content wrapped...
	
	this.DesignerInitializeDocument();
	
	// loading script on the end make all css and html available to the script 
	this.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?
	
	this.LoadDesignerCSS();
 		
	this.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...

		
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
	}
}



VH20.ElementClick = function(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.stopPropagation();
	e.preventDefault();
	
	this.CurrentTarget = e.currentTarget;	
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
	}
}

VH20.DesignerInitializeDocument = function() {
	// This is a designer code: So editor must issue a call to a handler where designer 
  // can choose what to do initializing a document
  
  //if (document.body.childElementCount === 0) {
  if (VH20.document.body.Blank) {  
    // ! if document hold only designer code it is to consider as empty... 
    // this test can be a service of the editor because it's his business
    var _res = document.body.appendChild(document.createElement("p"));
    this.WrapElement(_res);
  };
	
};

/* when page is loaded, start initialization process: set user-agent specific code */
window.addEventListener('load', VH20.InitializeUserAgent, false);


