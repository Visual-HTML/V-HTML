* This is done on IE10:

This is done assuming that consumer will provide designer code within a page, 
and that all elments with designer purpose are set with contentEditable="true"

[20170215-index.html](20170215-index.html)

* any element get contentEditable:inherit if nothing is specified
* using contentEditable expose a design function : resize of the element, you get resizing function and edit by default

> to add my extension which is to replace a tag by another I must double-click to access "my code"....
this behavior can be appreciated: when you focused at designing sizes and content
this behavior can be disturbing: shen you focus to replace tags, you need to double-click first... ?

I think I need to unify both techniques (VH2017v1.js), the difference in clicks will soon get caught, 
this will introduce a "mode" in the editor where you can access resize functions, of course the designer
will also need to handle them but at this time I'm rather pleased to use it at the price to process after what
IE will have generated as code e.g.: style="width: 734px; height: 171px;"

---------------------------------------------------------

[20170215-indexv1.html](20170215-indexv1.html)

This one base it's logic on classes, so I don't put elments in this design state, my functions (replacenode) is accessible
clicking the element then the tag to use.---but I still don't have the resizing.


