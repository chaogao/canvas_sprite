(function(exports) {
	/**
	 * @class
	 * @contructor
	 */
	var Style = exports.Style = function(option) {
		this.merge(option);
	}

	Csprite.extend(Style.prototype, {
		/**
		 * @function
		 * @public
		 */
		merge: function(option) {
			for (var key in option) {
				this.addStyle(key, option[key]);
			}
		},

		/**
		 * @function
		 * @public
		 */
		addStyle: function(name, value) {
			if (this.valid(name, value)) {
				this[name] = value;
			}
		},

		/**
		 * @function
		 * @private
		 */
		valid: function(name, value) {
			return true;
		}

	})

})(Csprite);