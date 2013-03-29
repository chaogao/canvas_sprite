(function(exports) {
	/**
	 * @class
	 * @contructor
	 */
	var Image = exports.Image = function(image, option) {
		var style = new Csprite.Style({
			width: image.width,
			height: image.height,
			position: {
				x: option.position.x,
				y: option.position.y
			}
		});

		Csprite.Feature.apply(this, [style]);
		this.image = image;
	}

	Image.prototype = new Csprite.Feature();
	Image.prototype.contructor = Image;

	Csprite.extend(Image.prototype, {
		type: "Image"
	});

})(Csprite.Feature);