const GF = require('../index');

// const N = 10;


// function* simple() {
//     for (let i = 0; i < N; i++)yield i;
// }

// console.log('simple', simple().count());
// console.log('simple', simple().toArray());

// function* empty() {

// }


// console.log('empty', empty().count());
// console.log('empty', empty().toArray());

// //un stopable generator function
// //number generator 0,1,2,3,4,.....
// function* number() {
//     let i = 0;
//     while (true) yield i++;
// }

// console.log('number', number().islice(0, 10).toArray())

// //even number 0,2,4,6,....
// even = number().ifilter(i => i % 2 == 0);

// //odd number 1,3,5,7,9,...
// odd = number().ifilter(i => i % 2);


// //last -0 number 0, 10, 20, 30, 40,...
// decimal_0 = even.ifilter(i => i % 5 == 0);

// console.log('decimal_0', decimal_0.islice(0, 10).toArray())


// decimal_0 = number()
//     .ifilter(i => i % 2 == 0)
//     .ifilter(i => i % 5 == 0);

// console.log('decimal_0', decimal_0.islice(0, 10).toArray())

// function* fibonacci() {
//     let a = b = 1;
//     while (true) {
//         yield a;
//         [a, b] = [b, a + b];
//     }
// }

// console.log('fibonacci',
//     fibonacci()
//         .islice(0, 100)
//         .toArray()
// );

// function* exp_2() {
//     let a = 1;
//     while (true) {
//         yield a;
//         a = a * 2;
//     }
// }

// console.log('exp_2',
//     exp_2()
//         .islice(0, 64)
//         .toArray()
// );

// x = [
//     undefined,
//     [1,3,-4],
//     [0],
//     [-0],
//     [1,2],
//     [1,3],
//     [1,3,-5],

// ]

// y = [...x];
// y.sort()
// console.log(x.sortBy(x=>x, true));
// console.log(y);

// console.log(-0 == 0);

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 36, 'active': false }
];
console.log(users.mapBy(['user', 'age'], toArray=true));

// console.log(users.ifilterBy(o => !o.active).mapBy(['user','age']));
// console.log(users.filterBy({ 'age': 36 }));
// console.log(users.filterBy('active'));


console.log(users.maxBy(['age','active']));
// _.filter(users, function (o) { return !o.active; });
// // => objects for ['fred']

// // The `_.matches` iteratee shorthand.
// _.filter(users, { 'age': 36, 'active': true });
// // => objects for ['barney']

// // The `_.matchesProperty` iteratee shorthand.
// _.filter(users, ['active', false]);
// // => objects for ['fred']

// // The `_.property` iteratee shorthand.
// _.filter(users, 'active');
//   // => objects for ['barney']
// x = 1;

// console.log(x.constructor == Object);
// x = {}
// console.log(x.constructor == Object);

// x = []
// console.log(x.constructor == Object);