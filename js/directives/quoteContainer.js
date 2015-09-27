angular.module('quoteContainer', [])

.directive('quoteContainer', function(Data,Share,$timeout) {
	
	function quoteController($scope){

		$scope.images;
		$scope.imageNum;

		$scope.quote;
		$scope.name;
		$scope.date;

		$scope.imgdata;

		var self = this;

		var ad_count = 1;

		var admobid = {};
	    if( /(android)/i.test(navigator.userAgent) ) { // for android
	        admobid = {
	            banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
	            interstitial: 'ca-app-pub-2577882863155855/3055079126'
	        };
	    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
	        admobid = {
	            banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
	            interstitial: 'ca-app-pub-xxx/kkk'
	        };
	    } else { // for windows phone
	        admobid = {
	            banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
	            interstitial: 'ca-app-pub-xxx/kkk'
	        };
	    }

	    //if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
		//apply required because of async fetching images
		$scope.makeQuote = function(quote,name,date,images){
			ad_count ++;
			// if(AdMob && (ad_count % 5 == 0) ){
			// 	AdMob.showInterstitial();
			// }
			$scope.quote = quote;
			$scope.name = name;
			$scope.date = date;
			$scope.images = images;
			$timeout(function(){
				$scope.imageSource = $scope.getRandomImage();
				$scope.colour = $scope.rndColour();			
			});				
		};

		$scope.getRandomImage = function(){
			$scope.imageNum = Data.rand($scope.images.length);
			return $scope.images[$scope.imageNum].base64Data;
		};

		$scope.changeImage = function(){
			$scope.loadImg();
	    	$scope.imageNum++;
	    	if($scope.imageNum >= $scope.images.length){
	    		$scope.imageNum = 0;
	    	}
	    	$timeout(function(){
	 			$scope.imageSource = $scope.images[$scope.imageNum].base64Data;
			});
		};

		$scope.changeColour = function(){
	    	$timeout(function(){
	 			$scope.colour = $scope.rndColour();
			});
		};

		$scope._loading = function(){
			$timeout(function(){
				$scope.loadMessage = Data.getRandomText();
				$scope.imgLoading = true;
				$scope.colLoading = true;					
			});			
		};

		$scope.loadImg = function(){
			$timeout(function(){
				$scope.loadMessage = Data.getRandomText();
				$scope.imgLoading = true;				
			});	
		}

		//apply required due to async image loading
		this.finishedImg = function(){
			$timeout(function(){
				$scope.imgLoading = false;				
			});
		};

		this.finishedCol = function(){
			$timeout(function(){
				$scope.colLoading = false;				
			});
		};

		$scope.rndColour = function(){
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
		    var num = Data.rand(colours.length);
		    var colour = colours[num];
		    return colour;
		}

		this.setImageData = function(data){
			$timeout(function(){
				$scope.imgdata = data;				
			});
		}

		$scope.shareImg = function(){
			if(!$scope.imgLoading){
				console.log('sharing');
				Share.testShare('Check out my Pixaquote!',null,$scope.imgdata,null);
			}
		}

		$scope.shareColour = function(){
			if(!$scope.colLoading){
				console.log('sharing');
				//Share.testShare('Check out my Pixaquote!',null,$scope.imgdata,null);
			}
		}

		$scope.testShare = function(){

		}
	
	}

	return {
	    scope: '=',
	    restrict: 'A',
	    templateUrl: 'templates/components/quoteContainer.html',
	    controller: ['$scope', quoteController],
	    link: function(scope,element,attrs){
			scope.imgLoading = true;
			scope.colLoading = true;
	    }
	}
});