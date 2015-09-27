angular.module('imageCanvas', ['Data'])

.directive('imageCanvas', function(Data,$timeout) {
	 return {
	    scope: {
	      source: '=',
	      quote: '=',
	      name: '=',
	      date: '=',
	      imgdata: '='
	    },
	    restrict: 'A',
	    template: '<canvas class = "cnv quotes" width="400" height="400"></canvas>',
	    require: '^quoteContainer',
	    link: function (scope, element, attrs, controller) {

	    	var width;
	    	scope.canvas = element.find('canvas')[0];

		    scope.$watch('source', function (newSource) {
		        if (!newSource) return;
				setImage(newSource);
		    },true);

			var PIXEL_RATIO = (function () {
			    var ctx = scope.canvas.getContext("2d"),
			        dpr = window.devicePixelRatio || 1,
			        bsr = ctx.webkitBackingStorePixelRatio ||
			              ctx.mozBackingStorePixelRatio ||
			              ctx.msBackingStorePixelRatio ||
			              ctx.oBackingStorePixelRatio ||
			              ctx.backingStorePixelRatio || 1;

			    return dpr / bsr;
			})();	

			function createHiDPICanvas(w, h) {
			    var ratio = PIXEL_RATIO;
			    scope.canvas.width = w * ratio;
			    scope.canvas.height = h * ratio;
			    scope.canvas.style.width = w + "px";
			    scope.canvas.style.height = h + "px";
			    scope.canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
			}		

		    function resize(){
		    	var windowWidth = window.innerWidth;
		    	if (windowWidth<400){
		    		createHiDPICanvas(windowWidth,windowWidth);
		    		Data.quoteWidth = windowWidth;
		    	}
		    	else{
			    	createHiDPICanvas(400,400);
			    	Data.quoteWidth = 400;		    		
		    	}
		    }

			function setImage(source){
				resize();
			    var context = scope.canvas.getContext('2d');
			    var imageObj = new Image();
			    var pixa = new Image();
			    imageObj.crossOrigin = "anonymous";

			    imageObj.onload = function() {
					var height = imageObj.height;
					var offset = 0;

					if(height<400){
						height = 400;
					}

					context.drawImage(imageObj, -120, 0,imageObj.width,400);
					pixa.src = 'img/canvasstamp.png'
					pixa.onload = function(){
						context.drawImage(pixa,5,5,50,50);
						setImageData();
					}
					drawText();
					controller.finishedImg();
					console.log('done');
			    };
			    imageObj.src = source;
			}

		  function drawText(){
		  	var sf = Data.quoteWidth / 400;
		    var context = scope.canvas.getContext('2d');
		    var maxWidth = Data.quoteWidth - 100;
		    var lineHeight = 28*sf;
		    var fontsize = 17*sf;
		    var lineWidth = (6*sf).toString();
		    var x = Data.quoteWidth/2;
		    var y = Data.quoteWidth/2;
		    var text = '"'+scope.quote+'"';
		    var ndate = "- "+scope.name+" "+scope.date;


		    context = createImageContext(context,fontsize,lineWidth);

		    wrapText(context, text, x, y, maxWidth, lineHeight);

		    var metrics = context.measureText(ndate);
		    var width = metrics.width;
		    var xndate = (Data.quoteWidth/2)-(width/2);
		    var yndate = Data.quoteWidth-15;

		    context.strokeText(ndate, xndate, yndate);
		    context.fillText(ndate, xndate, yndate);
		  }

		  function wrapText(context, text, x, y, maxWidth, lineHeight) {
		    var words = text.split(' ');
		    var line = '';
		    y = calculateHeight(y,context,text,maxWidth,lineHeight);

		    for(var n = 0; n < words.length; n++) {
		      var testLine = line + words[n] + ' ';
		      var metrics = context.measureText(testLine);
		      var testWidth = metrics.width;
		      var xDrawpoint = x-testWidth/2
		      if (testWidth > maxWidth && n > 0) {    
		        context.strokeText(testLine, xDrawpoint, y);        
		        context.fillText(testLine, xDrawpoint, y);
		        line = ' ';
		        y += lineHeight;
		      }
		      else {
		        line = testLine;
		      }
		    }
		    context.strokeText(line, xDrawpoint, y);
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

		  function createImageContext(context,fontsize,lineWidth){
		    context.font = fontsize+'pt Oswald';
		    context.fillStyle = 'white';
		    context.strokeStyle = 'black';
		    context.lineJoin = 'round';
		    context.lineWidth=lineWidth; 
		    return context; 
		  }

		  function setImageData(){
		  	var data = scope.canvas.toDataURL();
		  	controller.setImageData(data);			  		
				
		  }		    
	    }
	 }
});