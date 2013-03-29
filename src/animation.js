(function(exports) {
	/**
	 * @class
	 * @constructor
	 */
	var Animation = exports.Animation =function() {
		this.mode = Animation.Mode.Run;
	};

	Animation.Mode = {};
	Animation.Mode.Run = 0;
	Animation.Mode.Stop = 1;


	Csprite.extend(Animation.prototype, {
		/**
		 * @function
		 * @private
		 */
		end: function() {
			this.mode = Animation.Mode.Stop;
		}
	});

})(Csprite);