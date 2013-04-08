(function(exports) {
	var FeaturesContainer = exports.FeaturesContainer = function() {
		this.features = [];
		this.rulers = [];
	}

	Csprite.extend(FeaturesContainer.prototype, {
		/**
		 * @function
		 * @public
		 */
		add: function(feature) {
			if (this.valid(feature)) {
				this.features.push(feature);
			}
		},

		/**
		 * @function
		 * @public
		 */
		remove: function(feature) {
			var index = this.features.indexOf(feature);

			if (index >= 0) {
				this.features.splice(index, 1);
			}
		},

		/**
		 * @function
		 * @private
		 */
		valid: function(feature) {
			var rulers = this.rulers;
			rulers.forEach(function(rule) {


			});
			return true;
		},

		/**
		 * @function
		 * @public
		 */
		update: function() {
			var features = this.features;
			features.forEach(function(feature) {
				feature.update();
			});
		}

	});


})(Csprite);