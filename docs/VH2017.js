// when page is loaded, start initialization process: set user-agent specific code
window.addEventListener('load', InitializeUserAgent, false);

// isolate editors code within VH2017, which become is an Object in window
VH2017 = {};
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};
VH2017.CurrentTarget = null;
VH2017.DesignerUrl = "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170226.html";
VH2017._TmpElt = null;
VH2017.LoadDesignerScript = function() {
	// First version, its a script fragment, poc'n designer
	
	// Designer at this time is loaded at start but I must be able to switch between designer on the same authored document
	
	/*
	// This work on IE10 but completely make the process fail on Safari, Chrome.... I don't agree with their view on the
	// response time subject reducing the capacities and flexibilities of xmlhttprequest (the problem reside more where the requested resources are...)
	// ... but I need to make it work cross-browsers 
	var xReq = new XMLHttpRequest();
	xReq.open("GET", this.DesignerUrl, false); 
	xReq.timeout = 2000;
	xReq.ontimeout = function () {   } 
	xReq.onreadystatechange = function (e) {
		if (xReq.readyState == 4) {         
			if (xReq.status = "200") {
				var  _element = document.createElement("head");
				_element.innerHTML = xReq.response;
				VH2017._TmpElt = _element;
				var _scr = _element.getElementsByTagName("script")[0];
				var _elt2 = document.createElement("script");
				_elt2.innerHTML =  _scr.childNodes[0].textContent;
				 document.head.appendChild(_elt2);
			} else {
				
			}
		}
	}
	xReq.send(null);
	*/
	
	 var xReq = new XMLHttpRequest();
	 xReq.open("GET", this.DesignerUrl, false);
	 xReq.send(null);
	 var  _element = document.createElement("head");
	_element.innerHTML = xReq.response;
	VH2017._TmpElt = _element;
	var _scr = _element.getElementsByTagName("script")[0];
	var _elt2 = document.createElement("script");
	_elt2.innerHTML =  _scr.childNodes[0].textContent;
	 document.head.appendChild(_elt2);
	
	
};
VH2017.AddResource = function(url) {
	
	 var xReq = new XMLHttpRequest();
	 xReq.open("GET", url, false);
	 xReq.send(null);
	 var  _element = document.createElement("head");
	_element.innerHTML = xReq.response;
	var _scr = _element.getElementsByTagName("script")[0];
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH2017-Res", url);
	_elt2.innerHTML =  _scr.childNodes[0].textContent;
	 document.head.appendChild(_elt2);

};
VH2017.IncludeDynamicScript = function(url) {
	
	var _elt2 = document.createElement("script");
	_elt2.setAttribute("data-VH2017-Res", url);
	_elt2.src =  url;
	/*_elt2.type="application/javascript";
	_elt2.language="javascript";*/
	 document.head.appendChild(_elt2);
	 // Scripts can be added for different purpose, 
	 // VH2017.CurrentTarget.appendChild(_elt2);
	 //document.head.appendChild(_elt2);
	 // All these functions : AddResource, IncludeDynamicScript, RemoveResource, RemoveDynamicScript
	 
	 // will allow designer, starters and custom controls to load/unload code from page with single script reference (url)
	 // suppose to understand why : I have a designer for bootstrap and use it to get a page grid built on their code
	 // then I jump on the basic html text formatter to fill it's content
	 // then I go to the Painter designer) one I know that focus at painting literally : text color, background
	 // then save as...

	// if a code is to remain within document (custom controls behaviors) It's still not validated ; even not this reference and dynamic burden 
	// Remind: Focus at function level, use the usage scenario to identify resources
	// This will allow large amount of codes addressable on different usage scenario
	
	// IT'S not validated nor strong but for sure it is POC'ed, to note this difference in behavior when code is injected (AddResource)
	// or included using a script source (IncludeDynamicScript)
};
VH2017.RemoveResource = function(url) {
	
	var _elt2 = document.querySelector("script[data-VH2017-Res='"+url+"']");
	 document.head.removeChild(_elt2);

};
VH2017.RemoveDynamicScript = function(url) {

	var _elt2 = document.querySelector("script[src='"+url+"']");
	 document.head.removeChild(_elt2);
	 
};
VH2017.LoadDesignerCSS = function() {
	// First version, its a css fragment, poc'n designer
		
	// Styles also are designer dependent, what editor can do is to add the designer's styles just after the script node
	// Here a function such as VH2017.head.AddDesignerStyles(code)---why do I need to manage this, to clean the code, to provide basic enable/disable...
	// Add designer' styles
	var  _element = document.createElement("style");
	_element.title = "VH2017- Designer Styles";
	_element.id = "VH2017-Designer-Styles";
	_element.innerHTML += "*:not(hr)[data-VH2017-hndk] { min-height: 20px; border: 1px dotted gray; } ";	
	// Designer styles are added just after this script link
	var _aux = document.head.querySelectorAll('script');
	var _aux1 = document.head.querySelector('script[src="VH2017.js"]');
	 _aux1.parentNode.insertBefore(_element, _aux1.nextElementSibling);
	 
	 var _overridestyle = document.getElementById("VH2017-Designer-Styles");
	 if ( this._TmpElt.getElementsByTagName('style').length > 0)
	       _overridestyle.innerHTML = this._TmpElt.getElementsByTagName('style')[0].innerHTML;


};
VH2017.LoadDesignerHTML = function() {
	// First version, I had not html in my current code, poc'n designer

};
VH2017.Clear = function() {
	
	document.removeEventListener('keydown', DocumentKeyDown, false);	
	document.body.removeEventListener('click', DocumentClick, false);	
	
    	var _elements = document.querySelectorAll('body *[data-VH2017-hndk]');
	for (var i = 0 ; i < _elements.length ; i++) {
		this.UnWrapElement(_elements[i]);
		_elements[i].removeAttribute("contentEditable");
	}
	
	_elements = document.body.querySelectorAll("body *[contentEditable='false']");
	for (var i = 0 ; i < _elements.length ; i++) {
		try { _elements[i].xremove(true);  console.log("used:.remove(true)"); } 
		catch(xcp) { 
			
			try {
			_elements[i].removeNode(true); console.log("used:.removeNode(true)");  
			} catch(xcp) { 
			_elements[i].parentNode.removeChild(_elements[i]); console.log("used:.removeChild(elt)");
			}
			finally { console.log("cross-browser"); };			
		} 
		finally { console.log("cross-browser"); };
	}
	
	try { document.head.querySelector('#VH2017-Designer-Styles').xremove(true); console.log("used:.remove(true)"); } 
	catch(xcp) {		
		try {
		document.head.querySelector('#VH2017-Designer-Styles').removeNode(true); console.log("used:.removeNode(true)"); 
		} catch(xcp) { 
		document.head.removeChild(document.head.querySelector('#VH2017-Designer-Styles')); console.log("used:.removeChild(elt)"); }
		finally { console.log("cross-browser"); };		
	} 
	finally { console.log("cross-browser"); };
	
};
VH2017.WrapElement = function(elt) {
	// Initialize element with required events and attributes
	elt.addEventListener('keydown', ElementKeyDown, false);
	elt.addEventListener('click', ElementClick, false);
	elt.setAttribute("data-VH2017-hndk","");
}
VH2017.UnWrapElement = function(elt) {
	// Remove from HTMLElement required events and attributes
	elt.removeEventListener('keydown', ElementKeyDown, false);
	elt.removeEventListener('click', ElementClick, false);
	elt.removeAttribute("data-VH2017-hndk","");
}


VH2017.ElementClick = function(evt) { };
VH2017.ElementWrap = function(elt) { };



function InitializeUserAgent(e) {
	// jQuery remain the best solution to solve user-agent specific code but I'm trying to avoid using it at start
	// Custom Controls and starters can use it but at the editor level I wish to implement a kind of dynamic loading
	
	
	VH2017.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH2017.document.body.designMode.InitialValue = document.designMode;

	document.body.removeAttribute("contentEditable");
	document.designMode = "off";
	// by time to time (when cache is updated?) I get an error adding events on document : document undefined ?


	VH2017.LoadDesignerScript();
	
 
 	VH2017.LoadDesignerCSS();
	

	InitializeDocument();
	
}



function InitializeDocument() {
	
	document.addEventListener('keydown', DocumentKeyDown, false);	
	document.body.addEventListener('click', DocumentClick, false);	


	VH2017.DesignerInitializeDocument();
	
	/*
	VH2017.AddResource("https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170228_0.html");
	VH2017.RemoveResource("https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170228_0.html");
	
	alert("second:");
	
	VH2017.CurrentTarget = document.body.querySelector(":nth-child(3)");
	VH2017.IncludeDynamicScript("https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170228_0.js");	
		
*/
	alert("third:");
	
	VH2017.CurrentTarget = document.body.querySelector(":nth-child(3)");
	
		
	// ! including script using this code need attention on the stream of execution : you won't get code available 
	// in the "current stream/context", any instruction and function calls within script will run but accessing objects
	// Within the stream 'here in a window onload handler
	VH2017.IncludeDynamicScript("https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/todel/20170228_2.js");	
	fa();
	// So if loading script prior to make a function call : think the logic with the script calling it self
	// the function (if possible)
	
	
	
	InitializeContent();
	
	
}



function InitializeContent() {	

	// Begin with a procces that wrap existing content
	WrapElements();
	
    	// first child not for designer purpose get focused
	VH2017.CurrentTarget = document.body.querySelector("[contentEditable='true']");
	VH2017.CurrentTarget.focus();
	try { 
	// some browser need to trigger a click after .focus()
	VH2017.CurrentTarget.click(); }
	catch(xcp) { 
	// while some other will not even provide the function ? it's maybe an element without click ? to check!
	console.log("catch exception : .click() on "+VH2017.CurrentTarget.nodeName);  }
	finally { };
fa();
}



function ElementKeyDown(e) { 
         
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));

	// All the following seem to be designer code!

	if (e.which === 13 && e.shiftKey) {	
	// this allow to prevent defaults for what I override, and not for a backspace , delete...
	// This is a code related to shift+enter handling
	   	e.preventDefault();
		e.stopPropagation();
 
		
		// shift+enter must insert a br element at the current cursor position 
		// https://www.w3.org/TR/html/single-page.html#the-br-element
		var _elt = document.createElement("br"); 
		_elt.id = Date.now();

                if ( typeof(document.getSelection().focusNode.data) !== "undefined") {
			var _pos= e.currentTarget.innerHTML.indexOf(document.getSelection().focusNode.data);
			_pos = (_pos === -1 ? 0 : _pos);
			// using getSelection may need index re-compute: result in _pos
			// document.getSelection().focusOffset only give me the cursor position within a node
			
			e.currentTarget.innerHTML = 
				e.currentTarget.innerHTML.substring(0, _pos + document.getSelection().focusOffset)
				+ _elt.outerHTML
				+ e.currentTarget.innerHTML.substring(_pos + document.getSelection().focusOffset, e.currentTarget.innerHTML.length);
		} else {
			console.log("cross-browser code used");
			var _tmp = _elt.outerHTML.replace(">"," />")
			e.currentTarget.innerHTML += _tmp;			
		}
		
		WrapElementById(_elt.id); // This process with its id
		//e.currentTarget.focus();
		
	}
		
	if (e.which === 13 && !e.shiftKey) {
		// prevent default only in this case: return down, not even released
	   	e.preventDefault();
		e.stopPropagation();

		// Add content pressing enter
		var _elt = document.createElement("p");			
		var _res = e.currentTarget.parentNode.insertBefore(_elt, e.currentTarget.nextElementSibling);
		// and wrap it
		WrapElements(_res);
	}
	   
}



function ElementClick(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	e.stopPropagation();
	e.preventDefault();
	
	VH2017.CurrentTarget = e.currentTarget;	
	VH2017.ElementClick(e);  // Inform designer that element was selected

}



function DocumentClick(e) {
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	fa();
	
}



function DocumentKeyDown(e) { 
	
	console.log( e.type + " currentTarget:" + e.currentTarget.nodeName + " activeElement:" +
		(document.activeElement.nodeName ? document.activeElement.nodeName : null));
	
	// This is designer code!
	if (e.which === 13) {
		// Enter on document add a new paragraph
		e.preventDefault();
		
		var _res = document.body.appendChild(document.createElement("p")); //TODO: designer must be able to say what element is added : div ? ul, ol? blockquote?...
		WrapElements(_res);
	}
	
}


// Wrapping elements allow to get a handle on them interactivity with a click
function WrapElements(elt) {
	// This is called without parameter, elt argument is undefined : the process apply on...
	if (typeof(elt) === "undefined") {
			
		// look for and attach unhandled elements ...apply on all elements not already handled and elements not set as not editable
		var _elements = document.body.querySelectorAll("body *:not([data-VH2017-hndk]):not([contentEditable='false'])");
		
		for (var i = 0 ; i < _elements.length ; i++) {
			if ( _elements[i].nodeType === 1 
						 && !_elements[i].hasAttribute("data-VH2017-dsgk")
						 && !_elements[i].hasAttribute('data-VH2017-hndk') ) { 
					
				VH2017.WrapElement(_elements[i]);
				
				// This try to set contentEditable only on elements that user see as to edit (//TODO: in dev, need re-work)
				if ((_elements[i].childNodes.length === 1 && _elements[i].childNodes[0].nodeName === "#text")
						|| (_elements[i].childNodes.length > 1 && _elements[i].childNodes[0].textContent != "\n  ") ) 
					_elements[i].contentEditable = true;
					
				// Send info to handler	
				VH2017.ElementWrap(_elements[i]);
				}
		}
	
	} else {
		
		VH2017.WrapElement(elt);
		
		// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
		elt.contentEditable = true;
		
		VH2017.CurrentTarget = elt;
		VH2017.ElementWrap(elt);  // Inform using handler
		VH2017.CurrentTarget.focus();
		
	}
	
}



function WrapElementById(id) {
	// This is the wrapper code for a temporarily identified element, 
	// created by code generator these elements get an id only
	// to enable this code to do a getElementById...
	var elt = document.getElementById(id);
	
	// This is already a designer option, a designer can choose to provide editing on text otherwise than this function 
	//elt.contentEditable = true;
	
	// id can be removed
	elt.removeAttribute('id');
	
	VH2017.WrapElement(elt);
	VH2017.CurrentTarget = elt;
	//this is what is done, call removed : VH2017.ElementWrap(elt);  // Inform using handler
	VH2017.CurrentTarget.focus();
	
	// This function is used (and was created by a need of, rather, a designer code, so the editor provide
	// this service while a designer, starter or custom control canmanage this (wrap a new injected element) its own way...
				  
}


