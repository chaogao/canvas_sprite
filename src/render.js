(function(exports) {
    /**
    * @class
    * @constructor
    */
    var Render = exports.Render = function(scene) {
        this.scene = scene;
        this.canvas = this.scene.canvas;
        this.context = this.scene.context;
        this.state = "";

        this.interval = 1000 / Csprite.Const.FPS;
        this.now = "";
        this.then = Date.now();
        this.loop();
    }


    Render.Const = {};
    Render.Const.Stroke = 1;
    Render.Const.Fill = 2;
    Render.Const.Reset = 3;


    Csprite.extend(Render.prototype, {
        /**
         * @function
         * @start
         * @param {State} 继承自 State 的实例，用于开始一个新的state
         */
        start: function(state) {
            state.next();
        },

        /**
         * @function
         * @private
         */
        setDrawCb: function(cb) {
            this.cb = cb;
        },

        /**
         * @function
         * @private
         * @description 场景的主轮训渲染，如果有 this.cb 则满足渲染条件时会执行
         * loop 并不知道自己处于哪个 state ，只会进行场景的更新、执行 this.cb，最后重绘
         */
        loop: function() {
            var state = this.state,
                cb = this.cb,
                delta;

            this.now = Date.now();
            delta = this.now - this.then;
            requestAnimFrame(this.loop.bind(this, cb));

            if (delta > this.interval || (cb && !cb.excuted)) {
                this.scene.update();
                if (cb) {
                    cb();
                    cb.excuted = true;
                }
                this.redraw();
                this.then = this.now - (delta % this.interval);
            }
        },

        /**
         * @function
         * @public
         */
        redraw: function() {
            var self = this,
                layers = this.scene.getLayers();

            this.reset();

            layers.forEach(function(layer) {
                self.redrawLayer(layer);
            });
        },

        /**
         * @function
         * @private
         */
        redrawLayer: function(layer) {
            var self = this,
                features = layer.getFeatures();

            features.forEach(function(feature) {
                self.drawFeature(feature);
            });
        },

        /**
         * @function
         * @private
         */
        reset: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        /**
         * @function
         * @private
         */
        setStyle: function(style, type) {
            this.context.globalAlpha = style['opacity'];

            if (type == Csprite.Render.Const.Stroke && style['border']) {
                this.context.lineWidth = style['border']['borderWidth'];
                this.context.strokeStyle = style['border']['borderColor'];
            } 
            if (type == Csprite.Render.Const.Fill) {
                this.context.fillStyle = style['backgroundColor'];
            }
            if (type == Csprite.Render.Const.Reset) {
                this.context.globalAlpha = 1;
                this.context.lineWidth = 1;
            }

            if (style['font']) {
                this.context.font = style['font'];
            }
            if (style['textAlign']) {
                this.context.textAlign = style['textAlign'];
            }
        },

        /**
         * @function
         * @private
         */
        drawFeature: function(feature) {
            switch (feature.type) {
                case "Image":
                    this.drawFeatureImage(feature);
                    break;
                case "Text":
                    this.drawFeatureText(feature);
                    break;
            }
        },

        /**
         * @function
         * @private drawFeatureImage
         */
        drawFeatureImage: function(feature) {
            var self = this,
                style = feature.style,
                img;

            if (feature.image) {
                img = feature.image;
                imageLoad();
            } else {
                img = new Image();
                img.onload = imageLoad;
                img.src = feature.imageSrc;   
            }

            function imageLoad() {
                var width = style.width || img.width,
                    height = style.height || img.height;

                self.setStyle(style);
                self.context.drawImage(img, style.position.x, style.position.y, width, height);
                self.setStyle(Csprite.Render.Const.Reset);
            }
        },

        /**
         * @function
         * @private
         */
        drawFeatureText: function(feature) {
            var text = feature.text,
                style = feature.style;

            this.setStyle(style, Csprite.Render.Const.Fill);
            this.context.fillText(text, style.position.x, style.position.y);
            if (style.border) {
                this.setStyle(style, Csprite.Render.Const.Stroke);
                this.context.strokeText(text, style.position.x, style.position.y);
            }
            this.setStyle(Csprite.Render.Const.Reset);
        }

   });

})(Csprite);