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
        this.loadedCount = 0;
    
        Csprite.State.call(this, scene, option, cb);
        this.loading = new Csprite.Feature.Text("Loading", {
            backgroundColor: "red",
            textAlign: "center",
            font: "48pt Helvetica",
            border: "2px solid black",
            position: Csprite.Helper.centerPosition(this.scene)
        });
        this.flashLoader = document.getElementById("swfloader");
        //注册flash的回调函数
        this.registeCb(this.imageLoaded);
        this.load();
    };

    window.Imageloaded = function(data, index) {
        if (window._imageLoaded) {
            window._imageLoaded(data, index);
        }
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
                loaderOpts = this.loaderOpts,
                resources = this.loaderOpts.resources;

            this.mode = StateLoader.Mode.Loading;

            resources.forEach(function(resource, index) {
                self.flashLoader.getImage(resource.src, index);
            });
        },

        /**
         * @function
         * @private
         */
        registeCb: function(cb, obj) {
            obj = obj || this;
            window._imageLoaded = cb.bind(obj);
        },

        /**
         * @function
         * @private
         * @description flash 远程获取 base64 图片编码后的回调函数
         */
        imageLoaded: function(data, index) {
            var img = new Image();
            
            img.src = ['data:image/png;base64', data].join(",");
            this.onload({
                img: img,
                index: index
            });
            this.loadedCount++;
            if (this.loadedCount == (this.loaderOpts.resources.length)) {
                this.mode = StateLoader.Mode.Loaded;
            }
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
            this.scene.mainLayer.addFeature(imgF);
            this.loading.text = "Loading(" + this.loadedCount + "/" + this.loaderOpts.resources.length + ")";
        },

        /**
         * @function
         * @private
         */
        setup: function() {
        	this.scene.textLayer.addFeature(this.loading);
        	this.next();
        },

        /**
         * @function
         * @private
         */
        run: function() {
            if (this.mode == StateLoader.Mode.Loaded && this.loading) {
                this.scene.textLayer.removeFeature(this.loading);
            	delete this["loading"];
                this.next();
            }
        },

        /**
         * @function
         * @private
         */
        end: function() {
            this.emitEvent('end');
            this.next();
        }

    });

})(Csprite.State);