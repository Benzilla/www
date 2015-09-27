angular.module('Login',['Data'])

.factory('Login',function(Data,$state,$cordovaFacebook){

 	var Login = {};

	Parse.initialize("KGmIXPKN64ThzBNTwqFb0AWuq0742DKNAWBm6nWE", "AK2E4bbNkMLD1gmpK5R7WyJXKGQpxT1BobBXhPXw");

	//Load the SDK asynchronously
	//if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
			Parse.FacebookUtils.init({
			appId      : '1405020043126294',
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.1' // use version 2.1
			});

			var currentUser = Parse.User.current();
			if(currentUser){
				console.log('current user');
				Login.getData();
			}
		};
	//}

	Login.getData = function(){
		console.log('getting data from local storage');
		var currentUser = Parse.User.current();
		Login.getUserFromLocalStorage(currentUser);
		$state.go('tab.status');
	}

	Login.fetchStatuses = function(callback) {
		FB.api('me/statuses?fields=message&limit=1000', function(status_response) {
		Data.statusList = status_response;
	  	Data.noOfStatuses = Object.keys(Data.statusList.data).length;

		  FB.api('me/', function(name_response) {

		    Data.lastName = name_response.last_name;
		    Data.firstName = name_response.first_name;

		      FB.api('me/picture?width=200', function(pic_response){
		        Data.picUrl = pic_response.data.url;
		        callback();
		      });

		  });
		});

	}

	Login.createUserCloud = function(userID){
		console.log("creating cloud user!");
		Parse.Cloud.run('createUser', {uid:userID, ln:Data.lastName, fn:Data.firstName, pu:Data.picUrl, sl:Data.statusList, fb:true, twit:false}, {
		success: function(result) {
		  console.log(result);
		},
		error: function(error) {
		  console.log(error);
		}
		});
	}

	Login.getUserFromCloud = function(userID){
	  console.log("getting user from cloud");
	  Parse.Cloud.run('getUser', {uid:userID},{
	    success: function(result) {
	      Login.setValues(result);
	    },
	    error: function(error) {
	      console.log(error);
	    }
	  });		
	}

	Login.getUserFromLocalStorage = function(currentUser){

		var sd = currentUser._serverData
		var firstName = sd.firstName;
		var lastName = sd.lastName;
		var statusList = sd.statusList;
		var picUrl = sd.picUrl;

		Login.setValues([firstName,lastName,statusList,picUrl]);
	}

	Login.setValues = function(result){
	  console.log(result);
	  Data.firstName = result[0];
	  Data.lastName = result[1];
	  Data.statusList = result[2];
	  Data.picUrl = result[3];
	  Data.noOfStatuses = Object.keys(Data.statusList.data).length;
	}

	Login.checkLoginState = function() {
		var currentUser = Parse.User.current();
		if(currentUser){
			console.log('current user');
			Login.getData();
		}
		else{
			//browser login
			if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
				console.log('browser login!');
				Parse.FacebookUtils.logIn("public_profile,email,user_status", {
					success: function(user) {
					  if (!user.existed()) {
					      console.log("User signed up and logged in through Facebook!");
					      Login.fetchStatuses(function(){
					      Login.createUserCloud(user.id);
					      $state.go('tab.status');
					    });
					  } else {
					    console.log("User logged in through Facebook!");
					    Login.getUserFromCloud(user.id);
					    $state.go('tab.status');
					  }
					},
					error: function(user, error) {
					  console.log("User cancelled the Facebook login or did not fully authorize.");
					}
				});
			}
			else{				 
			    $cordovaFacebook.login(["public_profile", "email","user_status"]).then(function(success){
				 	console.log('native login!');
					console.log(success);

					//Need to convert expiresIn format from FB to date
					var expiration_date = new Date();
					expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
					expiration_date = expiration_date.toISOString();

					var facebookAuthData = {
						"id": success.authResponse.userID,
						"access_token": success.authResponse.accessToken,
						"expiration_date": expiration_date
					};
				 
					Parse.FacebookUtils.logIn(facebookAuthData, {
						success: function(user) {
						  if (!user.existed()) {
						      console.log("User signed up and logged in through Facebook!");
						      Login.fetchStatuses(function(){
						      Login.createUserCloud(user.id);
						      $state.go('tab.status');
						    });
						  } else {
						    console.log("User logged in through Facebook!");
						    Login.getUserFromCloud(user.id);
						    $state.go('tab.status');
						  }
						},
						error: function(user, error) {
						  console.log("User cancelled the Facebook login or did not fully authorize.");
						}
					});

			    }, function(error){
			      console.log(error);
			    });
			 
			}
		}
	}

	Login.logoutParseAndFacebook = function(){
		Parse.User.logOut();
		if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
			FB.logout();
			console.log('logged out browser');
		}
		else{
			$cordovaFacebook.logout();
			console.log('logged out native');
		}
		$state.go('login');
	}

 	return Login;
 });