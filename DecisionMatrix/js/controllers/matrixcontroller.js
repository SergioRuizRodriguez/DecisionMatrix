'use strict';

decisionMatrixApp.controller('MatrixController', ['$scope', '$modal', function ($scope, $modal) {

    $scope.newQualitative = false;
    $scope.feature = new Feature(null, 0, null, true, false);
    $scope.option = new Option(null, null, true);

    $scope.qualitative = new QualitativeOption(null, null);

    $scope.features = [];

    $scope.options = [];

    $scope.qualitativeOptions = [new QualitativeOption('Good', 5),
                                new QualitativeOption('Regular', 3),
                                new QualitativeOption('Bad', 1)];

    $scope.settings = {
        "minValue": 0, "maxValue": 5,
        "minAcceptedValue": 0, "DisplaySum": true,
        "DisplayWeight": false, 'DisplayStatus': true
    };

    $scope.matrix = new DecisionMatrix("DecisionMatrix",null);

    $scope.addQualitativeOption = function () {
        var newQualitativeOption = angular.copy(this.qualitative);
        $scope.qualitativeOptions.push(newQualitativeOption);
        $scope.qualitative = new QualitativeOption(null, null);
        $scope.newQualitative = false;
    };

    $scope.addFeature = function () {
        $scope.features.push($scope.feature);
        if ($scope.options.length) {
            $scope.addFeaturesToOptions($scope.feature);
        }
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

    $scope.toggleVisibilityFeature = function(index)
    {
        $scope.features[index].visible = false;
        for(var option = 0; option < $scope.options.length; option++)
        {
            $scope.options[option].features[index].visible = false;
        }
    }

    $scope.returnWiningOption = function () {
        var maxWeight = 0;
        for(var option = 0; option < $scope.options.length; option++)
        {
            var sumOfFeatures = $scope.calculateTotalWeightForFeatures(option);
            if (maxWeight < sumOfFeatures)
            {
                maxWeight = sumOfFeatures;
            }
        }
        return maxWeight;
    };

    $scope.calculateSumsForOptions = function () {
        for (var option = 0; option < $scope.options.length; option++) {
            $scope.calculateSumForFeatures(option);
        }
    };

    $scope.calculateSumForFeatures = function (option) {
        var featuresToSum = $scope.options[option].features;
        var sumOfFeatures = 0;
        if(featuresToSum)
        {
            for (var feature = 0; feature < featuresToSum.length; feature++) {
                if(featuresToSum[feature].value)
                {
                    if (featuresToSum[feature].isqualitative) {
                        sumOfFeatures += featuresToSum[feature].value.value;
                    }
                    else {
                        sumOfFeatures += featuresToSum[feature].value;
                    }
                }
            }
        }
        return sumOfFeatures;
    };

    $scope.calculateTotalWeightForFeatures = function (option) {
        var featuresToSum = $scope.options[option].features;
        var sumOfTotalWeightForFeatures = 0;
        if (featuresToSum) {
            for (var feature = 0; feature < featuresToSum.length; feature++) {
                if (!featuresToSum[feature].weight) {
                    featuresToSum[feature].weight = 1;
                }
                if (featuresToSum[feature].value) {
                    if (featuresToSum[feature].isqualitative) {
                        sumOfTotalWeightForFeatures += featuresToSum[feature].value.value * featuresToSum[feature].weight;
                    }
                    else {
                        sumOfTotalWeightForFeatures += featuresToSum[feature].value * featuresToSum[feature].weight;
                    }
                }
            }
            $scope.options[option].weightedSum = sumOfTotalWeightForFeatures;
        }
        return sumOfTotalWeightForFeatures;
    };

    $scope.cancelOption = function () {
        this.option = new Option(null, null, true);
    };

    $scope.cancelFeature = function () {
        this.feature = new Feature(null, 0, null, true, false);
    };

    $scope.toggled = function (open) {
        
    };

    $scope.toggleDropdown = function ($event) {
        if(!$event.srcElement.type) {
            $event.preventDefault();
            $event.stopPropagation();
        } else {
            $event.stopPropagation();
        }
    };

    $scope.closeNewQualitative = function () {
        $scope.newQualitative = false;
    };
}]);