const GF = require('../index');

//fixed length array samples
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('fixed length array sample')
console.log('skip', x.skip(2));
console.log('take', x.take(5));
console.log('skip-take', x.skip(3).take(4));

console.log('dropWhile', x.dropWhile(i => i < 2));
console.log('takeWhile', x.takeWhile(i => i < 2));

//fixed length generator samples
function* simple(N) {
    for (let i = 0; i < N; i++)yield i;
}

console.log('fixed length generator samples')
console.log('skip', simple(10).skip(2));
console.log('take', simple(10).take(5));
console.log('skip-take', simple(10).skip(3).take(4));

//fibonacci infinite length loop generator 

function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield b;
        c = a + b;
        a = b;
        b = c;
    }
}

console.log('fibonacci infinite length loop generator');
console.log('skip-take', fibonacci().iskip(3).itake(4).toArray());
console.log('skip-take', fibonacci().iskip(3).take(4));


//prime infinite length loop generator 
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
console.log('prime infinite length loop generator');
console.log('skip-take', prime().iskip(3).itake(4).toArray());
console.log('skip-take', prime().iskip(3).take(4));
