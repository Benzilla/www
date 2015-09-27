angular.module('Data', [])

.factory('Data',function(){
	var Data = {}

	Data.firstName;
	Data.lastName;
	Data.statusList = [];
	Data.picUrl;
	Data.noOfStatuses;

	Data.twitHandler;
	Data.tweets = [];
	Data.noOfTweets;

	Data.quoteWidth;

    Data.getRandomText = function(){
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
    	var num = Data.rand(loadTextArr.length);
    	return loadTextArr[num];
    }

	Data.fetchImages = function(quote,callback){
		var self = this;
		Parse.Cloud.run('getImages', {s:quote}, {
		success: function(result) {
			if(!result){
				console.log('no results');
				result = self.getDefaultImages(3);
			}
			else{
				if (result.length<3){
					result = result.concat(Data.getDefaultImages(3-result.length));
				}
			}
			console.log(result);
			callback(result);
		},
		error: function(error) {
			console.log(error);
			alert("Oops! there was an error retrieving your quote, please try again.");
		}
		});
	}

	Data.getDefaultImages = function(n){
		var NUM_DEFAULTS = 19
		var img = [];
		var num = Data.rand(NUM_DEFAULTS);
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

	Data.fetchTweets = function(handler,callback){
		if(handler!=null){
			handler = parseHandler(handler);
			Parse.Cloud.run('twitterFeed', {sn:handler}, {
				success: function(result) {
					if(result.tweets.length == 0){
						console.log('no tweets');
						callback(false);
					}
					else{
						console.log(result);
						Data.twitHandler = result.screen_name;
						Data.tweets = result.tweets;
						Data.noOfTweets = result.tweets.length;
						callback(true);						
					}
				},
				error: function(error) {
					console.log('invalid username')
					callback(false);
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

    Data.getRandomStatus = function(){
    	var num = Data.rand(Data.noOfStatuses);
    	console.log(num+' '+Data.noOfStatuses);
    	return Data.statusList.data[num];
    }

    Data.getRandomTweet = function(){
    	var num = Data.rand(Data.noOfTweets);
    	return Data.tweets[num];
    }

	Data.rand = function(n){
		return Math.floor((Math.random() * n-1) + 1);
	}

	return Data;
});