angular.module('UI', ['Share'])

.factory('UI',function(Data,Share){
  var UI = {};

  UI.init = function(){
    $('#rndcnv').css('width',Data.screenSize);
    $('#rndcnv').css('height',Data.screenSize);

    $('#rndcolourcnv').css('width',Data.screenSize);
    $('#rndcolourcnv').css('height',Data.screenSize);

    $('#box1').css('width',Data.screenSize);     
  }

  UI.init();

  UI.displayHolder = function(page){
    var displayText;
    if(page == 'rnd'){
      displayText = "Press Random Status to begin!";
    }
    else if(page == 'twit'){
      displayText = 'Enter a twitter handler to begin!';
    }
    else{
      displayText = "Enter a message and press Make Own to begin!";
    }
    $('#spinText').text(displayText);
    $('#rndcnv').hide();
    $('#spinContainer').show();
    $('#colourSpinText').text(displayText);
    $('#rndcolourcnv').hide();
    $('#colourSpinContainer').show();
  }

  UI.disableRnd = function(tf){
    $('#rndbtn').prop('disabled', tf);
  }

  UI.disableShare = function(id){
    $('#'+id).unbind();
    $('#'+id).hover(function(){
      $(this).css('cursor','default');
    });
    $('#'+id).removeClass();
    $('#'+id).addClass('glyphicon glyphicon-share grey');
  }

  UI.enableShare = function(id,cnv){
    $('#'+id).bind('click',function(){
      Share.favoriteImage(cnv);
    });
    $('#'+id).hover(function(){
      $(this).css('cursor','pointer');
    });
    $('#'+id).removeClass();
    $('#'+id).addClass('glyphicon glyphicon-share black');
  }


  UI.enableButtons = function(){
    UI.enableShare('favoriteRnd','rndcnv');
    UI.enableShare('favoriteColour','rndcolourcnv');
    $('#cImgBtn').prop('disabled', false);
    $('#cColourBtn').prop('disabled', false);
  }

  UI.disableButtons = function(){
    UI.disableShare('favoriteRnd');
    UI.disableShare('favoriteColour');
    $('#cImgBtn').prop('disabled', true);
    $('#cColourBtn').prop('disabled', true);
    $("#linkbox-wrapper").css('display','none');
  }

  UI.showSpinAnimation = function(){
    var loadTextArr = [
      "Preparing the awesome",
      "Yeah, you really said that",
      "So cringe, yet so epic",
      "I can't believe you said that",
      "Lets take a trip down memory lane",
      "Here's another blast from the past",
      "I...I just don't know what to say",
      "It's...it's beautiful :')",
      "You were one cool teenager",
      "Lets do the time warp again",
      "Stand aside Seamus Heaney",
      "A true masterpiece",
      "You could inspire a nation with these words",
      "Something your gran can stick on her fridge",
      "Something to tell the grandkids",
      "Embrace yourself for what's to come...",
      "Nations will be founded on these words",
      Data.lastName+" - I give thee the gift of words",
      "Is this all you have to say for yourself "+Data.lastName+"?",
      "Hold on one second!",
      "Wut.",
      "I wonder what Grandma "+Data.lastName+" would have to say about this?",
      "Don't become an author",
      "Norway's inspirational new national slogan is...",
      "I think we should put this on your tombstone",
      "These would be good lyrics for Ke$ha's new single",
      "You're not a poet and I know it",
      "Back we go!"

    ];
    var num = Math.floor((Math.random() * loadTextArr.length-1) + 1);
    var loadText = loadTextArr[num];
    $('#spinText').text(loadText);
    $('#rndcnv').hide();
    $('#spinContainer').show();
    $('#colourSpinText').text(loadText);
    $('#rndcolourcnv').hide();
    $('#colourSpinContainer').show();
    UI.disableButtons();
  }

  UI.stopSpinAnimation = function(){
    $('#rndcnv').show();
    //$('#spinContainer').hide();
    $('#rndcolourcnv').show();
    $('#colourSpinContainer').hide();
    UI.enableButtons();
  }

  return UI;
});

