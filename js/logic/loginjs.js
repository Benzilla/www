var firstName;
var lastName;
var statusList;
var picUrl;

Parse.initialize("KGmIXPKN64ThzBNTwqFb0AWuq0742DKNAWBm6nWE", "AK2E4bbNkMLD1gmpK5R7WyJXKGQpxT1BobBXhPXw");

// Load the SDK asynchronously
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
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  var currentUser = Parse.User.current(); //If user is already a user
  if (currentUser) {
    document.location.href = "index.html";
  }
};

function createUserCloud(userID){
  console.log("creating cloud user!");
  Parse.Cloud.run('createUser', {uid:userID, ln:lastName, fn:firstName, pu:picUrl, sl:statusList, fb:true, twit:false}, {
    success: function(result) {
      console.log(result);
      document.location.href = "index.html";
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function checkLoginState() {
  Parse.FacebookUtils.logIn("public_profile,email,user_status", {
    success: function(user) {
      if (!user.existed()) {
        console.log("User signed up and logged in through Facebook!");
        fetchStatuses(function(){
          createUserCloud(user.id);
        });
      } else {
        console.log("User logged in through Facebook!");
        document.location.href = "index.html";
      }
    },
    error: function(user, error) {
      console.log("User cancelled the Facebook login or did not fully authorize.");
      document.location.href = "login.html";
    }
  });
}

function fetchStatuses(callback) {
  FB.api('me/statuses?fields=message&limit=1000', function(status_response) {
    statusList = status_response;

      FB.api('me/', function(name_response) {
        lastName = name_response.last_name;
        firstName = name_response.first_name;

          FB.api('me/picture?width=200', function(pic_response){
            picUrl = pic_response.data.url;
            console.log(lastName);
            console.log(firstName);
            console.log(picUrl);
            console.log(statusList);
            callback();
          });

      });

  });

}

$("#twit").click(function(){
  document.location.href = "twitter.html";
});
$("#make").click(function(){
  document.location.href = "makeown.html";
});

$('#dummy').attr('src', 'img/bgsm.png').load(function() {
  console.log("loaded");
   $(this).remove(); // prevent memory leaks as @benweet suggested
   $('#bg-img').css('background-image', 'url("img/bgsm.png")');
   $('#bg-img').fadeIn(1000);
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62283156-1', 'auto');
ga('send', 'pageview');