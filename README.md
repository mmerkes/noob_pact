#NOOB Pact

##Installation

**Server Side**

Download package from NPM:

    npm install noob_pact

Require in your file:

    var Pact = require('noob_pact');

**Browser Side**

Download package and include in your html file:

    <script src="js/lib/noob_pacts.js"></script>

##Usage

NOOB Pact is a very basic implementation of a promise library. The usage is pretty simple.

First, create a new promise:

    var promise = new Pact();

Second, call the `resolve` and `reject` methods inside of the callback that you'd like to set up the promise for:

    app.get('/api/fun-stuff/:id', function( req, res ) {
      database.find( {id: params.id }, function( err, result ) {
        if( err ) {
          promise.reject( err );
          send404();
        } else {
          promise.resolve( result );
          res.send( result );
        }
      });
    });

Lastly (which could have happened second), tell the promise what you'd like it to do by using methods `then`, `onFulfilled`, `onRejected`, or `always`:

    promise.then( 
      // onFulfilled
      function( result ) {
        doSomethingOnSuccess();
      },
      // onRejected
      function( err ) {
        doSomethingOnFailure();
      },
      // always
      function( value ) {
        doSomethingNoMatterWhat();
    });

And that's it!

##Documentation

*[then](#then)
*[onFulfilled](#onFulfilled)
*[onRejected](#onRejected)
*[always](#always)
*[resolve](#resolve)
*[reject](#reject)
*[Chaining](#chaining)
*[Order of Execution](#order)

<h3 id="then">Pact.then( onFulfilled, onRejected, always )</h3>

`then` is the core method behind setting up your promise. It takes three argument: `onFulfilled`, which is executed when `resolve` is fired, `onRejected`, which is called when `reject` is fired, and `always`, which will always be fired once the promise is resolved or rejected. All callbacks are added to the queue.

    promise.then( function() {
        console.log('Promise fulfilled!');
      }, function() {
        console.log('Promise rejected!');
      }, function() {
        console.log('Always fired...');
    });

<h3 id="onFulfilled">Pact.onFulfilled( callback )</h3>

`onFulfilled` takes a callback and adds it to the queue, which will be executed if `resolve` is fired.

    promise.onFulfilled( function() {
      console.log('Promise fulfilled!');
    });

<h3 id="onRejected">Pact.onRejected( callback )</h3>

`onRejected` takes a callback and adds it to the queue, which will be executed if `reject` is fired.

    promise.onRejected( function() {
      console.log('Promise rejected!');
    });

<h3 id="always">Pact.always( callback )</h3>

`always` takes a callback and adds it to eh queue, which will always be executed once `resolve` or `reject` is called.

    promise.always( function() {
      console.log('Always fired...');
    });

<h3 id="resolve">Pact.resolve( value )</h3>

`resolve` should be called when the promise is successfully fulfilled. Once called, `resolve` will fire all callbacks inside the queue that were either marked `onFulfilled` or `always`. Once the promise is completed, the queue will be empty, whether callback was fired or not (i.e. `onRejected`).

    promise.onFulfilled( function( value ) {
      console.log( value );
    });
    promise.resolve( 5 );
    // logs 5

<h3 id="reject">Pact.reject( value )</h3>

`reject` should be called when the promise is rejected. Once called, `reject` will fire all callbacks inside the queue that were either marked `onRejected` or `always`. Once the promise is completed, the queue will be empty, whether callback was fired or not (i.e. `onFulfilled`).

    promise.onFulfilled( function( reason ) {
      console.log( reason );
    });
    promise.resolve( 'Oops...' );
    // logs 'Oops'

<h3 id="chaining">Chaining

`then`, `onFulfilled`, `onRejected`, and `always` all return the promise object to enable chaining, and you can add as many callbacks to the queue as you like.

    promise.then( ... ).onFulfilled( ... ).always( ... ).etc... 

<h3 id="order">Order of Execution</h3>

All callbacks sent to the promise are stored in a queue and will execute in the order that they were sent to the promise. For example:

    promise.then( function() {
        console.log(1);
      }, function() {
        console.log(2);
      }, function() {
        console.log(3);
    }).onFulfilled( function() {
      console.log(4);
    }).always( function() {
      console.log(5);
    });

    promise.resolve();

    // logs 1, then 3, then 4, and then 5

When processing callbacks sent into the promise via `then`, 'onFulfilled' or 'onRejected' will fire before `always`. However, if passed in directly via the `always` method, it will execute in the order that it was added to the queue.

##Ackowledgements

Thanks to the folks over at DailyJS for the [post](http://dailyjs.com/2011/06/09/framework-66/) that really helped me understand how promises work, and the code that makes up the basis of this library was modeled after their example.

##About Me

I'm a full stack JavaScript developer based out of Seattle with a soft-spot in his heart for helping noobs grow out of noobhood. [Check out NOOBjs.org for noob-content and beyond.](http://noobjs.org)






