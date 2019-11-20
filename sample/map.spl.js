const GF = require('../index');

const users = [
    { user: 'barney', age: 36, active: true, heigh: 10 },
    { user: 'barney', age: 36, active: true, heigh: 12 },
    { user: 'fred', age: 40, active: false, heigh: 11 },
    { user: 'barney', age: 40, active: true, heigh: 12 }
];
console.log(users);


usernames = users.mapBy('user');
console.log(usernames);

shortUsers = users.mapBy(['user','active']);
console.log(shortUsers)
// ages = users.mapBy('age');
// // console.log(ages);

// //map by name
// susers = users.mapBy(['user']);
// console.log(susers);

// heighs = users.mapBy('heigh');

// // t = susers.assignProbs({
// //     age: ages,
// //     heigh: heighs,
// //     id: (function* () { let i = 0; while (true) yield i++ })()
// // });



// console.log('susers', susers);    
// console.log('t', t);  


// susers = users.mapBy(['user','active']);
// console.log(susers);