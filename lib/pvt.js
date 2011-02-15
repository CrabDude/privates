/* Pvt.js - JavaScript Private Instance Members
 * By Adam Crabtree http://noderiety.com/
 * MIT Licensed.
 */

/**
* Generate a private member store
* @returns {function} The private member accessor function
*/
function Pvt() {
  // Lookup array for storing private member objects
  var store = [];

  /**
  * The private member accessor function
  * @param {object} The lookup object
  * @returns {object} The object's associated private member store
  */
  return function(obj) {
    // initialize the object's store
    if (typeof obj._pvt == 'undefined') {
      obj._pvt = store.push({})-1;
    }
    return store[obj._pvt];
  };
}
