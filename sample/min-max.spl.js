const GF = require('../index');

x = [1, 2, 3, 4, 5, 4]

console.log(x.min(), x.max())

y = [
    [1, 3, -4],
    [0],
    [-0],
    [1, 2],
    [1, 3],
    [1, 3, -5],
    [0, 5]
]

console.log(y.min(includeIndex = true))
console.log(y.max(includeIndex = false))

console.log(y.minBy(v => v[1]))
console.log(y.minBy(v => v[1]))

var users = [
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 10 },
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 12 },
    { 'user': 'fred', 'age': 40, 'active': false, 'heigh': 11 },
    { 'user': 'barney', 'age': 40, 'active': true, 'heigh': 12 },
];

console.log(users.argMinBy('age'), users.minBy('age'));
console.log(users.argMaxBy('age'), users.maxBy('age'));

console.log(users.minBy('age', includeIndex = true));
console.log(users.maxBy('age', includeIndex = true));

console.log(users.minBy(['age', 'heigh']));
console.log(users.maxBy(['age', 'heigh']));