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

	/**
	 * @function
	 * @public
	 */
	Csprite.init = function() {
		var element = document.createElement("div");
		element.id = "swfloader";
		document.body.appendChild(element);
		swfobject.embedSWF(Csprite.Const.flashUrl, "swfloader", "1", "1", "11.1.0");
	};

	Csprite.Const = {
		FPS: 24,
		flashUrl: '../build/convertBase64.swf'
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

	Csprite.init();
})();