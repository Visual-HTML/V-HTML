// JavaScript Document

function fa() { alert("fa called !"); };

fa();

// this code logic allow to load and immediately call a function/a processing/...

// there is also the semf-executing function code pattern where the function auto-call itself.. these codes will need
// to be in mind to solve needs according to the context
// sure, all these codes will be loaded directly (code execute after load) or indirectly (a code will manage to make the code loaded)
// indirectly is prefered : it allow to have the written code form with no call and the the "interface" generate the code
// to make the function called or self-called

// rem self-called function : (function(){ ... })();
//
