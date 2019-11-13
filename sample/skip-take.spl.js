const GF = require('../index');
x = [1,2,3,4,5,6,7,8,9,10]

console.log('skip',x.skip(2));
console.log('take',x.take(5));
console.log('skip-take',x.skip(3).take(4));

console.log('dropWhile',x.dropWhile(i=>i<2));
console.log('takeWhile',x.takeWhile(i=>i<2));
function* simple(N) {
    for (let i = 0; i<N; i++)yield i;
}
    

console.log('skip',simple(10).skip(2));
console.log('take',simple(10).take(5));
console.log('skip-take',simple(10).skip(3).take(4));