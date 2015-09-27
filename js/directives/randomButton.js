angular.module('randomButton', ['Data'])

.directive('randomButton', function(Data) {
	 return {
	    scope: '=',
	    restrict: 'A',
	    templateUrl: 'templates/components/randomButton.html',
	    link: function(scope, element, attrs, controller){

	    	element.find('#rndbtn').click(function(){
	    		scope._loading();
	    		console.log(Data.statusList);
	    		var name = Data.lastName;
	    		var status = Data.getRandomStatus();

	    		var quote = status.message;
	    		var date = status.updated_time.split("-")[0];
	    		Data.fetchImages(quote,function(images){
	    			scope.makeQuote(quote,name,date,images);
	    		});
	    	});

	    }
	}
});