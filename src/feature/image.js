(function(exports) {
	/**
	 * @class
	 * @contructor
	 */
	var Image = exports.Image = function(image, option) {
		var self = this,
			style = new Csprite.Style({
			width: image.width,
			height: image.height,
			position: {
				x: option.position.x,
				y: option.position.y
			}
		});

		Csprite.Feature.apply(this, [style]);

		if (typeof image == "string") {
			//only provide image src
			var img = new window.Image();
			img.onload = function() {
				self.image = img;
				self.style.width = img.width;
				self.style.height = img.height;
				self.emitEvent("loaded", [{target: self, image: img}]);
			}
			img.src = image;
		} else {
			this.image = image;
		}
	}

	Image.prototype = new Csprite.Feature();
	Image.prototype.contructor = Image;

	Csprite.extend(Image.prototype, {
		type: "Image"
	});

})(Csprite.Feature);