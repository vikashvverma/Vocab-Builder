angular.module('vocabBuilder.controllers')

    .controller('SearchResultController', function ($scope, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store) {
        $scope.result = DictionaryService.retrieve();
        $scope.translation = [];
        if (!$scope.result && !$scope.result.word) {
            HelperService.notify("Could not find any result!", "info");
            $ionicHistory.goBack();
        }
        if ($scope.result.audio) {
            $scope.audio = new Audio($scope.result.audio);
        }
        $scope.speak = function () {
            //Try Cordova Plugin API
            try {
                TTS
                    .speak($scope.result.word, function () {
                    }, function (reason) {
                        HelperService.notify("Could not generate voice", "error");
                    });
            } catch (e) {
                // Fallback to browser API
                var msg = new SpeechSynthesisUtterance($scope.result.word);
                window.speechSynthesis.speak(msg);
            }
        };
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
        $scope.isSaved = (store.get("results") ? store.get("results") : []).filter(function (word) {
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
                results.splice(index, 1);
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
        $scope.translate = function () {
            //Line 8641 use try catch AngularJS
            var pres = store.get("preferences");
            for (var i = 0; i < pres.trns.length; i++) {
                if (pres.trns[i].isChecked) {
                    trans(pres.trns[i])
                }
            }
        };
        function trans(lan) {
            DictionaryService.translate(lan.code, $scope.result.word)
                .success(function (data) {
                    console.log(data);
                    var trn = data.replace("[[[", "").replace(/"/g, "").split(",")[0];
                    var ori = data.replace("[[[", "").replace(/"/g, "").split(",")[1];
                    if (trn != $scope.result.word && $scope.result.word == ori) {
                        $scope.translation.push({trn: trn, lan: lan.title});
                    }
                });
        };
        $scope.translate();
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


