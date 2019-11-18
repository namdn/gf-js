const GF = require('../index');

var users = [
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 10 },
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 12 },
    { 'user': 'fred', 'age': 40, 'active': false, 'heigh': 11 },
    { 'user': 'barney', 'age': 40, 'active': true, 'heigh': 12 },
];

// usernames = users.mapBy('user');
// console.log(usernames);

ages = users.mapBy('age');
// console.log(ages);

//map by name
susers = users.mapBy(['user']);
console.log(susers);

heighs = users.mapBy('heigh');

// t = susers.assignProbs({
//     age: ages,
//     heigh: heighs,
//     id: (function* () { let i = 0; while (true) yield i++ })()
// });

t = susers.assignProbs({
    age: ages,
    heigh: heighs,
    id: Array.irange(users.length)
});

console.log('susers', susers);    
console.log('t', t);  
