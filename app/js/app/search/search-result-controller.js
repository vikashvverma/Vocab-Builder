angular.module('vocabBuilder.controllers')

    .controller('SearchResultController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store) {
        $scope.result = DictionaryService.retrieve();
        if (!$scope.result && !$scope.result.word) {
            HelperService.notify("Could not find any result!", "info");
            $ionicHistory.goBack();
        }
        if ($scope.result.audio) {
            $scope.audio = new Audio($scope.result.audio);
        }
        $scope.isSaved = (store.get("results")?store.get("results"):[]).map(function (word) {
            return word.word == $scope.result.word;
        }).length;
        $scope.toggle = function (doSave) {
            var results = store.get("results") || [];
            var index = -1;
            for (var i = 0; i < results.length; i++) {
                if (results[i].word == $scope.result.word) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                results.splice(i, 1);
            }
            if (doSave) {
                results.unshift($scope.result);
                $scope.isSaved = true;
                HelperService.notify("Saved!", "success");
            } else {
                $scope.isSaved = false;
                HelperService.notify("Removed!", "info");

            }
            save(results);
        };
        $scope.play = function () {
            $scope.audio.play()
        };
        $scope.expandCallback = function (index, id) {
            $('#related-words #type' + index).show(1000);
        };

        $scope.collapseCallback = function (index, id) {
            $('#related-words #type' + index).hide(1000);
        };
        function save(results) {
            store.set("results", results);
        }
    });


