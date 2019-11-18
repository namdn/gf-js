const GF = require('../index');

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 36, 'active': false },
    { 'user': 'mary', 'age': 40, 'active': true },
    { 'user': 'lazzy', 'age': 40, 'active': false },
];

function lily(arr) {
    return arr;
}

lily.groupBy = function (arr, ...args) {
    return arr.groupBy(...args);
}

const _ = lily;

console.log(_(users).groupBy('age'));