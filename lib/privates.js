var Person = (function() {
	function privates(obj) {
		return store[obj._id];
	}
	
	var chromosomes = 48, // private static 
		store = []; // private store for instances
	
	var Self = function(isDancing) {
		var privates = {};
		this._id = privateStore.push(privates)-1;
		
		privates.dancing = isDancing;
	};
	
	Self.prototype = {
		dance: function(){
			return privates(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
	return Self;
})();

var p = new Person(true);
p.dance(); // => true
p.getChromosomeCount; // => 48
Person.getChromosomeCount; // => 48
p.dancing; // undefined
p.chromosomes; // undefined



Class.pvt = function() {
	var store;
	return function(obj) {
		return store[obj._id]._self === obj ? store[obj._id] : null;	
	};
};

// OPTION 1

var Person = Class.extend(function(pvt) {
	var chromosomes = 48; // private static
	
	return {
		init: function(isDancing) {
			pvt(this).dancing = isDancing;
		},
		dance: function() {
			return pvt(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
});

var Ninja = Person.extend(function(pvt) {
	return {
		init: function(hasSword){
			this._super( false );
			pvt(this).hasSword = hasSword || true;
		},
		dance: function(){
			// Call the inherited version of dance()
			return this._super();
		},
		swingSword: function(){
			return pvt(this).hasSword;
		}	
	};
});


//OPTION 2

var Person = Class.extend((function() {
	var chromosomes = 48, // private static
		pvt = Class.pvt(); // generate private instance store

	return {
		init: function(isDancing) {
			pvt(this).dancing = isDancing;
		},
		dance: function() {
			return pvt(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
})());

var Ninja = Person.extend((function() {
	var pvt = Class.pvt();
	
	return {
		init: function(hasSword){
			this._super( false );
			pvt(this).hasSword = hasSword || true;
		},
		dance: function(){
			// Call the inherited version of dance()
			return this._super();
		},
		swingSword: function(){
			return pvt(this).hasSword;
		}	
	};
})());

var p = new Person(true);
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

// Should all be true
p instanceof Person && p instanceof Class &&
n instanceof Ninja && n instanceof Person && n instanceof Class
















/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Class = function(){};
	Class.pvt = function() {
		var store = [];
		return function(obj) {
			if (typeof obj._id == 'undefined')
				obj._id = store.push({_self : obj})-1;
			return store[obj._id]._self === obj ? store[obj._id] : null;	
		};
	};
	
	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		if (typeof prop == 'function') {
			prop = prop(Class.pvt());
		}
		var _super = this.prototype;
		
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
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
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


var Person = Class.extend((function(pvt) {
	var chromosomes = 48; // private static
	
	return {
		init: function(isDancing) {
			pvt(this).dancing = isDancing;
		},
		dance: function() {
			return pvt(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
})());


var Person = Class.extend((function() {
	var chromosomes = 48, // private static
		pvt = Class.pvt(); // generate private instance store

	return {
		init: function(isDancing) {
			pvt(this).dancing = isDancing;
		},
		dance: function() {
			return pvt(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
})());

var Ninja = Person.extend((function() {
	var pvt = Class.pvt();
	
	return {
		init: function(hasSword){
			this._super( false );
			pvt(this).hasSword = hasSword || true;
		},
		dance: function(){
			// Call the inherited version of dance()
			return this._super();
		},
		swingSword: function(){
			return pvt(this).hasSword;
		}	
	};
})());
