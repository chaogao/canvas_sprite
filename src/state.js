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
		this.interval = 1000 / Csprite.Const.FPS;
		this.now = "";
		this.then = "";
		this.nextSetp = false;
		this.setp = 0;
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
			this.then = Date.now();
			this.nextSetp = false;
			this.draw(this.runnerStack[this.setp]);
			this.setp++;
		},

		/**
		 * @functin
		 * @private
		 * @param {Function} cb
		 */
		draw: function(cb) {
			var delta;

			if (this.nextSetp) {
				this.start();
				return;
			}

			this.now = Date.now();
			delta = this.now - this.then;
			requestAnimFrame(this.draw.bind(this, cb));
			if (delta > this.interval) {
				cb();
				this.then = this.now - (delta % this.interval);
			}
		},

		/**
		 * @function
		 */
		goNext: function() {
			this.nextSetp = true;
		}
	});

})(Csprite);