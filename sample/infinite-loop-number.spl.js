const GF = require('../index');

//infinite loop generator
function *number(){
    //integer generator
    for(let i = 0; ;i++)yield i;
}

//imap for infinite loop

//even number generator
even = number().imap(i=>i*2);

//odd number generator
odd = number().imap(i=>i*2+1);



// console.log('print 10 values');
// console.log('number',number().take(10))
// console.log('skip some',number().iskip(10).take(10))
// console.log('even',even.take(10))
// console.log('odd',odd.take(10))



//fibonacci generator
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

//prime generator 
function* prime() {
    for (let i = 2; ; i++)
        if (is_prime(i))
            yield i;
}
console.log('print 10 prime values');
console.log('prime',prime().take(10))
