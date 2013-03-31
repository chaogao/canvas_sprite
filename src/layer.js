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
		this.scene = scene;
		this.featuresContainer = new Csprite.FeaturesContainer(this);
		this.canvas = this.createCanvas();
		this.index = 0;
	}

	Csprite.extend(Layer.prototype, {
        /**
         * @function
         * @private
         */
        createCanvas: function() {
            var canvas = document.createElement("canvas");

            canvas.width = this.option.canvasOpts.width;
            canvas.height = this.option.canvasOpts.height;
            canvas.style.cssText = "position: absolute; left: 0px; top: 0px;";
            return canvas;
        },

		/**
		 * @function
		 * @public
		 */ 
		addFeature: function(feature) {
			this.featuresContainer.add(feature);
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
		}

	});

})(Csprite);