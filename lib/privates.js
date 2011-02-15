/* Privates.js - Simple JavaScript Inheritance With Inheritable Private Variables
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
  var n = -1,
    privates = [],
    initializing = false,
  	fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  
  // The base Class implementation (does nothing)
  this.Class = function(){};

  /**
  * Create a new private store
  * 
  * @param {object} The super class to get the super class' private store
  * @returns {function} The private variable store accessor function
  */
  function Pvt(_super) {
    var key = '_pvt'+(++n),
      store = [];

    /**
    * Returns the private variable store associated with obj
    * 
    * @param {object} The lookup object
    * @returns {object} The object's associated private variable store
    */
    function pvt(obj) {
      // initialize a private object for a Class instance
      if (typeof obj[key] == 'undefined') {
        // extended privates inherits from _super privates
        var _superPvt = (typeof privates[_super._pvt] == 'function' &&
          privates[_super._pvt](obj)) || null;
            
        obj[key] = store.push(Object.create(_superPvt))-1;
      }

      return store[obj[key]];
    }

    _super = _super || {};
    // Associate the class with its accessor for private inheritance
    this._pvt = privates.push(pvt)-1;
  
    return pvt;
  }

  /**
  * Create a new Class that inherits from this class
  * 
  * @param {object|function} The new Class properties w/ optional init function
  *   Or, a function that returns the above for private variables
  * @returns {object} The object's associated private variable store
  */
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

// Used to allow private variable stores to inherit from each other
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}