(function(exports) {
	/**
	 * @class
	 * @constructor
	 */
	var Opacity = exports.Opacity = function(feature, option) {
		this.option = Csprite.extend(Object.clone(Csprite.Animation.Opacity.Option), option);
		this.currentOpacity = this.option.from;
		this.opacityDifference = this.option.to - this.option.from;

		Csprite.Animation.apply(this);
	};


	Opacity.prototype = new Csprite.Animation();
	Opacity.prototype.constructor = Opacity;

	Opacity.Option = {
		from: 0,
		to: 1,
		duration: 1
	};

	Csprite.extend(Opacity.prototype, {
		/**
		 * @function
		 * @public
		 */
		next: function(fps) {
			var differ;

			fps = fps || Csprite.Const.FPS;

			if (!this.differ || !this.lastFps || (this.lastFps != fps)) {
				this.differ = this.opacityDifference / (this.option.duration * fps);
			}
			this.currentOpacity = this.currentOpacity + this.differ;
			this.lastFps = fps;
			this.checkEnd();
		},

		/**
		 * @function
		 * @public
		 */
		getStyle: function() {
			return new Csprite.Style({
				opacity: this.currentOpacity
			});
		},

		/**
		 * @function
		 * @public
		 */
		checkEnd: function() {
			if (this.differ > 0 && this.currentOpacity >= this.option.to) {
				this.currentOpacity = this.option.to;
				this.mode = Csprite.Animation.Mode.End;
				return;
			}
			if (this.differ < 0 && this.currentOpacity <= this.option.to) {
				this.currentOpacity = this.option.to;
				this.mode = Csprite.Animation.Mode.End;
				return;
			}
		}
	})

})(Csprite.Animation);