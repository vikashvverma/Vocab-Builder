angular.module('vocabBuilder.controllers')

    .controller('MainController', function ($scope, $log, $timeout, ionicMaterialInk, DictionaryService, HelperService) {
        $scope.refresh = false;
        $scope.refreshPage = function () {
            wordOfTheDay();
        };
        $scope.random = function () {
            var d = HelperService.randomDate(new Date(2009, 8, 10), new Date());
            wordOfTheDay({date: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()})
        };
        wordOfTheDay();
        $scope.play = function () {
            try {
                $scope.audio ? $scope.audio.play() : undefined;
            } catch (e) {
            }
        };
        function wordOfTheDay(params) {
            DictionaryService.get('words.json/wordOfTheDay', params)
                .success(function (data) {
                    $scope.refresh=false;
                    $scope.wotd = data;
                    DictionaryService.save($scope.wotd);
                    pronunciation($scope.wotd.word);
                    audio($scope.wotd.word);
                })
                .error(function (err) {
                    $scope.refresh = true;
                    //wordOfTheDay();
                });
        }

        function pronunciation(word) {
            DictionaryService.get('word.json/' + word + '/pronunciations', {useCanonical: false, limit: 5})
                .success(function (data) {
                    $scope.wotd.pronunciation = data && data[0] && data[0].raw;
                    DictionaryService.save($scope.wotd);
                })
                .error(function (err) {
                });
        }

        function audio(word) {
            DictionaryService.get('word.json/' + word + '/audio', {useCanonical: false, limit: 5})
                .success(function (data) {
                    var audio = data && data[0] && data[0].fileUrl;
                    $scope.wotd.audio = audio;
                    $scope.audio = audio ? new Audio(audio) : undefined;
                    $scope.audio ? $scope.audio.preload = "auto" : undefined;
                    DictionaryService.save($scope.wotd);
                })
                .error(function (err) {
                });
        }

        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    });
