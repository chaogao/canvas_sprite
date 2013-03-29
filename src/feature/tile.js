(function() {
	/**
	 * @class
	 * @constructor
	 * @name Tile
	 */	
	Tile = function(option) {
		this.width = option.width;
		this.height = option.height;
		this.marginX = option.marginX;
		this.marginY = option.marginY;
		this.fWidth = option.width + option.marginX * 2;
		this.fHeight = option.height + option.marginY * 2;
	}


})(Csprite.Feature);