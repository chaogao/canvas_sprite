(function(exports) {
	/**
	 * @class
	 * @constructor
	 * @param {object} loadOpts
	 * @param {Scene} scene
	 * @param {object} option
	 * @param {function} cb
	 */
	var StateLoader = exports.StateLoader = function(loaderOpts, scene, cb, option) {
		this.mode = StateLoader.Mode.ToLoad;
		this.loaderOpts = loaderOpts;
		
		this.load();

		Csprite.State.call(this, scene, option, cb);
		this.start();
	};

	StateLoader.Mode = {};
	StateLoader.Mode.ToLoad = 0;
	StateLoader.Mode.Loading = 1;
	StateLoader.Mode.Loaded = 2;


	StateLoader.prototype = new Csprite.State();
	StateLoader.prototype.constructor = StateLoader;


	Csprite.extend(StateLoader.prototype, {
		/**
		 * @function
		 * @private
		 */
		load: function() { 
			var self = this,
				loaderOpts = this.loaderOpts,
				resources = this.loaderOpts.resources;

			this.mode = StateLoader.Mode.Loading;
			resources.forEach(function(resource, index) {
				var img = new Image();
				img.onload = function () {
					self.onload({
						img: img,
						index: img.index
					});
				}
				img.src = resource.src;
				img.index = index;
			});
		},

		/**
		 * @function
		 * @private
		 */
		onload: function(result) {
			var imgF;

			imgF  = new Csprite.Feature.Image(result.img, {
				position: Csprite.Helper.calcPostion(this.scene, result.index)
			});
			imgF.addAnimation(new Csprite.Animation.Opacity());
			this.scene.addFeature(imgF);
		},

		/**
		 * @function
		 * @private
		 */
		run: function() {
			this.scene.update();
			this.scene.rendering();
			requestAnimFrame(this.run.bind(this));
		}


	});

})(Csprite.State);