angular.module('disableSpan', [])

.directive('disableSpan', function(Data,Share,$timeout) {
    restrict: 'A',
    scope{
    	dis: '='
    }
    link: function(scope,element,attrs){
    	$scope.$watch('dis',function(newDis){
    		if(!newDis){
    			
    		}

    	})
    }	
}