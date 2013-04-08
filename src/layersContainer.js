(function(exports) {
    /**
     * @class
     * @constructor
     * @LayersContainer
     */
    var LayersContainer = exports.LayersContainer = function(scene) {
        this.layers = [];
        this.index = 0;
        this.scene = scene;
    }

    Csprite.extend(LayersContainer.prototype, {
        /**
         * @function
         * @public
         */
        addLayer: function(layer, index) {
            if (this.valid(layer)) {
                index = index || this.index++;
                layer.setIndex(index);
                this.layers.push(layer);
            }
        },

        /**
         * @function
         * @private
         */
        valid: function(layer) {
            return true;
        },

        /**
         * @function
         * @public
         */
        update: function() {
            var layers = this.getSortedLayers();

            layers.forEach(function(layer) {
                layer.update();
            });
        },

        /**
         * @function
         * @public
         */
        getSortedLayers: function() {
            var layers = this.layers;

            layers.sort(function(a, b) {
                return a.index - b.index;
            });
            return layers;             
        }

    });


})(Csprite);