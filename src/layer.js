(function(exports) {
	/**
	 * @class
	 * @constructor
	 * @name Layer
	 * @param {Object} option
	 * @param {String} option.name
	 * @param {Object} option.canvasOpts
	 * @param {Int} option.canvasOpts.width
	 * @param {Int} option.canvasOpts.height
	 */
	var Layer = exports.Layer = function(option) {
		this.option = option;
		this.name = option.name;
		this.featuresContainer = new Csprite.FeaturesContainer(this);
		this.index = 0;
	}

	Csprite.extend(Layer.prototype, {
		/**
		 * @function
		 * @public
		 */ 
		addFeature: function(feature) {
			this.featuresContainer.add(feature);
			feature.layer = this;
			this.generateFeatureId(feature);
		},

		/**
		 * @function
		 * @private
		 */
		generateFeatureId: function(feature) {
			feature.id = this.currentFeatureId++;
		},

		/**
		 * @functin
		 * @public
		 */
		removeFeature: function(feature) {
			this.featuresContainer.remove(feature)
		},

		/**
		 * @function
		 * @public
		 */
		getFeatures: function() {
			return this.featuresContainer.features;
		},

		/**
		 * @function
		 * @public
		 * @param {int} id
		 */
		getFeature: function(id) {
			var features = this.featuresContainer.features;

			for(var i = 0, len = features.length; i < len; i++) {
				if (features[i].id == id) {
					return features[i];
				}
			}
		},

		/**
		 * @function
		 * @public
		 */
		update: function() {
			this.featuresContainer.update();
		},

		/**
		 * @function
		 * @public
		 */
		setIndex: function(index) {
			this.index = index;
			this.startFeatureId = 10000 * index; //max featurescount each layer , 10000
			this.currentFeatureId = this.startFeatureId;
		}

	});

})(Csprite);