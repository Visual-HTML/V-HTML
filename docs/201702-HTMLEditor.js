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

var _editingText = false;

function ClickedEvent(e){
  window.event.cancelBubble = true;
  if (e.currentTarget.nodeName == "#document" || e.currentTarget.nodeName == "BODY") {
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
 
    var element = e.currentTarget.appendChild(document.createElement("textarea"));
    element.id = Date.now();
    element.title = e.currentTarget.id;
    element.innerHTML = e.currentTarget.innerText;
    element.style.border = "1px dotted white";
    element.addEventListener("click", function(){}, true);

    _editingText = true;

    var button = e.currentTarget.appendChild(document.createElement("input"));
    button.id = Date.now();
    button.title = element.id;
    button.type = "button";
    button.value = "Save";
    //button.style.position = "fixed"; button.style.top = "0px";  button.style.width = "200px";
    //button.style.marginLeft = "auto";
    //button.style.marginRight = "auto";
    button.addEventListener("click", function(event){
                window.event.cancelBubble = true;
                var _id = document.getElementById(event.currentTarget.title).parentNode.id;
                var _aux = document.getElementById(event.currentTarget.title);
                document.getElementById(event.currentTarget.title).removeNode(true);
                document.getElementById(_id).innerHTML = _aux.value;
                event.currentTarget.removeNode(true);
		_editingText = false;
   }, true);
}














