'use strict';

decisionMatrixApp.controller('QualitativeModalInstanceController', ['$scope', '$modalInstance', 'parameterQualitative', function ($scope, $modalInstance, parameterQualitative) {

    $scope.newQualitative = false;
    $scope.qualitativeOptions = angular.copy(parameterQualitative[0]);
    $scope.settings = parameterQualitative[1];
    $scope.qualitative = new QualitativeOption(null, null);
    $scope.ok = function () {
        $modalInstance.close(this.qualitativeOptions);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.addQualitativeOption = function () {
        var newQualitativeOption = angular.copy(this.qualitative);
        $scope.qualitativeOptions.push(newQualitativeOption);
        $scope.qualitative = new QualitativeOption(null, null);
        $scope.newQualitative = false;
    };
    $scope.closeNewQualitative = function () {
        $scope.newQualitative = false;
    }
}]);