"use strict";
/* jshint mocha: true */

let assert  = require("chai").assert,
    spyback = require(".");

describe("spyback", function() {
    it("calls the before function correctly", function(done) {
        let args = [ "one", 2, [ 3 ] ];
        let beforeCalledYet = false;

        let before = (actualArgs) => {
            assert.deepEqual(args, actualArgs);
            beforeCalledYet = true;
            done();
        };

        let myObj = {
            func() { assert.isOk(beforeCalledYet); }
        };

        myObj.func = spyback(myObj.func, before);
        myObj.func(...args);
    });

    it("calls the after function correctly", function(done) {
        let args = [ "one", 2, [ 3 ] ];
        let result = "okay";

        let after = (actualArgs, actualResult) => {
            assert.deepEqual(args, actualArgs);
            assert.equal(result, actualResult);
            done();
        };

        let myObj = {
            func(a, b, c) {
                assert.deepEqual(args, [ a, b, c ]);
                return result;
            }
        };

        myObj.func = spyback(myObj.func, null, after);
        myObj.func(...args);
    });

    it("passes on return value", function() {
        let func = spyback(() => 123);
        assert.equal(func(), 123);
    });
});