// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vocabBuilder', [
        'ionic',
        'vocabBuilder.controllers',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])

    .run(function ($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
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
        // This hooks all auth events to check everything as soon as the app starts
        auth.hookEvents();


        $rootScope.$on('$locationChangeStart', function () {
            var token = store.get('token');
            var refreshToken = store.get('refreshToken');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    if (refreshToken) {
                        if (refreshingToken === null) {
                            refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                                store.set('token', idToken);
                                auth.authenticate(store.get('profile'), idToken);
                            }).finally(function () {
                                refreshingToken = null;
                            });
                        }
                        return refreshingToken;
                    } else {
                        $location.path('/login');// Notice: this url must be the one defined
                    }                          // in your login state. Refer to step 5.
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
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
                        templateUrl: 'templates/main.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('app.words', {
                url: '/words',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/words.html'
                        //controller: 'WordsController'
                    }
                }
            })
            .state('app.word', {
                url: '/word',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html',
                        controller: 'SearchController'
                    }
                }
            })
            .state('app.result', {
                url: '/word/result',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search-result.html',
                        controller: 'SearchResultController'
                    }
                }
            })

            .state('app.saved', {
                url: '/saved',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/saved.html',
                        controller: 'SavedController'
                    }
                }
            })
            .state('app.savedWord', {
                url: '/saved/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/word.html',
                        controller: 'SavedWordController'
                    }
                }
            })
            .state('app.spellcheck', {
                url: '/spellcheck',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/spellcheck.html',
                        controller: 'SpellCheckController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

        authProvider.init({
            domain: 'programminggeek.auth0.com',
            clientID: 'S6MNYpDy9EEmj0DO6jch3RQfFOtEvzOI',
            loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
        });
    });
