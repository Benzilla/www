angular.module('tweetButton', ['Data'])

.directive('tweetButton', function(Data,$timeout, $ionicPopup) {
	 return {
	    scope: '=',
	    restrict: 'A',
	    templateUrl: 'templates/components/tweetButton.html',
	    link: function($scope, element, attrs, controller){

	    	var textBox = element.find('#handler_enter');
	    	$scope.disableTweet = true;

	    	element.find('#rndbtn').click(function(){
	    		$scope._loading();
	    		var name = Data.twitHandler;
	    		var tweet = Data.getRandomTweet();
	    		var quote = tweet.text;
	    		var date = tweet.date.split(" ")[5];
	    		Data.fetchImages(quote,function(images){
	    			$scope.makeQuote(quote,name,date,images);
	    		});
	    	});


	    	function fetchTweets(handler,callback){
	    		console.log('hey');
	    		Data.fetchTweets(handler,function(success){
	    			if(success){
	    				$timeout(function(){
	    					$scope.disableTweet = false;	
	    				});
	    				callback(true);
	    			}
	    			else{
	    				callback(false);
	    			}
	    		});
	    	}

	    	$scope.handlerPopup = function(){	
			  	$scope.data = {}
			  	$scope.data.handler = Data.twitHandler;
			  	var myPopup = $ionicPopup.show({
			    template: '<p id="errormessage">{{data.errormessage}}</p><input type="text" id="handler_enter" ng-model="data.handler" placeholder="@username">',
			    title: 'Enter twitter handler',
			    scope: $scope,
			    buttons: [
			      	{ text: 'Cancel' },
			      	{
				        text: '<b>Enter</b>',
				        type: 'button-positive',
				        onTap: function(e) {
				        	if (!$scope.data.handler) {
				            	e.preventDefault();
				          	}
				          	else {
				          		e.preventDefault();
				          		var handler = $scope.data.handler;
				          		fetchTweets(handler,function(valid){
				          			if(valid){
					          			myPopup.close();
					          			$scope._loading();
					          			$timeout(function(){
					          				$scope.loadMessage = 'Press Random Tweet to begin!';
					          			});
					          			return;
				          			}
				          			else{
				          				$timeout(function(){
				          					$scope.data.errormessage = 'Invalid handler';				          					
				          				});
				          			}
				          		});
				          	}
				        }
			      	}
			    ]
				});
	    	}

	    	//open popup when user first clicks on page
	    	$scope.handlerPopup();
	    }
	}
});