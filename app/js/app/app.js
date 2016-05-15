// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vocabBuilder', ['ionic', 'vocabBuilder.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/main/main.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('app.words', {
                url: '/words',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/words/words.html',
                        controller: 'WordsController'
                    }
                }
            })
            .state('app.word', {
                url: '/word',
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/search/search.html',
                        controller: 'SearchController'
                    }
                }
            })
            .state('app.result', {
                url: '/word/result',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/search/search-result.html',
                        controller: 'SearchResultController'
                    }
                }
            })

            .state('app.saved', {
                url: '/saved',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/saved/saved.html',
                        controller: 'SavedController'
                    }
                }
            })
            .state('app.savedWord', {
                url: '/saved/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'js/app/saved/word.html',
                        controller: 'SavedWordController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
