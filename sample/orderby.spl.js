const GF = require('../index');

const users = [
    { user: 'barney', age: 36, active: true, heigh: 10 },
    { user: 'barney', age: 46, active: true, heigh: 12 },
    { user: 'fred', age: 40, active: false, heigh: 11 },
    { user: 'barney', age: 40, active: true, heigh: 12 }
];

console.log(users.orderBy('age'));

console.log(users.orderBy(['heigh','age']));