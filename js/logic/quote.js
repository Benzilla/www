
Parse.initialize("KGmIXPKN64ThzBNTwqFb0AWuq0742DKNAWBm6nWE", "AK2E4bbNkMLD1gmpK5R7WyJXKGQpxT1BobBXhPXw");


/*################################################################################*/


$(document).ready(function(){
	getQuote();
});

$('#quote-page-begin').bind('click',function(){
  window.location = '/'
});

function displayHolder(){
  var displayText = 'Loading';
  $('#spinText').text(displayText);
  $('#imgcnv').hide();
  $('#spinContainer').show();
}

function showHolder(){
  $('#imgcnv').show();
  $('#spinContainer').hide();
}

function getQuote(){
  displayHolder();
  var query = window.location.href;
  console.log(query);
  var imgId = query.split('=')[1];
  Parse.Cloud.run('getQuotes', {id:imgId}, {
    success: function(result) {
      console.log(result);
      var base64Data = result;
      setImage(base64Data);
      showHolder();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function setImage(base64Data){
    var ratio = window.devicePixelRatio || 1;
    var w = screen.width * ratio;
    cnv_width = 640;
    cnv_height = 400;
    var canvas = document.getElementById('imgcnv');
    canvas.setAttribute('width', '640');
    canvas.setAttribute('height', '400');    
    if(w<=680){
      canvas.setAttribute('width', '480');
      canvas.setAttribute('height', '300');
      cnv_width = 480;
      cnv_height = 300;
    }
    if(w<=500){
      canvas.setAttribute('width', '320');
      canvas.setAttribute('height', '200');
      cnv_width = 320;
      cnv_height = 200;
    }       
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    console.log("Setting images");

    imageObj.crossOrigin = "anonymous";
    imageObj.onload = function() {
      context.drawImage(imageObj, 0, 0, cnv_width, cnv_height);
    };
    imageObj.src = base64Data;
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62283156-1', 'auto');
ga('send', 'pageview');