/*
 * Private.js Example: Inheritable Private non-Static Member Scoping
 * 
 * Passing Class.extend a function the returns an object
 *   will be invoked with the private variable accessor function 
 * 
 */
var Person = Class.extend(function(pvtPerson) {
  var chromosomes = 48; // private static
  
  return {
    init: function(isDancing) {
      // pvtPerson(this).invisible === undefined
      // pvtPerson(this).hasSword === undefined
      
      pvtPerson(this).dancing = isDancing;
      // pvtPerson(this).dancing === isDancing
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

      // pvtNinja(this).dancing === false
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
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

// Should all be true
p instanceof Person && p instanceof Class &&
  n instanceof Ninja && n instanceof Person && n instanceof Class;