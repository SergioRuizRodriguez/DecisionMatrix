function Feature() {
    this.name = null;
    this.value = null;
    this.weight = null;
    this.visible = true;
    this.isqualitative = false;
}

function Feature(name, weight, isqualitative)
{
	this.name = name;
	this.value = null;
	this.weight = weight;
	this.visible = true;
	this.isqualitative = isqualitative;
}

Feature.prototype.getValue = function () {
    if (this.value){
        if (this.isqualitative) {
            return this.value.value;
        }
        else {
            return this.value;
        }
    }
    else {
        return 0;
    }
};

Feature.prototype.weightedSum = function () {
    var weightedSum = 0;
    if (!this.weight) {
        this.weight = 1;
    }
    if (this.value) {
        weightedSum += this.getValue() * this.weight;
    }
    return weightedSum;
};