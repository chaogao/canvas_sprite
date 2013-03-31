(function(exports) {
	/**
	 * @class
	 * @constructor
	 * @name State
	 * @param {Scene} scene
	 * @param {object} option
	 * @param {function} option.setup
	 * @param {function} option.run
	 * @param {function} option.end
	 */
	var State = exports.State = function(scene, option, cb) {
		var self = this;

		this.scene = scene;
		this.cb = cb;
		Csprite.extend(this, option);

		this.runnerStack = [];
		// push runner in stack if exsite
		[this.setup, this.run, this.end].forEach(function(runner) {
			if (runner) {
				self.runnerStack.push(runner.bind(self));
			}
		});
	}

	Csprite.extend(State.prototype, {
		/**
		 * @function
		 * @public
		 */
		start: function() {
			var self = this,
				index = 0,
				next;

			next = function() {
				index++;
				self.runnerStack[index](next);
			};

			this.runnerStack[index](next);
		}
	});

})(Csprite);