'use strict';

decisionMatrixApp.controller('MatrixController', ['$scope', '$modal', function ($scope, $modal) {

    $scope.feature = new Feature(null, 0, null, true, false);
    $scope.option = new Option(null, null, true);

    $scope.qualitative = new QualitativeOption(null, null);

    $scope.features = [];

    $scope.options = [];

    $scope.qualitativeOptions = [];

    $scope.matrix = new DecisionMatrix("DecisionMatrix",null);

    $scope.addQualitativeOption = function () {
        var newQualitativeOption = angular.copy(this.qualitative);
        $scope.qualitativeOptions.push(newQualitativeOption);
        $scope.qualitative = new QualitativeOption(null, null);
    };

    $scope.addFeature = function () {
        $scope.features.push($scope.feature);
        if ($scope.options.length) {
            $scope.addFeaturesToOptions($scope.feature);
        }
        //this.feature = { 'name': null, 'value': 0, 'weight': null, 'visible': true };
        this.feature = new Feature(null, 0, null, true, false);
    };

    $scope.addFeaturesToOptions = function (feature) {
        for (var option = 0; option < $scope.options.length; option++) {
            var featureToAdd = angular.copy(feature);
            $scope.options[option].features.push(featureToAdd);
        }
    };

    $scope.addOption = function () {
        var newFeature = angular.copy(this.features);
        $scope.option.features = newFeature;
        $scope.options.push($scope.option);
        $scope.matrix.options = this.options;
        //$scope.option = { 'name': null, 'features': null, 'visible': true };
        this.option = new Option(null, null, true);
    };

    $scope.deleteFeature = function (index) {
        if ($scope.options.length) {
            $scope.deleteFeaturesInOptions(index);
        }
        $scope.features.splice(index, 1);
    };

    $scope.deleteFeaturesInOptions = function (index) {
        for (var option = 0; option < $scope.options.length; option++) {
            if ($scope.options[option].features.length) {
                $scope.options[option].features.splice(index, 1);
            }
        }
    };

    $scope.deleteOption = function (index) {
        $scope.options.splice(index, 1);
    };

    $scope.calculateSumsForOptions = function () {
        for (var option = 0; option < $scope.options.lenght; option++) {
            $scope.options[option].sum = calculateSumForFeatures(option);
        }
    };

    $scope.calculateSumForFeatures = function (option) {
        var featuresToSum = $scope.options[option].features;
        var sumOfFeatures = 0;
        for (var feature = 0; feature < featuresToSum.lenght; feature++){
            if(featuresToSum[feature].value)
            {
                sumOfFeatures += featuresToSum[feature].value;
            }
        }
        return sumOfFeatures;
    };

    $scope.openOptionModal = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'optionModalContent.html',
            controller: 'OptionModalInstanceController',
            size: size,
            resolve: {
                option: function () {
                    return $scope.option;
                }
            }
        });

        modalInstance.result.then(function (option) {
            $scope.option = option;
            $scope.addOption();
        }, function () {

        });
    };

    $scope.openFeatureModal = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'featureModalContent.html',
            controller: 'FeatureModalInstanceController',
            size: size,
            resolve: {
                feature: function () {
                    return $scope.feature;
                }
            }
        });

        modalInstance.result.then(function (feature) {
            $scope.feature = feature;
            $scope.addFeature();
        }, function () {

        });
    };
}]);