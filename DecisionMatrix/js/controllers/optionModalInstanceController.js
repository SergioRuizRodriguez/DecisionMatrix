'use strict';

decisionMatrixApp.controller('OptionModalInstanceController', ['$scope', '$modalInstance', 'option', function ($scope, $modalInstance, option) {

    $scope.option = option;
    $scope.ok = function () {
        $modalInstance.close(this.option);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);