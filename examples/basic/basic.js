// Utilize a closure to keep the private members private
var Person = (function() {

  // Generate a private instance member accessor function "pvt"
  var pvt = Pvt(),

    // private static variable 
    species = "Homo sapiens";
  
  var Self = function(isDancing) {
    // set private instance member
    pvt(this).dancing = isDancing;
  };
  
  Self.prototype = {

    // public methods
    dance: function(){
      // get private instance member
      return pvt(this).dancing;
    },
    quitDancing: function() {
      // set private instance member
      pvt(this).dancing = false;
    },
    getSpecies: function() {
      // get private static member
      return species;
    },
    setSpecies: function(newSpecies) {
      // set private static member
      species = newSpecies;
    }
  };
  return Self;
  
})();

var p = new Person(true);

// Check public member access to private members
p.dance(); // => true
p.quitDancing(); p.dance(); // => false

p.getSpecies(); // => "Homo sapipens"
p.setSpecies("Ninjus Invisibus"); p.getSpecies(); // => "Ninjus Invisibus"

// Check to see if private members are in fact private
typeof Person.species == 'undefined'; // => true
typeof Person.dancing == 'undefined'; // => true
typeof p.dancing == 'undefined'; // => true
typeof p.species == 'undefined'; // => true
