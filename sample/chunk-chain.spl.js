const GF = require('../index');

x = [1, 2, 3, 4, 5]
console.log('chunk',x.chunk(3));
console.log('chunk',x.chunk([1, 2]));

console.log('chain',Array.chain(...x.chunk([1, 2])));
function* s() {
    for (let i = 1; ; i++) yield i;
}

console.log(x.chunk(s()));

for (let c of s().ichunk(s()).slice(0, 10)) {
    console.log(c);
}



