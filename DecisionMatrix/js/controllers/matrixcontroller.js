'use strict';

decisionMatrixApp.controller('MatrixController', ['$scope', 'DecisionMatrixService', MatrixController]);

function MatrixController($scope, DecisionMatrixService) {

    this.features = DecisionMatrixService.getFeatures();
    this.options = DecisionMatrixService.getOptions();
    this.qualitativeOptions = DecisionMatrixService.getQualitativeOptions();
    this.settings = DecisionMatrixService.getSettings();
    this.newQualitative = DecisionMatrixService.isNewQualitative();

    this.addQualitativeOption = function () {
        var newQualitativeOption = new QualitativeOption($scope.qualitativeName, $scope.qualitativeValue);
        DecisionMatrixService.addQualitativeOption(newQualitativeOption);
        this.cleanQualitativeForm();
        DecisionMatrixService.modifyNewQualitativeFlag(false);
    };

    this.cleanQualitativeForm = function () {
        $scope.qualitativeName = null;
        $scope.qualitativeValue = null;
    };

    this.addFeature = function () {
        var newFeature = new Feature($scope.featureName, $scope.featureWeight, $scope.isQualitative);
        DecisionMatrixService.addFeature(newFeature);
        this.cleanFeatureForm();
    };

    this.cleanFeatureForm = function () {
        $scope.featureName = null;
        $scope.featureWeight = null;
        $scope.isQualitative = false;
    };

    this.addOption = function () {
        var newFeatures = DecisionMatrixService.getFeatures().slice();
        var newOption = new Option($scope.optionName, newFeatures);
        DecisionMatrixService.addOption(newOption);
        this.cleanOptionForm();
    };

    this.cleanOptionForm = function () {
        $scope.optionName = null;
    };

    this.deleteFeature = function () {
        DecisionMatrixService.deleteFeature($scope.feature);
    };

    this.toggleVisibilityFeature = function () {
    }

    this.cancelFeature = function () {
        cleanFeatureForm();
    };

    this.toggleDropdown = function ($event) {
        if (!$event.srcElement.type && $event.srcElement.localName!='label') {
            $event.preventDefault();
            $event.stopPropagation();
        } else {
            $event.stopPropagation();
        }
    };

    this.closeNewQualitative = function () {
        this.newQualitative = false;
    };

}