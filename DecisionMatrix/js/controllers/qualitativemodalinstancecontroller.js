'use strict';

decisionMatrixApp.controller('QualitativeModalInstanceController', ['$scope', '$modalInstance', 'parameterQualitative', function ($scope, $modalInstance, parameterQualitative) {

    $scope.newQualitative = false;
    $scope.settings = settings;
    $scope.qualitative = new QualitativeOption(null, null);
    $scope.qualitativeOptions = qualitativeOptions;
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
}]);