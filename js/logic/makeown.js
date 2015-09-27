var core = new Core('make');
var share = new Share(core);
var qd = new QuoteDrawer(core);
var ui = new UI(share,core);

$(document).ready(function(){
	ui.displayHolder('make');
	ui.disableButtons();
});


$('#rndbtn').bind('click',function(){
	var status = $('#ownQuote').val();
	var name = $('#quoteName').val();
	if (status.replace(/(\ +)/g,'') != ""){
		core.setMakeOwnName(name);
		var today = new Date();
    	var date = today.getFullYear();
    	core.makeQuote(status,date);
    }
});