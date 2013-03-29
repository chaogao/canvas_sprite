/**
 * @require core 
 */
(function() {
	/**
	 * @class
	 * @constructor
	 * @name Csprite.Scene
	 * @param {object} sceneOpts scene options
	 * @param {object} option.tile
	 * @param {int} option.title.width
	 * @param {int} option.title.height
	 * @param {int} option.title.marginX
	 * @param {int} option.title.marginY
	 * @param {object} canvasOpts canvas options
	 * @param {int} canvasOpts.width
	 * @param {int} canvasOpts.height
	 * @param {object} loaderOpts options for load resources
	 */
	Scene = function(sceneOpts, canvasOpts, loaderOpts) {
		this.sceneOpts = sceneOpts;
		this.canvasOpts = canvasOpts;
		this.loaderOpts = loaderOpts;
		this.features = [];

		this.container = document.getElementById(sceneOpts.container);
		this.size = new Csprite.Helper.Size(canvasOpts);
		this.canvas = this.createCanvas();

		this.initScene();
	}

	Scene.prototype.extend({
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
			this.grid = new Csprite.Feature.Grid(this.canvas, this.tile);
			this.loader = new Csprite.Loader(loaderOpts, this.resourceLoaded);
		},

		/**
		 * @function
		 * @public
		 * @param {object} result
		 */
		resourceLoaded: function(result) {
			var imgF;
			imgF  = new Csprite.Feature.Image(result.img, 
				{
					position: Csprite.Helper.calcPostion(this, {num: result.num})
				});
			imgF.addAnimation(new Csprite.Animation.Opacity);
			this.addFeature(imgF);
		},

		/**
		 * @function
		 * @public
		 * @param {object} img
		 * @param {object} option
		 */
		fillImage: function(img, option) {


		}






	});



})(Csprite);