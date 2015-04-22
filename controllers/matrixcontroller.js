'use strict';

decisionMatrixApp.controller('MatrixController', function(){
		
		this.feature = {'name': null, 'value': 0, 'weight': null, 'visible': true, 'isqualitative': false};
		this.option = {'name': null, 'features': null, 'visible': true};
		
		this.qualitative = {'name': null, 'value': null};
	
		this.features = [];
				
		this.options = [];
		
		this.qualitativeOptions = [];	
		
		this.matrix = 
			{
			'name': 'DecisionMatrix',
			'options': null,
			};
		
		this.addFeature = function(){			
			//var feature = {'name':'Feature ' + this.features.length, 'value': 0, 'weight': null, 'visible': true};
			this.features.push(feature);
			if(this.options.length)
			{
				this.addFeaturesToOptions(feature);
			}
			//this.feature = {'name': null, 'value': 0, 'weight': null, 'visible': true};
		};
		
		this.addFeaturesToOptions = function(feature){
			for(var option=0; option < this.options.length; option++)
			{
				var featureToAdd = angular.copy(feature);
				this.options[option].features.push(featureToAdd);
			}
		};
		
		this.addOption = function(){
			var newFeature = angular.copy(this.features);
			//var option = {'name': 'Option ' + this.options.length, 'features': newFeature, 'visible':true};
			this.options.push(option);
			this.matrix.options = this.options;
			//this.option = {'name': null, 'features': this.features, 'visible': true};
		};
		
		this.deleteFeature = function(index){
			if(this.options.length)
			{
				this.deleteFeaturesInOptions(index);			
			}
			this.features.splice(index,1);
		};		
		
		this.deleteFeaturesInOptions = function(index){
			for(var option=0; option < this.options.length; option++)
			{
				if(this.options[option].features.length)
				{
					this.options[option].features.splice(index,1);
				}
			}
		};

		this.deleteOption = function(index){
			this.options.splice(index,1);
		};
});