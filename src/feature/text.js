(function(exports) {
	/**
	 * @class
	 * @contructor
	 */
	var Text = exports.Text = function(text, option) {
		var style = new Csprite.Style({
			backgroundColor: option.backgroundColor,
			font: option.font,
			textAlign: option.textAlign,
			border: Csprite.Style.getBorder(option.border),
			position: {
				x: option.position.x,
				y: option.position.y
			}
		});

		Csprite.Feature.apply(this, [style]);
		this.text = text;
	}

	Text.prototype = new Csprite.Feature();
	Text.prototype.contructor = Text;

	Csprite.extend(Text.prototype, {
		type: "Text"
	});

})(Csprite.Feature);