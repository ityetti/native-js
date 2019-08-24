function returnCounter(number = 0) {
    return function f() {
        return number++;
    }
}

var f = returnCounter();

console.log(f()); // выведет 11
console.log(f()); // выведет 12
console.log(f()); // выведет 13