function Option() {
    this.name = null;
    this.features = null;
    this.visible = true;
}

function Option(name, features)
{
	this.name = name;
	this.features = features;
	this.visible = true;
}

Option.prototype.sumOfFeatures = function () {
var sumOfFeatures = 0;
    _.each(this.features, function (feature) {
        sumOfFeatures += feature.getValue();
    });
    return sumOfFeatures;
};

Option.prototype.weightedSumOfFeatures = function () {
    var sumOfTotalWeightForFeatures = 0;
    _.each(this.features, function (feature) {
        sumOfTotalWeightForFeatures += feature.weightedSum();
    });
    return sumOfTotalWeightForFeatures;
};