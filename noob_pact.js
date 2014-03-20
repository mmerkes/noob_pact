/*
  Thanks for DailyJS for the general idea on how to build a Pact
  http://dailyjs.com/2011/06/09/framework-66/

  Thanks to Underscore.js, which I used to nab code to make this
  browser and Node friendly, comments are mostly verbatim
*/

(function() {
  "use strict";

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Create the Pact object
  function Pact() {};

  // Current version
  Pact.VERSION = '0.1.0';

  // Export the Pact object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `Pact` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Pact;
    }
    exports.Pact = Pact;
  } else {
    root.Pact = Pact;
  }

  // Create a queue to store callbacks sent into the promise
  // to be use in a 'first in first out' (FIFO) order. This
  // will be emptied once the promise is completed.
  var queue = [];

  // Internal function to process the callbacks stored in
  // the queue once the promise is either resolved or rejected.
  // It takes two arguments: the status, which will either be
  // fulfilled or rejected, and a value, which will be the 
  // value if the promise was resolved, or reason if the promise was rejected.
  var _completePromise = function( status, value ) {
    // Create a temporary variable to store the callback
    // object to check for the status and always callbacks.
    var action;

    // Create a loop to run through the queue until it's empty.
    while( queue[0] ) {
      // Remove the first element of the queue to test for 
      // a callback that needs to be executed.
      action = queue.shift();

      // See if the callback object has a key that matches
      // the status passed in
      if( action[status] ) {
        // If a match was found, execute the callback and
        // pass in the value
        action[status](value);
      }

      // See if the callback object has an always key
      if( action.always ) {
        // If so, execute the always callback
        action.always(value);
      }
    }
  };

  // resolve takes one argument, a value, and should be
  // called on success.
  Pact.prototype.resolve = function(value) {
    // Call the _completePromise function and pass in value
    // to complete the promise and fire any relevant callbacks.
    // Also, let it know that it should only fire fulfilled callbacks.
    _completePromise( 'fulfilled', value );
  };

  // reject takes one argument, a reason, and should be called
  // on failure.
  Pact.prototype.reject = function(reason) {
    // Call the _completePromise function and pass in reason
    // to complete the promise and fire any relevant callback.
    // Also, let it know that it should only fire rejected callbacks.
    _completePromise( 'rejected', reason );
  };

  // then is the core method of the promise, and takes three arguments:
  // a callback for onFulfilled, a callback for onRejected, and a callback
  // for always. If any of the arguments are left blank, undefined will
  // be passed in as the value in the object, which will be ignored when
  // the promise is completed.
  Pact.prototype.then = function( onFulfilled, onRejected, always ) {
    // Create a callback object and push it to the queue. Set the keys to
    // fulfilled, rejected and always, and the values to relevant arguments
    queue.push( {
      fulfilled: onFulfilled,
      rejected: onRejected,
      always: always
    });
  };

  // onFulfilled allows the user to pass in a callback as an argument that
  // gets called if the promise is resolved.
  Pact.prototype.onFulfilled = function( callback ) {
    // Create a callback object with the key of fulfilled and set
    // the callback as the value, and push it to the queue.
    queue.push( { fulfilled: callback } );
  };

  // onRejected allows the user to pass in a callback as an argument
  // that gets called if the promise is rejected.
  Pact.prototype.onRejected = function( callback ) {
    // Create a callback object with the key of rejected and set
    // the value to the callback, and push it to the queue.
    queue.push( { rejected: callback } );
  };

  // always allows the user to pass in a callback as an argument
  // that always gets called when the promise is rejected or resolved
  Pact.prototype.always = function( callback ) {
    // Create a callback object with the key of always and set
    // the value to the callback, and push it to the queue.
    queue.push( { always: callback } );
  };

  var owned = [
    '',
    '   OOOOO                                 dd !!! ',
    '  OO   OO ww      ww nn nnn    eee       dd !!! ',
    '  OO   OO ww      ww nnn  nn ee   e  dddddd !!! ',
    '  OO   OO  ww ww ww  nn   nn e eee  dd   dd  ',
    '   OOOO0    ww  ww   nn   nn  eeeee  dddddd !!!',
    ''];

  // Celebrate when your tests pass.
  Pact.prototype.celebrate = function() {
    owned.forEach( function( row ) {
      console.log(row);
    });
  }

}).call(this);
