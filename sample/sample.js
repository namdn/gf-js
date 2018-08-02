const GF = require('../index');

const N = 10;


function* simple() {
    for (let i = 0; i < N; i++)yield i;
}

console.log('simple', simple().count());
console.log('simple', simple().toArray());

function* empty() {

}


console.log('empty', empty().count());
console.log('empty', empty().toArray());

//un stopable generator function
//number generator 0,1,2,3,4,.....
function* number() {
    let i = 0;
    while (true) yield i++;
}

console.log('number', number().islice(0, 10).toArray())

//even number 0,2,4,6,....
even = number().ifilter(i => i % 2 == 0);

//odd number 1,3,5,7,9,...
odd = number().ifilter(i => i % 2);


//last -0 number 0, 10, 20, 30, 40,...
decimal_0 = even.ifilter(i => i % 5 == 0);

console.log('decimal_0', decimal_0.islice(0, 10).toArray())


decimal_0 = number()
    .ifilter(i => i % 2 == 0)
    .ifilter(i => i % 5 == 0);

console.log('decimal_0', decimal_0.islice(0, 10).toArray())

function* fibonacci() {
    let a = b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

console.log('fibonacci',
    fibonacci()
        .islice(0, 100)
        .toArray()
);

function* exp_2() {
    let a = 1;
    while(true){
        yield a;
        a = a*2;
    }
}

console.log('exp_2',
    exp_2()
        .islice(0, 100)
        .toArray()
);