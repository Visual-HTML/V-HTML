<script>
// This is a designer code: So editor must issue a call to a handler where designer 
// can choose what to do initializing a document
if (document.body.childElementCount === 0) {
  // ! if document hold only designer code it is to consider as empty... 
  // this test can be a service of the editor because it's his business
  var _res = document.body.appendChild(document.createElement("p"));
  VH2017.WrapElement(_res);
}
</script>