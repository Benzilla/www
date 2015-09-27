var core = new Core('index');
var share = new Share(core);
var qd = new QuoteDrawer(core);
var ui = new UI(share,core);

ui.displayHolder('rnd');
ui.disableButtons();

console.log('hi')

$('#rndbtn').bind('click',function(){
  // var statusNum = core.rand(core.noOfStatuses);
  // var status = core.statusList.data[statusNum].message;
  // var date = core.statusList.data[statusNum].updated_time.split("-")[0];
  // core.makeQuote(status,date);
  console.log('hi');
});

$(".box .close").click(function(){
  document.location.href = "makeown.html";  
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62283156-1', 'auto');
ga('send', 'pageview');