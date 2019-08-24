function sum(a, b) {
    return a + b;
}

let newSum = bindFunction(sum, 2, 4);

function bindFunction(fn, ...args) {
    return function() {
        return fn.apply(this, args);
    }
}

console.log(newSum()); // выведет 6