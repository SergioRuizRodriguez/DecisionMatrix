'use strict';

decisionMatrixApp.controller('MatrixController', ['$scope', '$modal', function ($scope, $modal) {

    $scope.newQualitative = false;

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

    $scope.addQualitativeOption = function (qualitative) {
        var newQualitativeOption = new QualitativeOption(qualitative.name, qualitative.value);
        $scope.qualitativeOptions.push(newQualitativeOption);
        $scope.cleanQualitativeForm();
        $scope.newQualitative = false;
    };

    $scope.cleanQualitativeForm = function (qualitative) {
        qualitative.name = null;
        qualitative.value = null;
    };

    $scope.addFeature = function (feature) {
        var newFeature = new Feature(feature.name, feature.weight, feature.isqualitative);
        $scope.features.push(newFeature);
        $scope.addFeaturesToOptions(newFeature);
        $scope.cleanFeatureForm(feature);
    };

    $scope.cleanFeatureForm = function (feature) {
        feature.name = null;
        feature.weight = null;
        feature.isqualitative = false;
    };

    $scope.addFeaturesToOptions = function (feature) {
        if ($scope.options.length) {
            for (var option = 0; option < $scope.options.length; option++) {
                var newFeature = new Feature(feature.name, feature.weight, feature.isqualitative);
                $scope.options[option].features.push(newFeature);
            }
        }
    };

    $scope.addOption = function (option) {
        var newFeatures = $scope.features.slice();
        var newOption = new Option(option.name, newFeatures);
        $scope.options.push(newOption);
        $scope.cleanOptionForm(option);
    };

    $scope.cleanOptionForm = function (option) {
        option.name = null;
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

    $scope.cancelOption = function (option) {
        cleanOptionForm(option);
    };

    $scope.cancelFeature = function (feature) {
        cleanFeatureForm(feature);
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