// Ionic Starter App

//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/app/dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
        dropbox: "your_api_key",//Use for Dropbox API clientID.
        facebook: "1664740487135222",//Use for Facebook API appID.
        foursquare: "your_api_key", //Use for Foursquare API clientID.
        instagram: "your_api_key",//Use for Instagram API clientID.
        googlePlus: "your_api_key",//Use for Google API clientID.
        adMob: "your_api_key" //Use for AdMob API clientID.
    }
};// End Global variable

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('gw2assistant', [
  'ionic',
  'angularMoment',
  'gw2assistant.controllers',
  'gw2assistant.directives',
  'gw2assistant.filters',
  'gw2assistant.services',
  'gw2assistant.factories',
  'gw2assistant.config',
  'gw2assistant.views',
  'underscore',
  'ngMap',
  'ngResource',
  'ngCordova',
  'slugifier',
  'ionic.contrib.ui.tinderCards',
  'ngIOS9UIWebViewPatch',
  'ngMaterial'
])

.run(function($ionicPlatform, AuthService, PushNotificationsService, $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.on("deviceready", function(){

    AuthService.userIsLoggedIn().then(function(response)
    {
      if(response === true)
      {
        //update user avatar and go on
        AuthService.updateUserAvatar();

        $state.go('app.profile');
      }
      else
      {
        $state.go('auth.walkthrough');
      }
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });
  
    $ionicPlatform.on("resume", function(){
    AuthService.userIsLoggedIn().then(function(response)
    {
      if(response === false)
      {
        $state.go('auth.walkthrough');
      }else{
        //update user avatar and go on
        AuthService.updateUserAvatar();
      }
    });

    PushNotificationsService.register();
  });

//OLD - HER VERSION OF "UI Router Authentication Check"
  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
	if (toState.data.authenticate)
    {
      AuthService.userIsLoggedIn().then(function(response)
      {
        if(response === false)
        {
          event.preventDefault();
          $state.go('auth.walkthrough');
        }
      });
    }
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.profile') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());	
    }
  });
  
  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  //INTRO
  .state('auth', {
    url: "/auth",
    templateUrl: "views/auth/auth.html",
    abstract: true,
    controller: 'AuthCtrl'
  })

  .state('auth.walkthrough', {
    url: '/walkthrough',
    templateUrl: "views/auth/walkthrough.html",
    data: {
      authenticate: false
    }
  })

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl',
    data: {
      authenticate: false
    }
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'RegisterCtrl',
    data: {
      authenticate: false
    }
  })

  .state('auth.forgot-password', {
    url: "/forgot-password",
    templateUrl: "views/auth/forgot-password.html",
    controller: 'ForgotPasswordCtrl',
    data: {
      authenticate: false
    }
  })
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })
  
  // setup an abstract state for the tabs directive
/*
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/app/tabs/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'views/app/tabs/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'views/app/tabs/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'views/app/tabs/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'views/app/tabs/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
*/

  //MISCELLANEOUS
  .state('app.miscellaneous', {
    url: "/miscellaneous",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/miscellaneous.html"
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.account', {
    url: "/account",
    views: {
      'menuContent': {
        templateUrl: "views/app/account/dash.html"
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.image-picker', {
    url: "/miscellaneous/image-picker",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/image-picker.html",
        controller: 'ImagePickerCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.tinder-cards', {
    url: "/layouts/tinder-cards",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/tinder-cards.html",
        controller: 'TinderCardsCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    },
    data: {
      authenticate: true
    }
  })

  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })
  
  //GUIDES
  .state('app.guides-categories', {
    url: "/guides-categories",
    views: {
      'menuContent': {
        templateUrl: "views/app/guides/guides-categories.html",
        controller: 'GuidesCategoriesCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.category-guides', {
    url: "/category-guides/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "views/app/guides/category-guides.html",
        controller: 'CategoryGuidesCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.guides-entries', {
    url: "/guides-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "views/app/guides/guides-entries.html",
        controller: 'GuidesEntriesCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

/*
  //FORUMS
  .state('app.forums', {
    url: "/forums",
    views: {
      'menuContent': {
        templateUrl: "views/app/forums/forums.html",
        controller: 'ForumsCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.forumspost', {
    url: "/forums/:postId",
    views: {
      'menuContent': {
        templateUrl: "views/app/forums/forums_post.html",
        controller: 'ForumsPostCtrl'
      }
    },
    data: {
      authenticate: true
    },
    resolve: {
      post_data: function(PostService, $ionicLoading, $stateParams) {
        $ionicLoading.show({
      		template: 'Loading post ...'
      	});

        var postId = $stateParams.postId;
        return PostService.getPost(postId);
      }
    }
  })
*/

  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress.html",
        controller: 'WordpressCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })
  
    .state('app.page', {
    url: "/wordpress_page",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress-page.html",
        controller: 'PageCtrl'
      }
    },
    data: {
      authenticate: true
    },
    resolve: {
      page_data: function(PostService) {
        //You should replace this with your page slug
        var page_slug = 'wordpress-page';
        return PostService.getWordpressPage(page_slug);
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    },
    data: {
      authenticate: true
    },
    resolve: {
      post_data: function(PostService, $ionicLoading, $stateParams) {
        $ionicLoading.show({
      		template: 'Loading post ...'
      	});

        var postId = $stateParams.postId;
        return PostService.getPost(postId);
      }
    }
  })

  //OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "views/app/settings.html",
        controller: 'SettingsCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.timer', {
    url: "/timer",
    views: {
      'menuContent': {
        templateUrl: "views/app/timer.html"
      }
    },
    data: {
      authenticate: false
    }
  })
  
    .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "views/app/map.html"
      }
    },
    data: {
      authenticate: false
    }
  })
  
  .state('app.gameinfo', {
    url: "/gameinfo",
    views: {
      'menuContent': {
        templateUrl: "views/app/gameinfo.html"
      }
    },
    data: {
      authenticate: false
    }
  })
  
  .state('app.community', {
    url: "/community",
    views: {
      'menuContent': {
        templateUrl: "views/app/community.html"
      }
    },
    data: {
      authenticate: false
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html"
      }
    },
    data: {
      authenticate: true
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "views/app/bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })
  
  // Material States
  .state('app.menuDashboard', {
    url: "/menuDashboard",
    views: {
        'menuContent': {
            templateUrl: "templates/themes/menu-dashboard/html/menu-dashboard.html",
            controller: "menuDashboardCtrl"
        }
    },
    data: {
      authenticate: true
    }
  })

;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile'); //change back to '/auth/walkthrough' later
});
