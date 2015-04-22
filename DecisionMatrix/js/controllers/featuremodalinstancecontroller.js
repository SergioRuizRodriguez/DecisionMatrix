'use strict';

decisionMatrixApp.controller('FeatureModalInstanceController', ['$scope', '$modalInstance', 'feature', function ($scope, $modalInstance, feature) {

    $scope.feature = feature;
    $scope.ok = function () {
        console.log($scope.featureForm.$invalid);
        $modalInstance.close(this.feature);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);