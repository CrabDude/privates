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


var p = new Person(true);
console.log(p.dance()); // => true

var n = new Ninja();
console.log(n.dance()); // => false
console.log(n.swingSword()); // => true

// Should all be true
console.log(p instanceof Person && p instanceof Class &&
n instanceof Ninja && n instanceof Person && n instanceof Class);