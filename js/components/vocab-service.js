'use strict';

angular.module('vocabBuilder.services', ['angular-storage'])
    .factory('DictionaryService', function ($http, $log, store) {
        var baseURL = "http://api.wordnik.com/v4/";
        var APIKey = "d010da7a2a6504b98200702b9f6027c247adee8dad74a9737";
        var TranslationAPIEndPoint = "https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q={q}";

        var details;

        return {
            get: function (path, params) {
                var query_params = {api_key: APIKey};
                return $http.get(baseURL + path, {params: $.extend(query_params, params)}).success(function (data) {
                    $log.info(data);
                }).error(function (err) {
                    $log.error(err);
                });
            },
            save: function (wotd) {
                var words = store.get("words") || [];
                var index = -1;
                for (var i = 0; i < words.length; i++) {
                    if (words[i].id === wotd.id) {
                        index = i;
                        break;
                    }
                }
                if (index >= 0) {
                    words.splice(index, 1);
                }
                words.unshift(wotd);
                store.set("words", words);
            },
            store: function (result) {
                details = result;
            },
            retrieve: function () {
                return details;
            },
            getTests: function () {
                return $http.get('/api/aptitude/tcs');
            },
            translate: function (tl, text) {
                var api=TranslationAPIEndPoint.replace("{sl}","en").replace("{tl}",tl).replace("{q}",text);
                console.log(api);
                return $http.get(api).success(function (data) {
                    $log.info(data[0][0][0]);
                }).error(function (err) {
                    $log.error(err);
                });
            }
        };


    });

