/**
 * @require core 
 */
(function(exports) {
	/**
	 * @class
	 * @constructor
	 * @name Csprite.Scene
	 * @param {object} sceneOpts
 	 * @param {string} senceOpts.container
	 * @param {object} senceOpts.tile
	 * @param {int} senceOpts.title.width
	 * @param {int} senceOpts.title.height
	 * @param {int} senceOpts.title.paddingX
	 * @param {int} senceOpts.title.paddingY
	 * @param {object} canvasOpts canvas options
	 * @param {int} canvasOpts.width
	 * @param {int} canvasOpts.height
	 * @param {object} loaderOpts options for load resources
	 */
	var Scene = exports.Scene = function(sceneOpts, canvasOpts, loaderOpts) {
		this.sceneOpts = sceneOpts;
		this.canvasOpts = canvasOpts;
		this.loaderOpts = loaderOpts;

		this.size = new Csprite.Helper.Size(canvasOpts);
		this.container = document.getElementById(sceneOpts.container);
		this.canvas = this.createCanvas();
		
		this.render = new Csprite.Render(this);
		this.featuresContainer = new Csprite.FeaturesContainer(this);

		this.initScene();
	}

	Csprite.extend(Scene.prototype, {
		/**
		 * @function
		 * @private
		 */
		createCanvas: function() {
			var canvas = document.createElement("canvas");

			canvas.width = this.size.width;
			canvas.height = this.size.height;
			this.container.appendChild(canvas);
			return canvas;
		},

		/**
		 * @function
		 * @private
		 */
		initScene: function() {
			var sceneOpts = this.sceneOpts;
			
			this.tile = new Csprite.Feature.Tile(sceneOpts.tile);
			this.grid = new Csprite.Feature.Grid(this.canvas, {
				tile: this.tile
			});
			this.loader = new Csprite.State.StateLoader(this.loaderOpts, this, this.loaderFinish.bind(this));
		},

		/**
		 * @function
		 * @public
		 */
		loaderFinish: function() {


		},

		/**
		 * @function
		 * @public
		 */
		addFeature: function(feature) {
			this.featuresContainer.add(feature);
		},

		/**
		 * @function
		 * @public
		 */
		removeFeature: function(feature) {
			this.featuresContainer.remove(feature);
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
		rendering: function() {
			this.render.redraw();
		},

		/**
		 * @function
		 * @public
		 */
		getFeatures: function() {
			return this.featuresContainer.features;
		}


	});



})(Csprite);