angular.module('vocabBuilder.controllers')

    .controller('WordsController', function ($scope) {
    })
    .controller('RandomController', function ($scope, $log, $timeout, ionicMaterialInk, DictionaryService, HelperService, store) {
        $scope.refresh = false;
        $scope.translation = [];
        $scope.random = function () {
            var d = HelperService.randomDate(new Date(2009, 8, 10), new Date());
            wordOfTheDay({date: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()})
        };
        $scope.random();
        $scope.play = function () {
            try {
                var p = $scope.audio ? $scope.audio.play() : undefined;
                if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
                    p.catch(function (e) {
                        console.log(e);
                    });
                }
            } catch (e) {
            }
        };
        $scope.translate = function (word) {
            //Line 8641 use try catch AngularJS
            $scope.translation = [];
            var pres = store.get("preferences");
            for (var i = 0; i < pres.trns.length; i++) {
                if (pres.trns[i].isChecked) {
                    trans(pres.trns[i], word)
                }
            }
        };
        function trans(lan, word) {
            DictionaryService.translate(lan.code, word)
                .success(function (data) {
                    console.log(data);
                    var trn = data.replace("[[[", "").replace(/"/g, "").split(",")[0];
                    var ori = data.replace("[[[", "").replace(/"/g, "").split(",")[1];
                    if (trn != $scope.wotd.word && $scope.wotd.word == ori) {
                        $scope.translation.push({trn: trn, lan: lan.title});
                    }
                });
        };
        $scope.speak = function () {
            //Try Cordova Plugin API
            try {
                TTS
                    .speak($scope.wotd.word, function () {
                    }, function (reason) {
                        HelperService.notify("Could not generate voice", "error");
                    });
            } catch (e) {
                // Fallback to browser API
                var msg = new SpeechSynthesisUtterance($scope.wotd.word);
                window.speechSynthesis.speak(msg);
            }
        };
        function wordOfTheDay(params) {
            DictionaryService.get('words.json/wordOfTheDay', params)
                .success(function (data) {
                    $scope.refresh = false;
                    $scope.wotd = data;
                    DictionaryService.save($scope.wotd);
                    pronunciation($scope.wotd.word);
                    audio($scope.wotd.word);
                    $scope.translate($scope.wotd.word);
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

        $scope.micon = false;
        $scope.record = function () {
            var recognition;
            //Try HTML5 API
            if (typeof webkitSpeechRecognition != "undefined") {
                recognition = new webkitSpeechRecognition()
            } else {
                //Fallback to cordova plugin
                recognition = new SpeechRecognition();
            }
            recognition.onresult = function (event) {
                if (event.results.length > 0) {
                    $scope.recognizedText = event.results[0][0].transcript;
                    $scope.$apply()
                }
                $scope.micon = true;
            };
            recognition.start();
            recognition.onend = function () {
                $scope.micon = false;
                $scope.$apply();
            };
            $scope.micon = true;
        };
        $timeout(function () {
            ionicMaterialInk.displayEffect();
        }, 0);
    });
