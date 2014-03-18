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

  var queue = [];

  var completePromise = function( status, value ) {
    var action;

    while( queue[0] ) {
      action = queue.shift();

      if( action[status] ) {
        action[status](value);
      }

      if( action.always ) {
        action.always(value);
      }
    }
  };

  Pact.prototype.resolve = function(value) {
    completePromise( 'fulfilled', value );
  };

  Pact.prototype.reject = function(reason) {
    completePromise( 'rejected', reason );
  };

  Pact.prototype.then = function( onFulfilled, onRejected, always ) {
    queue.push( {
      fulfilled: onFulfilled,
      rejected: onRejected,
      always: always
    });
  };

  Pact.prototype.onFulfilled = function( callback ) {
    queue.push( { fulfilled: callback } );
  };

  Pact.prototype.onRejected = function( callback ) {
    queue.push( { rejected: callback } );
  };

  Pact.prototype.always = function( callback ) {
    queue.push( { always: callback } );
  };
}).call(this);
