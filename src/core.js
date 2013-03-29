(function() {
	// requestAnim shim layer by Paul Irish
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          window.oRequestAnimationFrame      ||
	          window.msRequestAnimationFrame     ||
	          function(/* function */ callback, /* DOMElement */ element){
	            window.setTimeout(callback, 16.666);
	          };
	})();

	/**
	 * @namespace
	 * @name Csprite 
	 * @description namespace for Csprite
	 */
	Csprite = function() {


	};

	Csprite.Const = {
		FPS: 60
	};

	/**
	 * @function
	 * @public
	 */
	Csprite.extend = function(obj, properties, ov) {
		var filter = null;
		if (typeof ov == 'function') {
			filter = ov;
		} else if (ov === true || typeof ov === 'undefined') {
		} else {
			filter = defaultFilter;
		}
		for (var property in properties) {
			if (filter && !filter(property, obj, properties)) {
				continue;
			}
			try {
	            obj[property] = properties[property];
	        } catch (e) {}
		}
		
		if (properties && properties.hasOwnProperty('call') && (!filter || filter(obj, properties, 'call'))) {
			obj.call = properties.call;
		}

		return obj;		
	}

	/**
	 * @name Csprite.version
	 * @const
	 */
	Csprite.extend(Csprite, {
		version: '0.1.0',
		author: 'chao.gao',
	});
})();