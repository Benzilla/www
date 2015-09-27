angular.module('loadingText', [])

.directive('loadingText', function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/components/loadingText.html',
    link: function(scope,element,attrs){
		resize();
		window.addEventListener('resize', resize, false);

	    function resize(){
	    	var width = window.innerWidth;
	    	if(width<=400){
	    		element.find('#spinContainer').css('width',width);
	    		element.find('#spinContainer').css('height',width+5);
	    	}
	    }
    }
  }
});