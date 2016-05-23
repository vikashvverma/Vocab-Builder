angular.module('vocabBuilder.controllers', [
        'ionic-material',
        'vocabBuilder.services',
        'vocabBuilder.helper',
        'ngAnimate',
        'vAccordion',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ])

    .controller('AppCtrl', function ($scope, $window, $ionicModal, $ionicPopover, $timeout, ionicMaterialInk, ionicMaterialMotion, store, $location, auth, HelperService, jwtHelper) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Open the login modal
        $scope.login = function () {
            //$scope.modal.show();
            auth.signin({
                authParams: {
                    scope: 'openid offline_access',
                    device: 'Mobile device'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refreshToken);
                $location.path('/');
                $scope.auth = auth;
            }, function () {
                // Error callback
                HelperService.notify("Could not log you in!", "error");
            });
        };
        $scope.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $scope.closePopover();
            $scope.auth = undefined;
            HelperService.notify("You have been logged out!", "info");
        };

        $scope.facebook = function () {
            $window.open(encodeURI("https://www.facebook.com/vikashvverma"), '_system', 'location=yes');
        };

        $scope.popover = $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });

        //Login at startup
        if (!auth.isAuthenticated) {
            $scope.login();
        } else {
            $scope.auth = auth;
        }

        //Preferences modal
        $ionicModal.fromTemplateUrl('templates/preferences.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.preferences = modal;
        });

        $scope.userItems = [
            {
                title: "Logout",
                icon: "ion-log-out",
                action: "logout()"
            },
            {
                title: "Preferences",
                icon: "ion-gear-a",
                action: "preferences.show();"

            }
        ];
        var pres = store.get("preferences");
        $scope.pres = pres || {
                trns: [
                    {code: 'hi', title: "Hindi", isChecked: true},
                    {code: 'bn', title: "Bengali", isChecked: false},
                    {code: 'gu', title: "Gujarati", isChecked: false},
                    {code: 'ur', title: "Urdu", isChecked: false},
                    {code: 'te', title: "Telugu", isChecked: false},
                    {code: 'ta', title: "Tamil", isChecked: false},
                    {code: 'ka', title: "Kannada", isChecked: false},
                    {code: 'ja', title: "Japanese", isChecked: false},
                    {code: 'fr', title: "French", isChecked: false},
                    {code: 'de', title: "German", isChecked: false}
                ]
            };
        $scope.save = function () {
            $scope.preferences.hide();
            console.log("Preferences: ", $scope.pres);
            store.set("preferences", $scope.pres);
            HelperService.notify("Preferences saved!", "info");
        };
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
        //ionicMaterialMotion.ripple();
    })
    .controller('LoginCtrl', function (store, $scope, $location, auth) {
        $scope.login = function () {
            auth.signin({
                authParams: {
                    scope: 'openid offline_access',
                    device: 'Mobile device'
                }
            }, function (profile, token, accessToken, state, refreshToken) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                store.set('refreshToken', refreshToken);
                $location.path('/');
            }, function () {
                // Error callback
            });
        }
    });
