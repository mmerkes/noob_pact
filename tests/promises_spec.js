"use strict";

var Promise = require('../promises.js'),
    chai = require('chai'),
    expect = chai.expect;

describe('Promises should allow the user to set onFulfilled, onRejected, and always' +
  'which should be called when the promise resolves or rejects', function() {
  it('should create a promise', function() {
    var P = new Promise();
    expect( P ).to.be.ok;
  });

  it('should have the then, onFulfilled, onRejected, always, ' +
    'resolve, and reject methods', function() {
    var P = new Promise();

    expect( P.then ).to.be.ok;
    expect( P.onFulfilled ).to.be.ok;
    expect( P.onRejected ).to.be.ok;
    expect( P.always ).to.be.ok;
    expect( P.resolve ).to.be.ok;
    expect( P.reject ).to.be.ok;
  });

  it('should not allow the user to access the queue or completePromise ' +
    'method directly', function() {
    var P = new Promise();

    expect( P.queue ).to.equal(undefined);
    expect( P.completePromise ).to.equal(undefined);
  });

  // then - resolve
  it('should allow you to call the then method of the promise, and ' +
    'handle resolving', function(done) {
    var P = new Promise();
    var test = {};

    P.then( function() {
      test.fulfilled = true;
    }, function() {
      test.rejected = true;
    }, function() {
      test.always = true;
    });

    setTimeout( function() {
      P.resolve();
      expect( test.fulfilled ).to.be.ok;
      expect( test.always ).to.be.ok;
      expect( test.rejected ).to.not.be.ok;
      done();
    });
  });

  // then - reject
  it('should allow you to call the then method of the promise, and ' +
    'handle rejecting', function(done) {
    var P = new Promise();
    var test = {};

    P.then( function() {
      test.fulfilled = true;
    }, function() {
      test.rejected = true;
    }, function() {
      test.always = true;
    });

    setTimeout( function() {
      P.reject();
      expect( test.fulfilled ).to.not.be.ok;
      expect( test.always ).to.be.ok;
      expect( test.rejected ).to.be.ok;
      done();
    });
  });

  // onFulfilled
  it('should allow you to set onFulfilled', function(done) {
    var P = new Promise();
    var test = {};

    expect( test.fulfilled ).to.not.be.ok;

    P.onFulfilled( function() {
      test.fulfilled = true;
    });

    setTimeout( function() {
      P.resolve();
      expect( test.fulfilled ).to.be.ok;
      done();
    });
  });

  // onRejected
  it('should allow you to set onRejected', function(done) {
    var P = new Promise();
    var test = {};

    expect( test.rejected ).to.not.be.ok;

    P.onRejected( function() {
      test.rejected = true;
    });

    setTimeout( function() {
      P.reject();
      expect( test.rejected ).to.be.ok;
      done();
    });
  });

  // always
  it('should allow you to set always', function(done) {
    var P = new Promise();
    var test = {};

    expect( test.always ).to.not.be.ok;

    P.always( function() {
      test.always = true;
    });

    setTimeout( function() {
      P.reject();
      expect( test.always ).to.be.ok;
      done();
    });
  });
});
