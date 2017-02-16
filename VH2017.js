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