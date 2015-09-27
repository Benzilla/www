angular.module('makeButton', ['Data'])

.directive('makeButton', function(Data,$ionicPopup,$timeout) {
	 return {
	    scope: '=',
	    restrict: 'A',
	    templateUrl: 'templates/components/makeButton.html',
	    link: function($scope, element, attrs, controller){

	    	$scope._quote = '';
	    	$scope._name = '';
	    	$scope.disableMake = true;

	    	function isBlank(text){
	    		return (text.replace(/(\ +)/g,'') != "");    		
	    	}

	    	function makeQuote(){
	    		var quote = $scope._quote;
	    		var name = isNameBlank($scope._name);
	    		var today = new Date();
    			var date = today.getFullYear();

    			if (quote.replace(/(\ +)/g,'') != ""){
    				$scope._loading();
		    		Data.fetchImages(quote,function(images){
		    			$scope.makeQuote(quote,name,date,images);
		    		});
		    	}	    		
	    	}

	    	function isNameBlank(name){
				if( name.replace(/(\ +)/g,'') != "" ){
					return name;
				}
				else{
					return Data.lastName;				
				}
			}

			$scope.makePopup = function(){	
			  	$scope.data = {}
			  	$scope.data.quote = $scope._quote;
			  	$scope.data.name = $scope._name;
			  	var myPopup = $ionicPopup.show({
			    templateUrl: 'templates/components/makePopup.html',				    		   	
			    title: 'Enter a quote',
			    scope: $scope,
			    buttons: [
			      	{ text: 'Cancel' },
			      	{
				        text: '<b>Make</b>',
				        type: 'button-positive',
				        onTap: function(e) {
				        	if (!$scope.data.quote) {
				        		$scope.data.errormessage = 'Enter a quote!'
				            	e.preventDefault();
				          	}
				          	else {
				          		$scope._loading();
				          		$timeout(function(){
				          			$scope._quote = $scope.data.quote;
				          			$scope._name = $scope.data.name;
				          			makeQuote();				          			
				          		});
				          		myPopup.close();
				          		return;
				          	}
				        }
			      	}
			    ]
				});
	    	}

	    	$scope.makePopup();

	    }
	}
});