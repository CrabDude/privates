/*
 * Basic Example showing how to create true private variables
 * 
 * Other examples such as Crockford's, http://www.crockford.com/javascript/private.html,
 * initialize functions in the constructor, which is bad for performance. 
 * 
 */
var Person = (function() {
	// create a lookup function for easy private retrieval 
	function pvt(obj) {
		if (typeof obj._pkg == 'undefined')
			obj._pkg = store.push({_self : obj})-1;
		
		// ensure obj === the original obj and not just an === ._pkg value 
		return store[obj._pkg]._self === obj ? store[obj._pkg] : null;
	}
	
	// create a closure variable to store privates in
	var store = []; // private store for instances;
	
	

	var chromosomes = 48; // private static variable 
	
	// create functions in the same prototypical/classical manner
	var Self = function(isDancing) {
		pvt(this).dancing = isDancing;
	};
	
	Self.prototype = {
		// access the private variable in a public method
		dance: function(){
			return pvt(this).dancing;
		},
		// access the the private static variable in a public method
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
	return Self;
})();

// Check to see if private variables are in fact private
var p = new Person(true);
p.dance(); // => true
p.getChromosomeCount; // => 48
Person.getChromosomeCount; // => 48
p.dancing; // undefined
p.chromosomes; // undefined
