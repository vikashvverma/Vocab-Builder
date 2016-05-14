angular.module('vocabBuilder.controllers')

    .controller('SearchController', function ($state, $scope, $log, $timeout, $ionicLoading, DictionaryService, HelperService, ionicMaterialInk, ionicMaterialMotion) {
        var baseURL = "word.json";
        $scope.search = {};
        $scope.result = {};
        $scope.count = 0;
        function reset() {
            $scope.result = {};
        }

        $scope.$watch('count', function (newVal, oldVal) {
            if (newVal === oldVal && newVal === 0) {
                return;
            }
            if (newVal) {
                HelperService.showLoader();
            } else {
                HelperService.hideLoader();
                DictionaryService.store($scope.result);
                $state.go('app.result');
            }
        });
        $scope.find = function (word) {
            if (!word) {
                HelperService.notify("Please enter the word!", "error");
                return;
            }
            var criteria = Object.keys($scope.search);
            if (!criteria.length) {
                HelperService.notify("Please select at least one option!", "error")
            }
            reset();
            $scope.result.word = word;
            for (var i = 0; i < criteria.length; i++) {
                if ($scope.search[criteria[i]]) {
                    $scope.count++;
                    $scope[criteria[i]](baseURL + "/" + word);
                }
            }
        };
        $scope.examples = function (word) {
            DictionaryService.get(word + '/examples')
                .success(function (data) {
                    $scope.result.examples = data && data.examples;
                    $scope.count--;
                })
                .error(function (err) {

                });
        };
        $scope.definitions = function (word) {
            DictionaryService.get(word + '/definitions')
                .success(function (data) {
                    $scope.result.definitions = data;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.count--;
                });
        };
        $scope.relatedWords = function (word) {
            DictionaryService.get(word + '/relatedWords')
                .success(function (data) {
                    $scope.result.relatedWords = data;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.count--;
                });
        };
        $scope.pronunciations = function (word) {
            DictionaryService.get(word + '/pronunciations')
                .success(function (data) {
                    $scope.result.pronunciation = data && data[0] && data[0].raw;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.count--;
                });
        };
        $scope.phrases = function phrases(word) {
            DictionaryService.get(word + '/phrases')
                .success(function (data) {
                    $scope.result.phrases = data;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.count--;
                });
        };
        $scope.etymologies = function (word) {
            DictionaryService.get(word + '/etymologies')
                .success(function (data) {
                    $scope.result.etymologies = data;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.count--;
                });
        };
        $scope.audio = function (word) {
            DictionaryService.get(word + '/audio')
                .success(function (data) {
                    var audio = data && data[0] && data[0].fileUrl;
                    $scope.result.audio = audio;
                    $scope.count--;
                })
                .error(function (err) {
                    $scope.result.audio = undefined;
                    $scope.count--;
                });
        };

    });

