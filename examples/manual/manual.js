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
n instanceof Ninja && n instanceof Person && n instanceof Class;
