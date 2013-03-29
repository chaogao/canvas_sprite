(function() {
	/**
	 * @class
	 * @name Grid
	 * @param {dom} canvas
	 * @param {option} option
	 */
	Grid = function(canvas, option) {
		var width = canvas.width,
			height = canvas.height,
			tile = option.tile;

		this.canvas = canvas;
		this.cols = parseInt(width / tile.fWidth);
		this.rows = parseInt(height / tile.fHeight);

	}

	Grid.prototype.extend({
		draw: function() {
			
		}	


	});

})(Csprite.Feature);