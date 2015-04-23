'use strict';

decisionMatrixApp.controller('FeatureModalInstanceController', ['$scope', '$modalInstance', 'feature', function ($scope, $modalInstance, feature) {

    $scope.feature = feature;
    $scope.ok = function () {
        $modalInstance.close(this.feature);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);