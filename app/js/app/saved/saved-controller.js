angular.module('vocabBuilder.controllers')

    .controller('SavedController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store, ionicMaterialInk) {
        $scope.words = store.get("words") || [];
        $scope.saved = store.get("search-results") || [];
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.remove = function (id) {
            for (var i = 0; i < $scope.words.length; i++) {
                if ($scope.words[i].id == id) {
                    break;
                }
            }
            if (i < $scope.words.length) {
                $scope.words.splice(i, 1);
            }
            store.set("words", $scope.words);
            $scope.shouldShowDelete = false;
        };
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    })
    .controller('SavedWordController', function ($scope, $stateParams, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store, ionicMaterialInk) {
        var words = store.get("words");
        var id = $stateParams.id;
        $scope.wotd = words.filter(function (word) {
            return word.id == id;
        })[0];
        $scope.audio = $scope.wotd.audio ? new Audio($scope.wotd.audio) : undefined;
        $scope.play = function () {
            $scope.audio ? $scope.audio.play() : undefined;
        };
        ionicMaterialInk.displayEffect();
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    });



