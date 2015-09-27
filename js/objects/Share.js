angular.module('Share',['Data'])

.factory('Share',function(Data,$state,$cordovaInstagram,$cordovaSocialSharing){

 	var Share = {};

 	Share.shareToInstagram = function(data,caption){
		Instagram.share(data, caption, function (err) {
		    if (err) {
		        console.log("not shared");
		    } else {
		        console.log("shared");
		    }
		});
 	}

 	Share.testShare = function(message,subject,file,link){
 		console.log(message);
	  	$cordovaSocialSharing
	    .share(message, subject, file, link) // Share via native share sheet
	    .then(function(result) {
	      // Success!
	    }, function(err) {
	      // An error occured. Show a message to the user
	    });		
 	}


 	return Share;

});