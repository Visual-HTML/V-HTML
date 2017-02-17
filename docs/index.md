-----------------------------------------------

[Latest](VH2017.html)

-----------------------------------------------

[VH2017](20170215-VH2017/) ... remain to clarify: what happen on Windows/Chrome starting on this code ? it just don't work ?!  
On Windows/Safari, you don't get resizing !... only a simple, sample code can get 2 different docs for each browser
in Ie:  ... Resize elements.  You can... ; in Safari: ... no resize title because it don't provide it...

The first thing to check is the w3c specification or other sites (dev.mozilla, w3schools.com) which do a browser comparison
and of course... What do you want ?

So GitHub can help, I can start on a code, fork or patch on a source to work on
a specific device(screen size/resolution),
a specific OS,
a specific browser (user-agent)

All this making editor developers speak of native codes, building codes, while having a base/common code "managing" them.
As I said: The same result page will have different codes, so each instruction making the code specific to xxx, will make the patch 
or fork to manage it.  There is the try catch technique where you nest instructions needed for a browser but its 2 instructions 
and 3 try to handle for... nothing in an execution context.
This multi-code approach remove specificity to developer's target, all instructions become useful and of course avoid creating
bottlenecks.  I thus, use the editor's code itself to validate those functionalities.

-----------------------------------------------

[4.5.23. The b element](https://www.w3.org/TR/html51/single-page.html#the-b-element)
where the b element is appropriate is in marking, Example 289

Semantic, defaults, ... b is formatting (bold), no semantic, it's important, it's the main data/information, it has to be bold!
Difficulties to choose between a b element, a strong element or span+custom style, ...

To follow a standard the code must be able to be maintained  and... quick, again to validate this we can begin on the 'hgroup element case', appeared in HTML5 it don't reappear in HTML51, this can become complex or simple according to the usage/structure rules.
So after having reach a standard compliant code generator, it must follow the standard evolution, with a current maybe not really testable version because browsers don't support this version (at this time if generated code seem following what the spec describe, it is OK), and a version said stable that generate compliant code. 

This formatting, well-known will validate the editing of a selection editor's function ...
In all notepad, text application this is done by applying it to current selection
Some make this formatting set until unset, this is valid for a lot of text formatting, when my cursor blink on a new blank page I can select Title or Quote style before typing... This to say that this behavior must be available in this editor.

Generating compliant code can be reached with a simple editor with a title, a paragraph, some bold and italics but the succes reside also in the ability to answer complex and advanced needs making the product helpful for the multitude.

-----------------------------------------------

> Editor Initialization

[Editor Initialization](20170214/)

-----------------------------------------------

[contentEditable](20170213-IE-contentEditable.html)

> using contentEditable attribute [5.6.1. Making document regions editable: The contenteditable content attribute](https://www.w3.org/TR/html51/editing.html#making-document-regions-editable-the-contenteditable-content-attribute)

[A4 sample page](20170213-body-contentEditable.html)	

-----------------------------------------------

#document.designMode
[IE10 designMode behavior](20170212-IE-designMode.html)

This provide basic editor function, a preview, it manage links (recognize them from plain text) and allow (if some security settings allow it) to add images... 19 lines (18 sloc)  595 Bytes, IE 10, no install, ...

save as copy: save as from file only save the starter document, at this time, the only way to get edited content is to save the document from Developer tools/HTML/save Html

-----------------------------------------------

An html editor... or begin with design mode: from HTML, see

* [5.6 Editing](http://www.w3.org/TR/html51/single-page.html#user-interaction-editing)
* [5.6.2. Making entire documents editable: The designMode IDL attribute](http://www.w3.org/TR/html51/single-page.html#making-entire-documents-editable-the-designmode-idl-attribute)

-----------------------------------------------

[Sample Code](Test000.html)

> A simple TOC / outline, the editor should be able to provide visual authoring of such structure
applying "styles" (a title, a sub-title...) will generate html structure using correspondant semantic.
Speaking of styles at this time, in this repo, mean semantic tag defined by [3.2.1. Semantics](https://www.w3.org/TR/html51/single-page.html#elements-semantics)
