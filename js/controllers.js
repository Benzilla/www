angular.module('starter.controllers', ['Data','Login','Share'])

.controller('loginCtrl', function($scope,Login) {
 	$scope.facebookLogin = function() {
        Login.checkLoginState();
    }
})

.controller('AccountCtrl', function($scope,Login,Data,$ionicPopup) {
	$scope.firstName = 'Ben';
	$scope.picture = Data.picUrl;
	$scope.logout = function() {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Logout',
	     template: 'Are you sure you want to logout?'
	   });
	   confirmPopup.then(function(res) {
	     if(res) {
	       Login.logoutParseAndFacebook();
	     } else {
	       console.log('User stayed logged in');
	     }
	   });
	 };
})

.controller('statusCtrl', function($scope,Data,Login,$ionicScrollDelegate) {
  $scope.loadMessage = 'Press Random Status to begin!';
})

.controller('tweetsCtrl', function($scope,Data,Login) {
  $scope.loadMessage = 'Enter a handler to begin!';
})

.controller('makeCtrl', function($scope,Data,Login) {
  $scope.loadMessage = 'Enter a message to begin!';
});
