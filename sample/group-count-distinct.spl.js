const GF = require('../index');

x = Array.range(10).map(i=>Math.round(Math.random()*10));
console.log('x =',x);

console.log('groupBy', x.groupBy());
console.log('countBy', x.countBy());

console.log('groupBy', x.groupBy(i=>i%3));
console.log('countBy', x.countBy(i=>i%3));

console.log('distinct', x.distinct());


var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 36, 'active': false },
    { 'user': 'mary', 'age': 40, 'active': true },
    { 'user': 'lazzy', 'age': 40, 'active': false },
];

console.log('groupBy age', users.groupBy('age'));
console.log('countBy age', users.countBy('age'));
console.log('distinctBy age', users.distinctBy('age'));

console.log('groupBy active', users.groupBy('active'));
console.log('countBy active', users.countBy('active'));
console.log('distinctBy active', users.distinctBy('active'));
