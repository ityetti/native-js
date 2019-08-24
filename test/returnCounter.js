function returnCounter(number = 0) {
    return function f() {
        return number++;
    }
}

var f = returnCounter();

console.log(f()); // выведет 0
console.log(f()); // выведет 1
console.log(f()); // выведет 2