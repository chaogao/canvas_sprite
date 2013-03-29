(function(exports) {
	/**
	 * @class
	 * @constructor
	 */
	var Render = exports.Render = function(scene) {
		this.scene = scene;
		this.canvas = scene.canvas;
		this.context = scene.canvas.getContext("2d");
	}


	Render.Const = {};
	Render.Const.Stroke = 1;
	Render.Const.Fill = 2;
	Render.Const.Reset = 3;


	Csprite.extend(Render.prototype, {
		/**
		 * @function
		 */
		redraw: function() {
			var self = this,
				features = this.scene.getFeatures();

			features.forEach(function(feature) {
				self.drawFeature(feature);
			});
		},

		/**
		 * @function
		 * @private
		 */
		setStyle: function(style, type) {
			if (type == Csprite.Render.Const.Stroke) {
		        this.context.lineWidth = style['borderWidth'];
    	        this.context.strokeStyle = style['borderColor'];
			} 
			if (type == Csprite.Render.Const.Fill) {
				this.context.fillStyle = style['backgroundColor'];
			}
			this.context.globalAlpha = style['opacity'];
			if (type == Csprite.Render.Const.Reset) {
				this.context.globalAlpha = 1;
				this.context.lineWidth = 1;
			}
		},

		/**
		 * @function
		 * @private
		 */
		drawFeature: function(feature) {
			switch (feature.type) {
				case "Image":
					this.drawFeatureImage(feature);
					break;
			}
		},

		/**
		 * @function
		 * @private drawFeatureImage
		 */
		drawFeatureImage: function(feature) {
			var self = this,
				style = feature.style,
				img;

			if (feature.image) {
				img = feature.image;
				imageLoad();
			} else {
				img = new Image();
				img.onload = imageLoad;
				img.src = feature.imageSrc;	
			}
			
			function imageLoad() {
				var width = style.width || img.width,
					height = style.height || img.height;

				self.setStyle(style);
				self.context.drawImage(img, style.position.x, style.position.y, width, height);
				self.setStyle(Csprite.Render.Const.Reset);
			}
		}

	});

})(Csprite);