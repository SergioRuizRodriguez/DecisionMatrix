decisionMatrixApp.controller('OptionsController', ['$scope', 'DecisionMatrixService', OptionsController]);

function OptionsController($scope, DecisionMatrixService) {

    this.isWinner = function () {
        return DecisionMatrixService.isWinnerOption($scope.option);
    };

    this.isApproved = function () {
        return DecisionMatrixService.isApprovedOption($scope.option);
    };

    this.toggleOptionVisibility = function () {
        DecisionMatrixService.toggleOptionVisibility($scope.option);
    };

    this.deleteOption = function () {
        DecisionMatrixService.deleteOption($scope.option);
    };

}