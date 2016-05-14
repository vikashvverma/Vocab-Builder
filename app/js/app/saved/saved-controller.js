angular.module('vocabBuilder.controllers')

    .controller('SavedController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store, ionicMaterialInk) {
        $scope.words = store.get("words") || [];
        $scope.saved = store.get("results") || [];
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.remove = function (id) {
            var index = -1;
            for (var i = 0; i < $scope.words.length; i++) {
                if ($scope.words[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                $scope.words.splice(i, 1);
            }
            store.set("words", $scope.words);
            $scope.shouldShowDelete = false;
        };
        $scope.goto = function (word) {
            DictionaryService.store(word);
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
        $scope.audio = $scope.wotd && $scope.wotd.audio ? new Audio($scope.wotd.audio) : undefined;
        $scope.play = function () {
            $scope.audio ? $scope.audio.play() : undefined;
        };
        ionicMaterialInk.displayEffect();
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    });



