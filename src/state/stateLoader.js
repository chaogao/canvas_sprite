(function(exports) {
    /**
     * @class
     * @constructor
     * @param {object} loadOpts
     * @param {Scene} scene
     * @param {object} option
     * @param {function} cb
     */
    var StateLoader = exports.StateLoader = function(loaderOpts, scene, cb, option) {
        this.mode = StateLoader.Mode.ToLoad;
        this.loaderOpts = loaderOpts;
        
        Csprite.State.call(this, scene, option, cb);
        
        this.load();
        this.start();
    };

    StateLoader.Mode = {};
    StateLoader.Mode.ToLoad = 0;
    StateLoader.Mode.Loading = 1;
    StateLoader.Mode.Loaded = 2;


    StateLoader.prototype = new Csprite.State();
    StateLoader.prototype.constructor = StateLoader;


    Csprite.extend(StateLoader.prototype, {
        /**
         * @function
         * @private
         */
        load: function() { 
            var self = this,
            	loadedCount = 0,
                loaderOpts = this.loaderOpts,
                resources = this.loaderOpts.resources;

            this.mode = StateLoader.Mode.Loading;

            resources.forEach(function(resource, index) {
                var img = new Image();
                img.onload = function () {
                    self.onload({
                        img: img,
                        index: img.index
                    });
                    loadedCount++;
                    if (loadedCount == (resources.length - 1)) {
                    	self.mode = StateLoader.Mode.Loaded;
                    }
                }
                img.src = resource.src;
                img.index = index;
            });
        },

        /**
         * @function
         * @private
         */
        onload: function(result) {
            var imgF;

            imgF  = new Csprite.Feature.Image(result.img, {
                position: Csprite.Helper.calcPostion(this.scene, result.index)
            });
            imgF.addAnimation(new Csprite.Animation.Opacity());
            this.scene.addFeature(imgF);
        },

        /**
         * @function
         * @private
         */
        setup: function(next) {
        	this.loading = new Csprite.Feature.Text("Loading......", {
        		backgroundColor: "red",
        		textAlign: "center",
        		font: "48pt Helvetica",
        		border: "2px solid black",
        		position: Csprite.Helper.centerPosition(this.scene)
        	});
        	this.scene.addFeature(this.loading);
        	next();
        },

        /**
         * @function
         * @private
         */
        run: function(next) {
            this.scene.update();
            this.scene.rendering();
            if (this.mode == StateLoader.Mode.Loaded && this.loading) {
            	this.scene.removeFeature(this.loading);
            	delete this["loading"];
            }
            requestAnimFrame(this.run.bind(this, next));
        },

        /**
         * @function
         * @private
         */
        end: function() {
        	this.cb();
        }

    });

})(Csprite.State);