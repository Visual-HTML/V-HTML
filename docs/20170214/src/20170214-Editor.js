window.addEventListener('load', Document_Loaded, true);

function Document_Loaded(e) {



/*
<style title="styles needed by 20170214-Editor.js">
  .DesignerLevel1 { border: 1px dotted gray; }
  .DesignerLevel1:hover { border: 1px dashed gray; }
  .ClickLevel1 { background: lightgray; border: 1px solid black; }
</style>
*/
document.styleSheets[0].addRule('.DesignerLevel1', 'border: 1px dotted gray');
document.styleSheets[0].addRule('.DesignerLevel1:hover', 'border: 1px dashed gray;');
document.styleSheets[0].addRule('.ClickLevel1', 'background: lightgray; border: 1px solid black;');



  var elts_list = document.body.querySelectorAll('*');
  for( var i = 0; i < elts_list.length ; i++) {
    elts_list[i].addEventListener('click', Element_Clicked_Level1, true);
    elts_list[i].classList.add("DesignerLevel1");
  }

}

function Element_Clicked_Level1(e){

  var elts_list = document.body.querySelectorAll('*');
  for( var i = 0; i < elts_list.length ; i++) {
    if (elts_list[i].classList.contains('ClickLevel1')) elts_list[i].classList.remove('ClickLevel1');
  }

   if (!e.currentTarget.classList.contains('ClickLevel1')) e.currentTarget.classList.add('ClickLevel1');

}
