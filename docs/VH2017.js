window.addEventListener('load', InitializeUserAgent, true);
window.addEventListener('load', InitializeDocument, true);
window.addEventListener('load', InitializeContent, true);

VH2017 = {};
VH2017.document={};
VH2017.document.body={};
VH2017.document.body.contentEditable={};
VH2017.document.body.designMode={};

function InitializeUserAgent(evt) {
	
}

function InitializeDocument(evt) {
	VH2017.document.body.contentEditable.InitalValue = document.body.contentEditable;
	VH2017.document.body.designMode.InitialValue = document.designMode;
	
	/* if the page is set to design mode, VH don't go further */
	if (VH2017.document.body.designMode.InitialValue.toLowerCase === "Inherit") return;
	/* 
	this mode allow so much that we will use it to open a blank sheet, user will be able to work 
	in that mode and get the code injected to the VH page
	*/
	
	/* contentEditable processing : in investigation */
	
	var xReq = new XMLHttpRequest();
	xReq.open("GET", "https://raw.githubusercontent.com/Visual-HTML/V-HTML/master/Sources/testmain.html", true); 
	xReq.timeout = 2000;
	xReq.ontimeout = function () {   } 
	xReq.onreadystatechange = function (e) {
		if (xReq.readyState == 4) {         
			if (xReq.status = "200") { 
				document.body.innerHTML += xReq.response;
				} else {
				
				}
			}
		}
	xReq.send(null);
}

function InitializeContent(evt) {
    _elements = document.querySelectorAll('*');
	for (var i = 0 ; i < _elements.length ; i++) {
		_elements[i].addEventListener('click', ElementClicked, false);
	}
}

function ElementClicked(e) {
  e.stopPropagation();
  e.preventDefault();
  // a handle on current element is available in e.currentTarget
}
