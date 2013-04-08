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

    State.prototype = Object.clone(EventEmitter.prototype);

    Csprite.extend(State.prototype, {
        /**
         * @function
         */
        next: function() {
            var render = this.scene.render;

            if (this.runnerStack[this.setp]) {
                render.setDrawCb(this.runnerStack[this.setp]);                
                this.setp++;
            } else {
                render.setDrawCb();
                this.cb();
            }
        }
    });

})(Csprite);