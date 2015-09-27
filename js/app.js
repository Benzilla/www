angular.module('starter', ['ionic', 'ngCordova' , 'starter.controllers','imageCanvas','loadingText','quoteContainer','randomButton','colourCanvas','tweetButton','makeButton'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //$ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.navBar.alignTitle("center"); //Places them at the bottom for all OS
 
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.status', {
    url: '/status',
    views: {
      'tab-status': {
        templateUrl: 'templates/tab-status.html',
        controller: 'statusCtrl'
      }
    }
  })

  .state('tab.tweets', {
    url: '/tweets',
    views: {
      'tab-tweets': {
        templateUrl: 'templates/tab-tweets.html',
        controller: 'tweetsCtrl'
      }
    }
  })

  .state('tab.make', {
    url: '/make',
    views: {
      'tab-make': {
        templateUrl: 'templates/tab-make.html',
        controller: 'makeCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
