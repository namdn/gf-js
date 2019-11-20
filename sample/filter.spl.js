const GF = require('../index');

const users = [
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 10 }, 
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 12 },
    { 'user': 'fred', 'age': 40, 'active': false, 'heigh': 11 },
    { 'user': 'barney', 'age': 40, 'active': true, 'heigh': 12 },
];

console.log('original arrays', users);
console.log('filterBy function', users.filterBy(({active})=>active));

//when filter by 1 key the value of key is convert to [true, false]
console.log('filterBy 1 key', users.filterBy('active'));

console.log('filterBy 1 key and value', users.filterBy({age:36}));

console.log('filterBy multi-keys and values', users.filterBy({age:36, heigh:10}));