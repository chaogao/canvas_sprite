(function(exports) {
	/**
	 * @class
	 * @name Grid
	 * @param {Size} size
	 * @param {option} option
	 */
	var Grid = exports.Grid = function(size, option) {
		var width = size.width,
			height = size.height,
			tile = option.tile;

		this.cols = parseInt(width / tile.fWidth);
		this.rows = parseInt(height / tile.fHeight);

	}

})(Csprite.Feature);