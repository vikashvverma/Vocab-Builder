'use strict';

angular.module('vocabBuilder.helper', ['ngNotify'])
    .factory('HelperService', function ($ionicLoading, ngNotify) {

        return {
            randomDate: function (start, end) {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            },
            showLoader: function () {
                $ionicLoading.show({
                    template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
                });
            },
            hideLoader: function () {
                $ionicLoading.hide({
                    template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
                });
            },
            notify: function (message, type) {
                ngNotify.set(message, type);
            }
        };
    });


