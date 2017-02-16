window.addEventListener('load', Document_Loaded, true);

var VS2017 = VS2017 || {};

function Document_Loaded(e) {

  _element = document.head.appendChild(document.createElement("style"));
  _element.title = "VH2017- Designer Styles";
  _element.style.border = "1px dotted yellow";
  _idx = document.styleSheets.length - 1;
  document.styleSheets[_idx].addRule(".DesignerLevel1", "border: 1px dotted gray");
  document.styleSheets[_idx].addRule("[contentEditable='true']", "background: lightblue;");
  document.styleSheets[_idx].addRule(".DesignerLevel1:hover", "border: 1px dashed gray;");
  document.styleSheets[_idx].addRule(".ClickLevel1", "background: lightgray; border: 1px solid black;");


  var elts_list1 = document.body.querySelectorAll("*");
  for( var i = 0; i < elts_list1.length ; i++) {
      if (elts_list1[i].contentEditable !== "false") { elts_list1[i].contentEditable = "true"; };
  }
  var elts_list = document.body.querySelectorAll("[contentEditable='true']");
  for( var i = 0; i < elts_list.length ; i++) {
      elts_list[i].addEventListener('click', Element_Clicked_Level1, false);
      elts_list[i].addEventListener('focus', Element_Focused_Level1, false);
      elts_list[i].classList.add("DesignerLevel1");
  }

  // this put the editor experience with a selection
  document.body.contentEditable = "true";
  // but with this line above you get div resize automaticaly 

  document.addEventListener("click", Document_clicked, false);
}

function Document_clicked(e){
    var elts_list = document.body.querySelectorAll("[contentEditable='true']");
    for( var i = 0; i < elts_list.length ; i++) {
      if (elts_list[i].classList.contains('ClickLevel1')) elts_list[i].classList.remove('ClickLevel1');
    }
}

function Element_Focused_Level1(e){
    var elts_list = document.body.querySelectorAll("[contentEditable='true']");
    for( var i = 0; i < elts_list.length ; i++) {
      if (elts_list[i].classList.contains('ClickLevel1')) elts_list[i].classList.remove('ClickLevel1');
    }
}


function Element_Clicked_Level1(e){

    window.event.cancelBubble = true;

    var elts_list = document.body.querySelectorAll("[contentEditable='true']");
    for( var i = 0; i < elts_list.length ; i++) {
      if (elts_list[i].classList.contains('ClickLevel1')) elts_list[i].classList.remove('ClickLevel1');
    }

    if (!e.currentTarget.classList.contains('ClickLevel1')) e.currentTarget.classList.add('ClickLevel1');

    VS2017.CurrentElement = e.currentTarget;

}



function ReplaceNode(elt, tagName){

  if (elt == null) return;

  _element = document.createElement(tagName);
  _element.innerHTML = elt.innerHTML;
  _element.contentEditable = "true";
  for(var i = 0 ; i < elt.classList.length ; i++) {
    _element.classList.add(elt.classList[i]);
  }
  _element.addEventListener('click', Element_Clicked_Level1, true);
  elt.replaceNode(_element);

}



