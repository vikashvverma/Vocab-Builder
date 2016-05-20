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
                var p=$scope.audio ? $scope.audio.play() : undefined;
                if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
                    p.catch(function (e) {
                        console.log(e);
                    });
                }
            } catch (e) {
            }
        };
        $scope.translate=function(){
            DictionaryService.translate('hi',"hello")
                .success(function(data){
                    console.log(data);
                    //$scope.translation=JSON.parse(data)[0][0][0];
                });
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
        function wordOfTheDay(params) {
            DictionaryService.get('words.json/wordOfTheDay', params)
                .success(function (data) {
                    $scope.refresh = false;
                    $scope.wotd = data;
                    DictionaryService.save($scope.wotd);
                    pronunciation($scope.wotd.word);
                    audio($scope.wotd.word);
                    $scope.translate();
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
