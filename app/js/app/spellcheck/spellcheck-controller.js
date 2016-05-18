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
                                alert("No writing errors were found");
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



