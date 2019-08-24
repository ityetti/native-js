function sum(a, b) {
    return a + b;
}

var newSum = bindFunction(sum, 2, 4);

function bindFunction(fn, ...args) {
    return function fn() {
        return args.reduce(sum)
    }
}

console.log(newSum()); // выведет 6