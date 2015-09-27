angular.module('Qd',['UI'])

.factory('Qd',function(UI){

  var Qd = {};

  Qd.draw = function(url,quote,name,date,rndcnv,colorcnv){
    setImage(url,quote,name,date,rndcnv);
    drawColourCnv(colorcnv,quote,name,date);
  }

  Qd.drawImage = function(url,quote,name,date,rndcnv,colorcnv){
    setImage(url,quote,name,date,rndcnv);
  }

  Qd.drawColour = function(quote,name,date,colorcnv){
    drawColourCnv(colorcnv,quote,name,date);
  }

  function setImage(finalurl,statusquote,name,date,cnv){
      var ratio = window.devicePixelRatio || 1;
      var w = screen.width * ratio;
      cnv_width = 640;
      cnv_height = 400;
      var canvas = document.getElementById(cnv);
      canvas.setAttribute('width', '640');
      canvas.setAttribute('height', '400');
      if(finalurl==""){
      }
      else{      
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
        imageObj.crossOrigin = "anonymous";

        imageObj.onload = function() {
          context.drawImage(imageObj, 0, 0, cnv_width, cnv_height);
          drawText(statusquote,name,date,cnv);
          UI.disableRnd(false);
          UI.stopSpinAnimation();
        };
        imageObj.src = finalurl.base64Data;
      }
  }

  function drawText(statusquote,name,date,cnv){
    var ratio = window.devicePixelRatio || 1;
    var w = screen.width * ratio;
    var canvas = document.getElementById(cnv);
    var context = canvas.getContext('2d');
    var maxWidth = 400; //450
    var lineHeight = 30;
    var lineWidth = '7';
    var x = canvas.width/ 2;
    var y = canvas.height/2;
    var text = '"'+statusquote+'"';
    var ndate = "- "+name+" "+date;
    var fontsize = 20;

    if(w<=680){
      cnv_width =480;
      cnv_height = 300;
      fontsize = 15;
      maxWidth = 300; //338
      lineHeight = 22.5;
      lineWidth = '5.25';
    }

    if(w<=500){
      cnv_width =320;
      cnv_height = 200;
      fontsize = 10;
      maxWidth = 200; //225
      lineHeight = 15;
      lineWidth = '3.5';
    }

    switch (cnv){
      case "rndcnv":
        context = createImageContext(context,fontsize,lineWidth);
        break;
      case "rndinspacnv":
        context = createImageContext(context,fontsize,lineWidth);
        break;
      case "rndcolourcnv":
        context = createColourContext(context,fontsize,lineWidth);
        break;            
    }

    wrapText(context, text, x, y, maxWidth, lineHeight,cnv);

    var metrics = context.measureText(ndate);
    var width = metrics.width;
    var xndate = (canvas.width/2)-(width/2);
    var yndate = canvas.height-15;

    if(cnv == "rndcnv"){
       context.strokeText(ndate, xndate, yndate);
    }
    context.fillText(ndate, xndate, yndate);
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight,cnv) {
    var words = text.split(' ');
    var line = '';
    y = calculateHeight(y,context,text,maxWidth,lineHeight);

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      var xDrawpoint = x-testWidth/2
      if (testWidth > maxWidth && n > 0) {
        if(cnv == "rndcnv"){      
          context.strokeText(testLine, xDrawpoint, y);        
        }
        context.fillText(testLine, xDrawpoint, y);
        line = ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    if(cnv == "rndcnv"){
      context.strokeText(line, xDrawpoint, y);
    }
    context.fillText(line, xDrawpoint, y);
  }

  function calculateHeight(y, context, text, maxWidth, lineHeight){
    var testWidth = context.measureText(text).width;
    var lineNumGuess = Math.floor(testWidth / maxWidth);
    var addedHeight = lineNumGuess * (lineHeight/2);
    if(addedHeight>15){
      addedHeight -= 15;
    }
    return y-addedHeight;
  }

  function createColourContext(context,fontsize,lineWidth){
    context.font = fontsize+'pt Oswald';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineJoin = 'round';
    context.lineWidth=lineWidth; 
    return context; 
  }
  function createImageContext(context,fontsize,lineWidth){
    context.font = fontsize+'pt Oswald';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineJoin = 'round';
    context.lineWidth=lineWidth; 
    return context; 
  }

  function drawColourCnv(cnv,status,name,date){
      var ratio = window.devicePixelRatio || 1;
      var w = screen.width * ratio;
      cnv_width = 640;
      cnv_height = 400;
      var canvas = document.getElementById(cnv);
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
      var ctx = canvas.getContext('2d');
      ctx.fillStyle=rndColour();
      ctx.fillRect(0, 0, cnv_width, cnv_height);
      drawText(status,name,date,cnv);
      UI.disableRnd(false);
  }


  function rndColour(){
    var colours = [
      '#EB3333', 
      '#833083',
      '#4343BF',
      '#199619',
      '#E66916',
      '#194719',
      '#993333',
      '#754719',
      '#FFCC00',
      '#FFD633',
      '#FF99FF',
      '#669999',
      '#CC3300',
      '#990000',
      '#05051A'
    ]
    var num = Math.floor((Math.random() * (colours.length)-1) + 1);
    var colour = colours[num];
    return colour;
  }

  return Qd;

});
