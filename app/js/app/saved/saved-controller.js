angular.module('vocabBuilder.controllers')

    .controller('SavedController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store, ionicMaterialInk) {
        $scope.words = store.get("words") || [];
        $scope.results = store.get("results") || [];
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.removeWord = function (id) {
            var index = -1;
            for (var i = 0; i < $scope.words.length; i++) {
                if ($scope.words[i].id == id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                $scope.words.splice(index, 1);
            }
            store.set("words", $scope.words);
        };
        $scope.removeResult = function (word) {
            var index = -1;
            for (var i = 0; i < $scope.results.length; i++) {
                if ($scope.results[i].word == word) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                $scope.results.splice(index, 1);
            }
            store.set("results", $scope.results);
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

        $scope.speak = function () {
            TTS
                .speak($scope.wotd.word, function () {
                    //alert('success');
                }, function (reason) {
                    //alert(reason);
                    $HelperService.notify("Could generate voice","error");
                });
            //var msg = new SpeechSynthesisUtterance($scope.wotd.word);
            //window.speechSynthesis.speak(msg);
        };

        ionicMaterialInk.displayEffect();
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    });



