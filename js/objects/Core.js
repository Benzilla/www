angular.module('Core', ['Data','Qd','UI','Share'])



.factory('Core', function(Data,Qd,UI,Share) {

	var Core = {};

	Core.setupListeners = function(){
		$('#cImgBtn').bind('click',function(){
			Core.changeImage();
		});

		$('#cColourBtn').bind('click',function(){
			Core.changeColour();
		});
	}

	Core.setupListeners();

	Core.makeQuote = function(status,date){
		var self = this;

		Data.status = status;
		Data.date = date;

		Parse.Cloud.run('getImages', {s:Data.status}, {
		success: function(result) {
			if(!result){
				Core.noResultHandler();
			}
			else{
				if (result.length<3){
					result = result.concat(Core.getDefaultImages(3-result.length));
				}
				console.log(result);
				Data.globalimages=result;
				var randImg = Core.rand(Data.globalimages.length);
				Data.imgCount=randImg
				Qd.draw(Data.globalimages[randImg],Data.status,Data.lastName,Data.date,"rndcnv","rndcolourcnv");
			}
		},
		error: function(error) {
			console.log(error);
			UI.stopSpinAnimation();
			UI.disableRnd(false);
			alert("Oops! there was an error- blame Ben");
		}
		});
	}

	Core.noResultHandler = function(){
		Data.globalimages = Core.getDefaultImages(3);
		var randImg = Core.rand(Data.globalimages.length);
		Data.imgCount = randImg;
		Qd.draw(Data.globalimages[randImg],Data.status,Data.lastName,Data.date,"rndcnv","rndcolourcnv");
	}

	Core.getDefaultImages = function(n){
		var NUM_DEFAULTS = 19
		var img = [];
		var num = Core.rand(NUM_DEFAULTS);
		for (var i = 0; i<n; i++){
			num = num+1;
			if (num>NUM_DEFAULTS){
			  	num = 0;
			}
			var url = 'img/default/'+num+'.jpg';
			var obj={keyWord:num, base64Data:url, views:0};
			img[i] = obj;
		}
		return img;
	}

	Core.changeImage = function(){
	  Data.imgCount++;
	  if(Data.imgCount>=Data.globalimages.length){
	    Data.imgCount = 0;
	  }
	  UI.showSpinAnimation();
	  Share.favorite = false;
	  UI.disableRnd(true);
	  Qd.drawImage(Data.globalimages[Data.imgCount],Data.status,Data.lastName,Data.date,"rndcnv","rndcolourcnv");
	}

	Core.changeColour = function(){
	  UI.showSpinAnimation();
	  Share.colourfavorite = false;
	  UI.disableRnd(true);
	  Qd.drawColour(Data.status,Data.lastName,Data.date,"rndcolourcnv");
	  UI.stopSpinAnimation();
	}

	Core.setMakeOwnName = function(name){
		if(name.replace(/(\ +)/g,'') != ""){
			Data.lastName = name;
		}
		else if(!core.fbLoggedIn){
			Data.lastName = "";
		}
	}

	Core.rand = function(n){
		return Math.floor((Math.random() * n-1) + 1);
	}

	return Core;
})