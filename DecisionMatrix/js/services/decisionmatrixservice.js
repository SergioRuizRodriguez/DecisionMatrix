'use strict';

decisionMatrixApp.service('DecisionMatrixService', function () {

    var newQualitative = false;

    var features = [];

    var options = [];

    var qualitativeOptions = [new QualitativeOption('Good', 5),
                                new QualitativeOption('Regular', 3),
                                new QualitativeOption('Bad', 1)];

    var settings = {
        "minValue": 0, "maxValue": 5,
        "minAcceptedValue": 0, "DisplaySum": true,
        "DisplayWeight": false, 'DisplayStatus': true
    };

    function deleteFeaturesFromOptions(index) {
        _.each(options, function (option) {
            option.features.splice(index, 1);
        });
    }

    function addFeaturesToOptions(newFeature) {
       _.each(options,function(option){
            var newFeatureCopy = new Feature(newFeature.name, newFeature.weight, newFeature.isQualitative);
            option.features.push(newFeatureCopy);
        });
    }

    function returnWiningOption() {
        var maxWeight = 0;
        _.each(options, function (option) {
            var sumOfFeatures = option.weightedSumOfFeatures();
            maxWeight =Math.max(maxWeight, sumOfFeatures);
        });
        return maxWeight;
    }


    return {
        isNewQualitative: function () {
            return newQualitative;
        },
        getFeatures: function() {
            return features;
        },
        getOptions: function () {
            return options;
        },
        getQualitativeOptions: function() {
            return qualitativeOptions;
        },
        getSettings: function () {
            return settings;
        },
        addFeature: function (newFeature) {
            features.push(newFeature);
            addFeaturesToOptions(newFeature);
        },
        addOption: function (newOption) {
            options.push(newOption);
        },
        addQualitativeOption: function (newQualitativeOption) {
            qualitativeOptions.push(newQualitativeOption);
        },
        modifySettings: function (newSettings) {
            settings = newSettings;
        },
        modifyNewQualitativeFlag: function (newQualitativeFlag) {
            newQualitative = newQualitativeFlag;
        },
        isWinnerOption: function (option) {
            var weightedSumOfFeatures = option.weightedSumOfFeatures();
            return (weightedSumOfFeatures > 0 &&
                    weightedSumOfFeatures == returnWiningOption() &&
                    weightedSumOfFeatures >= settings.minAcceptedValue);
        },
        isApprovedOption: function (option) {
            return (option.weightedSumOfFeatures() >= settings.minAcceptedValue) ? "check" : "times";
        },
        toggleFeatureVisibility: function (feature) {
            var index = features.indexOf(feature);
            features[index].visible = !features[index].visible;
        },
        toggleOptionVisibility: function (option) {
            var index = options.indexOf(option);
            options[index].visible = !options[index].visible;
        },
        deleteFeature: function (feature) {
            var index = features.indexOf(feature);
            deleteFeaturesFromOptions(index);
            features.splice(index,1);
        },
        deleteOption: function (option) {
            var index = options.indexOf(option);
            options.splice(index,1);
        },
    };
});