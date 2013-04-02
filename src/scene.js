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
        var self = this;

        this.sceneOpts = sceneOpts;
        this.canvasOpts = canvasOpts;
        this.loaderOpts = loaderOpts;

        this.container = document.getElementById(sceneOpts.container);
        this.layersContainer = new Csprite.LayersContainer(this);
        this.render = new Csprite.Render(this, canvasOpts);

        this.size = new Csprite.Helper.Size(canvasOpts);
        this.tile = new Csprite.Feature.Tile(sceneOpts.tile);
        this.grid = new Csprite.Feature.Grid(this.size, {
            tile: this.tile
        });

        this.generateLayers();

        this.loader = new Csprite.State.StateLoader(this.loaderOpts, this, this.loaderFinish.bind(this));
        this.render.start(this.loader);

        this.render.addListener("selectedfeature", this.selectedfeature.bind(this));
    }

    Scene.prototype = Object.clone(EventEmitter.prototype);

    Csprite.extend(Scene.prototype, {
        /**
         * @function
         * @private
         * @description generate three base layers in scene
         */
        generateLayers: function() {
            this.backgroundLayer = new Csprite.Layer({
                name: "base-backgroundLayer"
            });
            this.addLayer(this.backgroundLayer);


            this.mainLayer = new Csprite.Layer({
                name: "base-mainLayer"
            });
            this.addLayer(this.mainLayer);

            this.textLayer = new Csprite.Layer({
                name: "base-textLayer"
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
         * @param {Feature} feature
         */
        getLayer: function(name) {
            this.layersContainer.getByName(name);
        },

        /**
         * @function
         * @public
         */
        getFeature: function(id) {
            var layerIndex = parseInt(id / 10000),
                layer = this.layersContainer.layers[layerIndex];

            return layer.getFeature(id);
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
        },

        selectedfeature: function(e) {
            this.emitEvent("selectedfeature", [e]);
        }

    });
})(Csprite);