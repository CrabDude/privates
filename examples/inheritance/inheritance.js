var Person = Class.extend(function(pvtPerson) {
	var chromosomes = 48; // private static
	
	return {
		init: function(isDancing) {
			console.log("pvtPerson(this).invisible: \r\n >> ", pvtPerson(this).invisible); // => undefined
			console.log("pvtPerson(this).hasSword: \r\n >> ", pvtPerson(this).hasSword); // => undefined
			
			pvtPerson(this).dancing = isDancing;
			console.log("pvtPerson(this).dancing: \r\n >> ", pvtPerson(this).dancing); // => false
		},
		dance: function() {
			return pvtPerson(this).dancing;
		},
		getChromosomeCount: function() {
			return chromosomes;
		}
	};
});

var Ninja = Person.extend(function(pvtNinja) {
	return {
		init: function(hasSword){
			pvtNinja(this).invisible = true;
			this._super( false );
			pvtNinja(this).hasSword = hasSword || true;

			console.log("pvtNinja(this).dancing: \r\n >> ", pvtNinja(this).dancing); // => false
		},
		dance: function(){
			// Call the inherited version of dance()
			return this._super();
		},
		swingSword: function(){
			return pvtNinja(this).hasSword;
		}	
	};
});


var p = new Person(true);
console.log("p.dance(): \r\n >> ",p.dance()); // => true

var n = new Ninja();
console.log("n.dance(): \r\n >> ",n.dance()); // => false
console.log("n.swingSword(): \r\n >> ",n.swingSword()); // => true

// Should all be true
console.log("p instanceof Person && p instanceof Class && " +
	"n instanceof Ninja && n instanceof Person && n instanceof Class: \r\n >> ",
	p instanceof Person && p instanceof Class &&
	n instanceof Ninja && n instanceof Person && n instanceof Class);