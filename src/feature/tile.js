(function(exports) {
	/**
	 * @class
	 * @constructor
	 * @name Tile
	 */	
	var Tile = exports.Tile = function(option) {
		this.width = option.width;
		this.height = option.height;
		this.paddingX = option.paddingX;
		this.paddingY = option.paddingY;
		this.fWidth = option.width + option.paddingX * 2;
		this.fHeight = option.height + option.paddingY * 2;
	}


})(Csprite.Feature);