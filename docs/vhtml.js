
/* isolate editors code within VH20, which become is an Object in window */
VHTML = {};
VHTML.document={};
VHTML.document.body={};
VHTML.document.body.Blank = false;
VHTML.document.body.contentEditable={};
VHTML.document.body.designMode={};
VHTML.CurrentTarget = null;
VHTML.DesignerUrl = null;
VHTML.CrossBrowser = {};
VHTML.CrossBrowser.SaveAs = function(file) { };
VHTML._TmpElt = null;
VHTML.LoadDesignerScript = function() {

	if (this.DesignerUrl == null || this.DesignerUrl.replace(/\s/g,"") == "" ) return;
	
	//VH20.ImportDynamicScript(...);
	
};
//VHTML.DesignerInitializeDocument = function() { console.log("VHTML.DesignerInitializeDocument()' document initialization not provided."); };
VHTML.LoadDesignerCSS = function() {
	
	var  _element = document.createElement("style");
	_element.title = "VH20- Designer Styles";
	_element.id = "VH20-Designer-Styles";
	_element.innerHTML += "*:not(hr)[data-VH20-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	//_element.innerHTML += "body { margin-top: 100px; border-top: 1px solid gray; } ";	
	_element.innerHTML += "body { border-top: 1px solid gray; } ";	
	_element.innerHTML += "#Designer-Toolbar { position: fixed; top: 0px; } ";	
	/* Designer styles are added just after this script link */
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src*="VHTML.js"]');
	_aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);
	 
	 
	if (this._TmpElt == null) return;	
	 var _overridestyle = document.getElementById("VH20-Designer-Styles");
	 if ( this._TmpElt.getElementsByTagName('style').length > 0)
	       _overridestyle.innerHTML += this._TmpElt.getElementsByTagName('style')[0].innerHTML;


};
VHTML.LoadDesignerHTML = function() {
	
	if (document.body.querySelector('#Designer-Toolbar') != null) {
		VHTML.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	};
	
	var _defaultDesignerToolbar;
	
	_defaultDesignerToolbar = document.createElement("div");
	_defaultDesignerToolbar.id = "Designer-Toolbar";
	
	_defaultDesignerToolbar.innerHTML = navigator.appName + "<br />"  + navigator.userAgent + "<br />";
	
	var _clearButton = document.createElement("input");
	_clearButton.type = "button";
	_clearButton.value = "Clear";
	_clearButton.addEventListener("click", function(e){ e.stopPropagation(); VHTML.Clear(); }, false);
	
	_defaultDesignerToolbar.appendChild(_clearButton);	
	
	if (navigator.appName == "Microsoft Internet Explorer") {
		var _saveAsButton = document.createElement("input");
		_saveAsButton.type = "button";
		_saveAsButton.value = "Save As";
		_saveAsButton.addEventListener("click", function(e){ e.stopPropagation(); VHTML.CrossBrowser.SaveAs("SaveAs.html"); }, false);
		
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

VHTML.Clear = function() {
	
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
	
	VH20.RemoveElement(document.head.querySelector('#VH20-Designer-Styles'));
	VH20.RemoveElement(document.body.querySelector('#Designer-Toolbar'));
	
	// save current script source (can be altered by browser's save as logic)
	var _currentscriptsrc = document.head.querySelector('script[src*="VHTML.js"]').src;
	// mht file case
	if (window.location.href.search(/mht$/) > -1) {
		var _aux = document.head.querySelector('script[src*="VHTML.js"]').src;
		_currentscriptsrc = _aux.substring(_aux.indexOf('!')+1);
	}

	VH20.RemoveElement(document.head.querySelector('script[src*="VHTML.js"]'));
	
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
	_backeditor.innerHTML += "_elt.onload = function() { VHTML.CrossBrowser.RemoveElement(document.body.querySelector('#Designer-Toolbar')); VHTML.InitializeUserAgent(" + (this.DesignerUrl != null ? "'"+this.DesignerUrl+"'" : "") + "); }; ";
	_backeditor.innerHTML += "_elt.onerror = function() { window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code'); }; ";
	_backeditor.innerHTML += "document.head.insertBefore(_elt, document.head.firstChild); ";
	_backeditor.innerHTML += "}; ";
	 
	_backeditorHTML.appendChild(_inputButton);
	_backeditorHTML.appendChild(_backeditor);
		
	document.body.insertBefore(_backeditorHTML, document.body.firstChild);
	
};

VHTML.WrapElementCode = function(elt) {
	/* Initialize element with required events and attributes */ 
	elt.addEventListener('keydown', this.ElementKeyDown, false);
	elt.addEventListener('click', this.ElementClick, false);
	elt.setAttribute("data-VH20-hndk","");
};

VHTML.UnWrapElementCode = function(elt) {
	/* Remove from HTMLElement required events and attributes */
	elt.removeEventListener('keydown', this.ElementKeyDown, false);
	elt.removeEventListener('click', this.ElementClick, false);
	elt.removeAttribute("data-VH20-hndk","");
};

VHTML.Events = {};
VHTML.Events.ElementClick = function(evt) { };
VHTML.Events.ElementWrap = function(evt) { };

VHTML.WrapDocument = function() { 
	/* look for and attach unhandled elements ...apply on all elements not already handled and elements not set as not editable */
	/* ! this function can be called on a document on which .Clear() has been runned */
	var _elements = document.body.querySelectorAll("body *:not([data-VH20-hndk]):not([contentEditable='false'])");
	
	for (var i = 0 ; i < _elements.length ; i++) {
		if ( _elements[i].nodeType === 1 
					 && !_elements[i].hasAttribute("data-VH20-dsge")
					 && !_elements[i].hasAttribute("data-VH20-dsgk")
					 && !_elements[i].hasAttribute('data-VH20-hndk') ) { 
				
			VHTML.WrapElement(_elements[i]);
			
			/* This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work) */
			if ( (_elements[i].childNodes.length === 0) 
					|| (_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
					|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
				_elements[i].contentEditable = true;
				
			/* Send info to handler */ 
			VHTML.Events.ElementWrap(_elements[i]);
			}
	}
	/* the whole wrapping logic must be reviewed to allow to : (within document content, provide information to wrapper logic)*/
	/* 1. make an element part of the designer : at this time it is done setting it contentEditable=false, these elements disappear with .Clear()*/
	/* 2. make an element part of the content, but not editable ! these elements remain as content and aren't editable */
	/* often in the specification they say to use custom tag/expando to avoid collision, following this fact I should define custom tags */
	/* for each cases here above and use contentEditable only for its specification purpose */
}
		

/* Wrapping elements allow to get a handle on them interactivity with a click */
VHTML.WrapElement = function(elt) {
	
		VHTML.WrapElementCode(elt);
		
		/* This is already a designer option, a designer can choose to provide editing on text otherwise than this function */
		elt.contentEditable = true;
		
		VHTML.CurrentTarget = elt;
		VHTML.Events.ElementWrap(elt);  /* Inform using handler */
		VHTML.CurrentTarget.focus();
		
}



VHTML.WrapElementById = function(id) {
	
	var elt = document.getElementById(id);
	/*
	// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
	//elt.contentEditable = true;
	
	// id can be removed
	*/
	elt.removeAttribute('id');
	
	VHTML.WrapElementCode(elt);
	VHTML.CurrentTarget = elt;
	/*this is what is done, call removed : VHTML.Events.ElementWrap(elt);  --------- Inform using handler */
	VHTML.CurrentTarget.focus();
	/*
	// This function is used (and was created by a need of, rather, a designer code, so the editor provide
	// this service while a designer, starter or custom control canmanage this (wrap a new injected element) its own way...
	*/
				  
}


VHTML.InitializeUserAgent = function(url) {
	/*
	// jQuery remain the best solution to solve user-agent specific code but I'm trying to avoid using it at start
	// Custom Controls and starters can use it but at the editor level I wish to implement a kind of dynamic loading
	*/ 
	
	VHTML.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VHTML.document.body.designMode.InitialValue = document.designMode;

	document.body.removeAttribute("contentEditable");
	document.designMode = "off";
	/* by time to time (when cache is updated?) I get an error adding events on document : document undefined ? */

	// ensure script handle missing editor sources at document location
	// can happen if you code script reference to VHTML.js
 	document.head.querySelector('script[src*="vhtml.js"]').setAttribute("onerror","window.open('https://github.com/Visual-HTML/V-HTML/wiki/Get-Editor-Code');");
	
	/*
	/////////////////////////////////////// This introduce Platform-independent model where deigner code model things but no code is provided
	/// In designer code case there is a code provided : it's the last specification instructions but for cross-browser support they can be overriden
	// using expando, virtual functions, provided by javascript
	// define key/test on appName and userAgent to load appropriate code for the browser
	if (VH20.Browser.Class === "MSIE10") {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-MSIE10.js");
	} else 	
	if (((navigator.app................(navigator.userAgent.indexOf("OPR") > -1))) {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Opera.js");
	} else
	if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") > -1) && (navigator.userAgent.indexOf("OPR") == -1))   {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Netscape.js");
	}
	if ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Firefox") > -1) && (navigator.userAgent.indexOf("OPR") == -1)) {
	 VH20.IncludeDynamicScript("https://visual-html.github.io/V-HTML/VH20-Firefox.js");
	}
	*/ 
	///////////////// end useragent specific code
	this.DesignerUrl = url;
	
	/* in the scope of an event I ca't say this.InitializeDocument(); */
	VHTML.InitializeDocument();
	
}
VHTML.InitializeDocument = function() {	
	
	// check and remove all remainings from previous edit session
	// If user hasnt cleared the code I can retrieve 
	// a designer toolbar and all elements set with data-VH20-hndk
    	var _elements = document.querySelectorAll('body *[data-VH20-hndk]');
	for (var i = 0 ; i < _elements.length ; i++) {
		VHTML.UnWrapElement(_elements[i]);
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

	this.InitializeContent();
	
};
VHTML.LoadDesigner = function(url) {

	//this.RemoveDesigner(); // This only remove all previous designer codes
	
	// loading script on the end make all css and html available to the script 
	//this.LoadDesignerScript();  // algorithm must be changed to make them used in different order ?
	//this.LoadDesignerCSS();
	//this.LoadDesignerHTML();
	// different order, different file structure : split on several documents, one single file...

	this.DesignerUrl = url;

	//this.DesignerInitializeDocument();

};
VHTML.InitializeContent = function() {	

	/* Begin with a procces that wrap existing content */
	this.WrapDocument();
	
	if (document.body.querySelector("[contentEditable='true']") != null) {
		/* first child not for designer purpose get focused */
		VHTML.CurrentTarget = document.body.querySelector("[contentEditable='true']");
		// here if the document is empty..
		VHTML.CurrentTarget.focus();
		try { 
		/* some browser need to trigger a click after .focus() */
		VHTML.CurrentTarget.click(); }
		catch(xcp) { 
		/* while some other will not even provide the function ? it's maybe an element without click ? to check! */
		console.log("catch exception : .click() on " + VHTML.CurrentTarget.nodeName);  }
		finally { };
	} else {
		// empty document processing
		
		/////////////////////////////////// ? branch to designer
		//Notepad designer:
		//VHTML.DesignerUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170226.html";
		//editsDesigner designer:
		//VHTML.DesignerUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170307.html";
		
		VHTML.document.body.Blank = true;
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



VHTML.ElementKeyDown =  function(e) { 
         
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));	   
	VHTML.OnElementKeyDown(e);
	
}


VHTML.OnElementKeyDown =  function(e) {
	if (e.which === 13 && !e.shiftKey) {		
		// prevent default only in this case: return down, not even released 		
		e.preventDefault();		
		e.stopPropagation();		
		
		// Add content pressing enter 		
		var _elt = document.createElement("p");					
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);		
		// and wrap it 		
		VHTML.WrapElement(_res);		
	}
}



VHTML.ElementClick = function(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.stopPropagation();
	e.preventDefault();
	
	this.CurrentTarget = e.currentTarget;	
	VHTML.Events.ElementClick(e);  /* Inform designer that element was selected */

}



VHTML.DocumentClick = function(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	
}



VHTML.DocumentKeyDown = function(e) { 
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	VHTML.OnDocumentKeyDown(e);
}

VHTML.OnDocumentKeyDown = function(e) { 
/* This is designer code! : VH20 default hardcode notepad designer */
	
	if (e.which === 13) {
		// Enter on document add a new paragraph
		e.preventDefault();
		
		var _res = document.body.appendChild(document.createElement("p")); 
		//TODO: designer must be able to say what element is added : div, ul, ol? blockquote?...
		VHTML.WrapElement(_res);
	}
}

VHTML.DesignerInitializeDocument = function() {
	// This is a designer code: So editor must issue a call to a handler where designer 
  // can choose what to do initializing a document
  
  //if (document.body.childElementCount === 0) {
  if (VHTML.document.body.Blank) {  
    // ! if document hold only designer code it is to consider as empty... 
    // this test can be a service of the editor because it's his business
    var _res = document.body.appendChild(document.createElement("p"));
    this.WrapElement(_res);
  };
	
};

/* when page is loaded, start initialization process: set user-agent specific code */
window.addEventListener('load', VHTML.InitializeUserAgent, false);

