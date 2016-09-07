"use strict";

function spyback(func, before, after) {
    return function(...args) {
        if(before) before(args);
        let result = func.apply(this, args);
        if(after) after(args, result);
        return result;
    };
}

module.exports = spyback;