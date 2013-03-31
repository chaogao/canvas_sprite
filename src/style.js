(function(exports) {
	/**
	 * @class
	 * @contructor
	 */
	var Style = exports.Style = function(option) {
		this.merge(option);
	}

	/**
	 * @function
	 * @public
	 */
	Style.getBorder = function(str) {
		var tmp;

		if (typeof str != "string") {
			return str;
		}
		tmp = str.split(" ");
		return {
			borderWidth: tmp[0],
			borderStyle: tmp[1],
			borderColor: tmp[2]
		}
	};

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