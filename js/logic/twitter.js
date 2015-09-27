var core = new Core('twit');
var share = new Share(core);
var qd = new QuoteDrawer(core);
var ui = new UI(share,core);

$(document).ready(function(){
  ui.displayHolder('twit');
  ui.disableButtons();
});

$('#rndbtn').bind('click',function(){
  var statusNum = core.rand(core.noOfStatuses);
  var status = core.statusList[statusNum].text;
  var date = core.statusList[statusNum].date.split(" ")[5];
  core.makeQuote(status,date);
});

$('#handler_add').bind('click',function(){
  fetchTweets();
})

function fetchTweets(){
  var self = this;
  var handler = $("#handler_enter").val();
  handler = parseHandler(handler);
  if(handler!=""){
    addSpinner();
    Parse.Cloud.run('twitterFeed', {sn:handler}, {
      success: function(result) {
        console.log(result);
        self.core.lastName = result.screen_name;
        self.core.statusList = result.tweets;
        self.core.noOfStatuses = result.tweets.length;
        addTick("twitAdded");
      },
      error: function(error) {
        addCross("twitAdded");
        console.log(error);
      }
    });
  }
}

function parseHandler(handler){
  var parts = handler.split('@');
  if(parts.length>1){
    return parts[1];
  }
  else{
    return handler;
  }
}


function addTick(id){
  $("#"+id).removeClass();
  $("#"+id).addClass("glyphpad green glyphicon glyphicon-ok-circle tick");
  var displayText = "Press random tweet to begin!"
  $('#colourSpinText').text(displayText);
  $('#spinText').text(displayText);
  ui.disableRnd(false);
}

function addCross(id){
  $("#"+id).removeClass();
  $("#"+id).addClass("glyphpad red glyphicon glyphicon-remove-circle cross");
}

function addSpinner(){
  $("#twitAdded").removeClass();
  $("#twitAdded").addClass("three-quarters-loader");
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62283156-1', 'auto');
ga('send', 'pageview');