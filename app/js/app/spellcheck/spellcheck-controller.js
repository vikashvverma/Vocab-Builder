angular.module('vocabBuilder.controllers')

    .controller('SpellCheckController', function ($scope, $stateParams, $log, $timeout, $ionicHistory, HelperService, DictionaryService, store, ionicMaterialInk) {
        $scope.isEditing = true;
        $scope.text = "";
        $scope.check = function (text) {
            $scope.isEditing = false;
            //$scope.input = text;
            $timeout(function () {
                AtD.checkCrossAJAX('preview',
                    {
                        success: function (errorCount) {
                            if (errorCount == 0) {
                                //alert("No writing errors were found");
                                HelperService.notify("No writing errors were found", "info");
                            }
                        },

                        error: function (reason) {
                            alert(reason);
                        }
                    });
            }, 1000);

        };
        $scope.enableEdit = function () {
            $scope.isEditing = true;
        };
    });


/*
 //Dummy text

 The purpoce of a spell checker is to check the text four spelling and typeing errors.
 The checker finds errors througout the text.

 When the spell checker finds an questionable word, it highlights it and suggests the mpst
 likely variants too replace the questionable word. You can select the variant and replace
 the wrrd or leave the word unanged.
 */
