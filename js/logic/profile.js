var firstName;
var lastName;
var picUrl;
var statusList;

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
    getUserFromCloud(currentUser.id);
    changeLoginoutBtn()
  } else {
    checkLoginState();  //else checkloginstate - which will prompt app sign up?
  }
};

function fetchStatuses(callback) {
  FB.api('me/statuses?fields=message&limit=1000', function(status_response) {
    statusList = status_response;

      FB.api('me/', function(name_response) {
        lastName = name_response.last_name;
        firstName = name_response.first_name;

          FB.api('me/picture', function(pic_response){
            picUrl = pic_response.data.url;
            callback();
          });

      });

  });

}


function createUserCloud(userID){
  console.log("creating cloud user!");
  Parse.Cloud.run('createUser', {uid:userID, ln:lastName, fn:firstName, pu:picUrl, sl:statusList, fb:true, twit:false}, {
    success: function(result) {
      location.reload();
      console.log(result);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function getUserFromCloud(userID){
  Parse.Cloud.run('getUser', {uid:userID},{
    success: function(result) {
      setValues(result);
      setUpProfile(result);
      generatePage();
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function setValues(result){
    firstName = result[0];
    lastName = result[1];
    picUrl = result[3];
    console.log(picUrl);
    var profImg = document.getElementById("profileImg");
    profImg.setAttribute( "src", picUrl );
    $("#profileText").text(firstName);
}

function checkLoginState() {
  Parse.FacebookUtils.logIn("public_profile,email,user_status", {
    success: function(user) {
      if (!user.existed()) {
        console.log("User signed up and logged in through Facebook!");
        fetchStatuses(function(){
          createUserCloud(user.id);
        });
        changeLoginoutBtn()
      } else {
        console.log("User logged in through Facebook!");
        getUserFromCloud(user.id);
        changeLoginoutBtn()
      }
    },
    error: function(user, error) {
      console.log("User cancelled the Facebook login or did not fully authorize.");
    }
  });
}

function fbLogout(){
  Parse.User.logOut();
  var btn = document.getElementById("loginout");
  alert("logged out");
  $("#loginout").html('Login'); //change login button to logout button
  btn.setAttribute( "onClick", "checkLoginState()" );
  document.location.href = "login.html";
}

function changeLoginoutBtn(){
  var btn = document.getElementById("loginout");
  btn.setAttribute( "onClick", "fbLogout()" );
  $("#loginout").html('Logout');
}

function setUpProfile(result){
  var fbAdded = result[4];
  var twitAdded = result[5];
  var profImg = document.getElementById("profilePicture");
  profImg.setAttribute( "src", picUrl );
  $("#profileName").text(firstName);

  if(fbAdded){
    addTick("fbAdded");
  }
  else{
    addCross("fbAdded");
  }

  if(twitAdded){
    addTick("twitAdded");
  }
  else{
    addCross("twitAdded");
  }
  getFavorites();
}

function addTick(id){
  $("#"+id).addClass("glyphpad green glyphicon glyphicon-ok-circle");
}

function addCross(id){
  $("#"+id).addClass("glyphpad red glyphicon glyphicon-remove-circle");
}

function getFavorites(){

}

function generatePage(returnArr){
  $('#spinContainer').show();
  console.log("getfav");
  var userID = Parse.User.current().id;
  Parse.Cloud.run('getFavorites', {uid:userID},{
    success:function(faveQuotes){
      $('#spinContainer').hide();
      $.each(faveQuotes, function(i, value) {
        $("#quotedisplayer").append('<div class = "qbox"><img class="faveImg" src="'+faveQuotes[i]._serverData.base64Data+'"><div>');       
      });
    },
    error:function(error){
      console.log(error);
    }
  });
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-62283156-1', 'auto');
ga('send', 'pageview');