const GF = require('../index');

function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield b;
        c = a + b;
        a = b;
        b = c;
    }
}

function is_prime(m) {
    for (let j = 2; j <= Math.sqrt(m); j++)
        if (m % j == 0) return false;
    return true;
}

function* prime() {
    yield 2;
    for (let i = 3; ; i++)
        if (is_prime(i))
            yield i;
}

// const m = require('lodash');

// m();
// m.a;


// Array
//     .izip(prime(), fibonacci(), fibonacci().imap(i=>i*2))
//     .take(10).forEach(x=>console.log(x))


let users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 36, 'active': false },
    { 'user': 'mary', 'age': 40, 'active': true },
    { 'user': 'lazzy', 'age': 40, 'active': false },
];


const u1 = users.argMinBy(['age', 'active'])
console.log(u1);


