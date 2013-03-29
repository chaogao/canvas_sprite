(function(exports) {
	/**
	 * @namespace
	 */
	var Helper = exports.Helper = function() {

	}

	/**
	 * @function
	 * @public
	 */
	Helper.calcPostion = function(scene, index) {
		var tile = scene.tile,
			row = parseInt(index / scene.grid.cols),
			col = index - (row * scene.grid.cols),
			x, y;

		x = col * tile.fWidth + tile.paddingX;
		y = row * tile.fHeight + tile.paddingY;
		return {
			x: x,
			y: y
		}
	}

})(Csprite);