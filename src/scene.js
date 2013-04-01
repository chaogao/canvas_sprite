/**
 * @require core 
 */
(function(exports) {
    /**
     * @class
     * @constructor
     * @name Csprite.Scene
     * @param {object} sceneOpts
     * @param {string} senceOpts.container
     * @param {object} senceOpts.tile
     * @param {int} senceOpts.title.width
     * @param {int} senceOpts.title.height
     * @param {int} senceOpts.title.paddingX
     * @param {int} senceOpts.title.paddingY
     * @param {object} canvasOpts canvas options
     * @param {int} canvasOpts.width
     * @param {int} canvasOpts.height
     * @param {object} loaderOpts options for load resources
     */
    var Scene = exports.Scene = function(sceneOpts, canvasOpts, loaderOpts) {
        this.sceneOpts = sceneOpts;
        this.canvasOpts = canvasOpts;
        this.loaderOpts = loaderOpts;

        this.container = document.getElementById(sceneOpts.container);
        this.layersContainer = new Csprite.LayersContainer(this);
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.render = new Csprite.Render(this);

        this.size = new Csprite.Helper.Size(canvasOpts);
        this.tile = new Csprite.Feature.Tile(sceneOpts.tile);
        this.grid = new Csprite.Feature.Grid(this.size, {
            tile: this.tile
        });

        this.generateLayers();
        this.loader = new Csprite.State.StateLoader(this.loaderOpts, this, this.loaderFinish.bind(this));

        this.render.start(this.loader);
    }

    Csprite.extend(Scene.prototype, {
        /**
         * @function
         * @private
         */
        createCanvas: function() {
            var canvas = document.createElement("canvas");

            canvas.width = this.canvasOpts.width;
            canvas.height = this.canvasOpts.height;
            this.container.appendChild(canvas);
            return canvas;
        },

        /**
         * @function
         * @private
         * @description generate three base layers in scene
         */
        generateLayers: function() {
            var canvasOpts = this.canvasOpts;

            this.backgroundLayer = new Csprite.Layer({
                name: "base-backgroundLayer",
                canvasOpts: canvasOpts
            });
            this.addLayer(this.backgroundLayer);


            this.mainLayer = new Csprite.Layer({
                name: "base-mainLayer",
                canvasOpts: canvasOpts
            });
            this.addLayer(this.mainLayer);

            this.textLayer = new Csprite.Layer({
                name: "base-textLayer",
                canvasOpts: canvasOpts
            });
            this.addLayer(this.textLayer);
        },

        /**
         * @function
         * @public
         * @param {Layer} layer
         */
        addLayer: function(layer) {
            this.layersContainer.addLayer(layer);
        },

        /**
         * @function
         * @public
         * @param {String} name
         */
        getLayer: function(name) {
            this.layersContainer.getByName(name);
        },

        /**
         * @function
         * @public
         */
        loaderFinish: function() {
            console.log("loaderFinish");
        },

        /**
         * @function
         * @public
         */
        update: function() {
            this.layersContainer.update();
        },

        /**
         * @function
         * @public
         */
        getLayers: function() {
            return this.layersContainer.getSortedLayers();
        }

    });
})(Csprite);