/* Simple JavaScript Inheritance With Private Variables
 * By Adam Crabtree http://noderiety.com/
 * MIT Licensed.
 * 
 * Forked from:
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * http://ejohn.org/blog/simple-javascript-inheritance/
 * Inspired by base2 and Prototype
 */
(function(){
	var n=-1, m=-1, privates = [], initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Class = function(){};

	function Pvt(_super) {
		_super = _super || {};
		
		// create a store per class declaration
		var key = '_pvt'+(++n),
			store = [],
			pvt = function(obj) {
				// initialize a private object for a Class instance
				if (typeof obj[key] == 'undefined') {
					// extended privates inherits from _super privates
					var _superPvt = (typeof privates[_super._pvt] == 'function' && privates[_super._pvt](obj)) || null,
						pvtValue = Object.create(_superPvt);
					
					pvtValue._self = obj;
					
					obj[key] = store.push(pvtValue)-1;
				}
				
				return store[obj[key]]._self === obj ? store[obj[key]] : null;	
			};
			
		this._pvt = privates.push(pvt)-1;
	
		return pvt;
	}
	
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var self = this,
			_super = this.prototype;
		
		// if they pass a function generate and pass a new pvt function 
		if (typeof prop == 'function') {
			// this === parent class, Class === extended class
			prop = prop(Pvt.call(Class,this));
		}
		
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" && 
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
						
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
						
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);				
						this._super = tmp;
						
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init ) {
				// create new store
				this.init.apply(this, arguments);
			}
		}
		
		// Populate our constructed prototype object
		Class.prototype = prototype;
		
		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();