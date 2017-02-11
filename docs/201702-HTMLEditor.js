(function(){
  document.addEventListener("click", ClickedEvent, false);
  window.addEventListener("load", DocumentLoaded, true);  
})();

function DocumentLoaded(e){
  document.body.style.border = "1px dotted gray";
  document.body.style.height = "100%";
  document.body.style.backgroundColor = "blue";
  document.body.title = "body";
}

_editingText = false;

function ClickedEvent(e){
  window.event.cancelBubble = true;
  if (e.currentTarget.nodeName === "#document" || e.currentTarget.nodeName === "BODY") {
    var element = document.body.appendChild(document.createElement("div"));
    element.id = Date.now();
    element.innerHTML = "&nbsp;";
    element.style.border = "1px dotted yellow";
    element.addEventListener("click", ElementClickedEvent, false);
  }
}


function ElementClickedEvent(e){
    window.event.cancelBubble = true;
    if (_editingText) return;
 
	_aux = e.currentTarget.innerHTML;
	e.currentTarget.innerHTML = "&nbsp";
    _element = e.currentTarget.appendChild(document.createElement("textarea"));
    _element.id = Date.now();
    _element.title = e.currentTarget.id;
    _element.innerHTML = (_aux === "&nbsp;"? "" : _aux);
    _element.style.border = "1px dotted white";
    _element.addEventListener("click", function(){}, true);

    _editingText = true;

    _button = e.currentTarget.appendChild(document.createElement("input"));
    _button.id = Date.now();
    _button.title = _element.id;
    _button.type = "button";
    _button.value = "Save";
    //button.style.position = "fixed"; button.style.top = "0px";  button.style.width = "200px";
    //button.style.marginLeft = "auto";
    //button.style.marginRight = "auto";
    _button.addEventListener("click", function(event){
                window.event.cancelBubble = true;
                _id = document.getElementById(event.currentTarget.title).parentNode.id;
                _aux = document.getElementById(event.currentTarget.title);
                document.getElementById(event.currentTarget.title).removeNode(true);
                document.getElementById(_id).innerHTML = (_aux.value === "" ? "&nbsp;" : _aux.value);
                event.currentTarget.removeNode(true);
		_editingText = false;
   }, true);
	
    _checkbox1 = e.currentTarget.appendChild(document.createElement("input"));
    _checkbox1.id = Date.now();
    _checkbox1.title = _element.id;
    _checkbox1.type = "checkbox";
    _checkbox1.value = "inline-block";	
	   _checkbox1.addEventListener("click", function(event){
                window.event.cancelBubble = true;
                _id = document.getElementById(event.currentTarget.title).parentNode.id;
                _aux = document.getElementById(event.currentTarget.title);
                document.getElementById(_id).style.display = (_checkbox1.checked ? "inline-block" : "block");
   }, true);
}














