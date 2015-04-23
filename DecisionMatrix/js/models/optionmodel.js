function Option(name, features, visible)
{
	this.name = name;
	this.features = features;
	this.visible = visible;
	this.sum = sum;

	this.calculateSumForFeatures = function () {
	    var sumOfFeatures = 0;
	    if (this.features.length)
	    {
	        for (var feature = 0; feature < this.features.length; feature++)
	        {
	            if (featuresToSum[feature].value)
	            {
	                sumOfFeatures += featuresToSum[feature].value;
	            }
	        }
	    }
	    return sumOfFeatures;
	};

}