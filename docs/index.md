Welcome @
# [Visual HTML 2017](https://visual-html.github.io/V-HTML/) | [Repository](https://github.com/Visual-HTML/V-HTML)
-----------------------------------------------------------------------------------
20170615: Ways to load VH20 with/without designer code:

- default VH20 designer: 

[Blank page](VH2017.html)
             This use a basic document structure
             [Basic html code](VH2017-000.html)
             
[A4 page](VH2017-A4.html)
             This use a page with styling for an A4 page in portrait
             
[A4 page 1](VH2017-A4-1.html)
             The A4 page in portrait, with some content
             
             
- checking different codes for designer load at intial document:

 [Bootstrap Cover Sample 0](Bootstrap000.html) : default VH20 code run on the page
 
 [Bootstrap Cover Sample 1](Bootstrap001.html) : use the designer code dynamic loading of VH20 - designer code loaded within a predefined VH20 logic
 
 [Bootstrap Cover Sample 2](Bootstrap002.html) : designer code manage reference to VH20, overwrite VH20 at page parsing

** all these to test within the context of document edit/authoring life cycle

* acces/edit/save/re-open : take quick notes, typing or copy/pasting | + pass result to a checker tool.

-- and another case :  [Kitchen Sink/W3.CSS Demo Template](20170611/KSW3CSSDT.html)
 + this case introduce a different VH20 reference... relative to the document location - a sub-folder)
 + that kind of page can allow to build a set of controls get directly from its content
 + that kind of page can be edited with default designer or a custom designer


-----------------------------------------------------------------------------------
20170601: VH20/VHTML : new structure : [On A4, paragraph editor](A4-VHTML1.html)
Abandon: introduce too much complexity "for nothing"...
for nothing: create a kind of include logic/processing but the designer code is closer to the real needs
REM: this code is to be loaded temporarly - coming within the page as one block is enought...
-----------------------------------------------

 > First level

-----------------------------------------------

[Blank page](VH2017.html)
             This use a basic document structure
             [Basic html code](VH2017-000.html)
             
-----------------------------------------------

[A4 page](VH2017-A4.html)
             This use a page with styling for an A4 page in portrait
             
[A4 page 1](VH2017-A4-1.html)
             The A4 page in portrait, with some content

-----------------------------------------------

[Designer Content](VH2017-DC-000.html)
             Add designer content within a page
             [Variant 1](VH2017-DC-001.html)

-----------------------------------------------

> Editing - https://www.w3.org/TR/html51/single-page.html#user-interaction-editing - https://www.w3.org/TR/html5/single-page.html#editing-0
 
 
[designMode](designMode.html)
             This show how your browser behave in this mode.
             
   https://www.w3.org/TR/html5/single-page.html#making-entire-documents-editable:-the-designmode-idl-attribute
   https://www.w3.org/TR/html51/single-page.html#making-entire-documents-editable-the-designmode-idl-attribute


[contentEditable](contentEditable.html)
             This show how your browser behave with body set as contentEditable.
             
   https://www.w3.org/TR/html5/single-page.html#contenteditable
   https://www.w3.org/TR/html51/single-page.html#making-document-regions-editable-the-contenteditable-content-attribute

-----------------------------------------------

last code reference remain in master repo, this provide basic online testsing

-----------------------------------------------
Read me:

I'm rather in poc phase, looking to dress the base, this POC phase is itself at second pass, where I conluded that I couldn't rely on designMode and contentEditable on the body tag, that my editor code was already flooded by designer code, ...

-----------------------------------------------

[201702-HTMLEditor.html](201702-HTMLEditor.html) - [20170212-IE-designMode.html](20170212-IE-designMode.html) - [20170213-IE-contentEditable.html](20170213-IE-contentEditable.html) - [20170213-body-contentEditable.html](20170213-body-contentEditable.html) - [20170216.html](20170216.html) - [Bootstrap Cover Sample](Bootstrap000.html) - [Test000.html](Test000.html) - [VH2017-000.html](VH2017-000.html) - [VH2017-A4-1.html](VH2017-A4-1.html) - [VH2017-A4.html](VH2017-A4.html) - [VH2017-DC-000.html](VH2017-DC-000.html) - [VH2017-DC-001.html](VH2017-DC-001.html) - [contentEditable.html](contentEditable.html) - [designMode.html](designMode.html) - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() - []() 

-----------------------------------------------

#### [GitHub Pages](https://pages.github.com/) is designed to host your personal, organization, or project pages from a GitHub repository.

-----------------------------------------------

 > Second level

-----------------------------------------------
Search for a designer within a CodeSources: 
[VH20onDesignerA.html](VH20onDesignerA.html) - this is for a (designer) code source.

### NOTE: VH20 by default hardcode the NotePad designer - [VH2017.html](VH2017.html)

...to continue: realy load another designer logic..., code is once again confusing, all adds made for POC purpose now must be re-planned
...main logic is based in parser logic (initalize VH20, enrich by overwritting VH20 namespace members...
...in the general edit cycle of a document (access an edior web location, edits, save as/clear, get back editor....


-----------------------------------------------
[VH20onDesignerA.html](VH20onDesignerA.html) -


[BSV](BurstShootViewer.html)
[DADS](DADSample.html)
