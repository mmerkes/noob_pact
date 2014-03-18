/*
  Thanks for DailyJS for the general idea on how to build a promise
  http://dailyjs.com/2011/06/09/framework-66/
*/

module.exports = (function() {
  "use strict";
  
  function Promise() {};

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

  Promise.prototype.resolve = function(value) {
    completePromise( 'fulfilled', value );
  };

  Promise.prototype.reject = function(reason) {
    completePromise( 'rejected', reason );
  };

  Promise.prototype.then = function( onFulfilled, onRejected, always ) {
    queue.push( {
      fulfilled: onFulfilled,
      rejected: onRejected,
      always: always
    });
  };

  Promise.prototype.onFulfilled = function( callback ) {
    queue.push( { fulfilled: callback } );
  };

  Promise.prototype.onRejected = function( callback ) {
    queue.push( { rejected: callback } );
  };

  Promise.prototype.always = function( callback ) {
    queue.push( { always: callback } );
  };

  return Promise;
})();
