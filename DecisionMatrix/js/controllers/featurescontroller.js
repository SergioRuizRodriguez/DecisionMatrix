decisionMatrixApp.controller('FeaturesController', ['$scope', 'DecisionMatrixService', FeaturesController]);

function FeaturesController ($scope, DecisionMatrixService) {

    this.deleteFeature = function () {
        DecisionMatrixService.deleteFeature($scope.feature);
    };

    this.toggleFeatureVisibility = function () {
        DecisionMatrixService.toggleFeatureVisibility($scope.feature);
    };

}