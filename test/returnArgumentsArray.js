function returnArgumentsArray(...args) {
    if (!args) {
        args = [];
    }

    return args;
}

console.log(returnArgumentsArray(2, 4));