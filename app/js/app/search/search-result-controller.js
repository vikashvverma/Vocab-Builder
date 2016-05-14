angular.module('vocabBuilder.controllers')

    .controller('SearchResultController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService) {
        $scope.result = DictionaryService.retrieve();
        if (!$scope.result && !$scope.result.word) {
            HelperService.notify("Could not find any result!", "info");
            $ionicHistory.goBack();
        }
        if ($scope.result.audio) {
            $scope.result.audio = new Audio($scope.result.audio);
        }
        $scope.play = function () {
            $scope.result.audio.play()
        };
        $scope.expandCallback = function (index, id) {
            $('#related-words #type' + index).show(1000);
        };

        $scope.collapseCallback = function (index, id) {
            $('#related-words #type' + index).hide(1000);
        };
    });


