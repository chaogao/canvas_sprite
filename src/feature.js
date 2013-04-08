(function(exports) {
	/**
	 * @namespace
	 * @name Feature
	 */
	var Feature = exports.Feature = function(style, option) {
		this.style = style;
		this.animations = [];
	};

	Feature.prototype = Object.clone(EventEmitter.prototype);

	Csprite.extend(Feature.prototype, {
		/**
		 * @function
		 * @public
		 */
		update: function() {
			var self = this,
				animations = this.animations;
			animations.forEach(function(animation) {
				if (animation.mode != Csprite.Animation.Mode.End) {
					animation.next();
					self.applyAnimation(animation);
				} else {
					self.removeAnimation(animation);
				}
			});
		},

		/**
		 * @function
		 * @public
		 */
		addAnimation: function(animation) {
			this.animations.push(animation);
		},

		/**
		 * @function
		 * @public
		 */
		removeAnimation: function(animation) {
			var index = this.animations.indexOf(animation);
			if (index >= 0) {
				this.animations.splice(index, 1);
			}
		},

		/**
		 * @function
		 * @private
		 */
		applyAnimation: function(animation) {
			var tmpStyle = animation.getStyle();
			this.style.merge(tmpStyle);
		}


	});


})(Csprite);