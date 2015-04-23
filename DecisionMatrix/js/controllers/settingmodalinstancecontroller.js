'use strict';

decisionMatrixApp.controller('SettingModalInstanceController', ['$scope', '$modalInstance', 'settings', function ($scope, $modalInstance, settings) {

    $scope.settings = settings;
    $scope.ok = function () {
        $modalInstance.close(this.settings);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);