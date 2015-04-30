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
    if (this.features) {
        for (var feature = 0; feature < this.features.length; feature++) {
            sumOfFeatures += this.features[feature].getValue();
        }
    }
    return sumOfFeatures;
};

Option.prototype.weightedSumOfFeatures = function() {
    var sumOfTotalWeightForFeatures = 0;
    if (this.features) {
        for (var feature = 0; feature < this.features.length; feature++) {
            sumOfTotalWeightForFeatures += this.features[feature].weightedSum();
        }
    }
    return sumOfTotalWeightForFeatures;
};

/*Option.prototype.isWinner = function (option) {
  
};*/
