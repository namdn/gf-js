const GF = require('../index');

const arr = Array.range(10);

console.log(
    arr.toGenerator()
        .toArray()
);

console.log(arr);//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


console.log(arr.filter(i=>i%5==0));

console.log(Array.ichain([1,2],[3,4],[5,6,7]).toArray());


console.log('chunk',
    arr.ichunk(2).toArray()
)
console.log('chain',
    Array.chain(...arr.ichunk(2))
)


const arr1 = [1,2,2,2,3,3,3,4,3,2,4];

console.log(
    arr1.idistinct().toArray()
);


console.log(
    arr1.toGenerator().idistinct().toArray()
);

