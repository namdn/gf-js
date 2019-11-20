const GF = require('../index');

x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('orginal array', x)
console.log('chunk fixed size', x.chunk(3));
console.log('chunk array of sizes', x.chunk([1, 2]));
function* finite() {
    yield 1;
    yield 3;
    yield 2;
}
console.log('chunk finite generator', x.chunk(finite()));
function* infinite() {
    while (true) {
        yield 2;
        yield 3;
    }
}
function* random(M) {
    while (M-- > 0)
        yield Math.round(Math.random() * 10) + 1;
}
console.log('chunk infinite-loop generator', x.chunk(infinite()))

const a = [1, 2]
const b = [3, 4, 5]
const c = [6, 7]
const d = [8, 9, 10]
console.log('chain arrays', Array.chain(a, b, c, d))

console.log('chain mixed arrays and generators', Array.chain(a, finite(), b, random(10)));

// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]

// // console.log('chain',Array.chain(...x.chunk([1, 2])));
// function* s() {
//     for (let i = 1; ; i++) yield i;
// }

// random = s().imap(i=>Math.round(Math.random()*10)+1)

// for (let c of s().ichunk(random)) {
//     console.log(c);
// }



