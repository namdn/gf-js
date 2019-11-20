# gf-js

Write some extensions function for [**GeneratorFunction**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) and [**Array**](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array). We expand and attach most of [`lodash`](https://lodash.com/) functions to `Array` and `GeneratorFunction` by applying technique [`Extension Methods` or `Extension Function`](https://www.loekvandenouweland.com/content/extension-methods-in-javascript.html) in `Javascript`.

Eg:

The normal using
```js
const _ = require('lodash');
const GF = require('gf-js');

let x = [1,2,3,4,5]

// lodash function
_.chunk(x,2);	//[ [1, 2], [3, 4], [5]]

// Using chain function
_(x).chunk(2)
	.toValues();

// Our module can attach function to `Array` class
x.chunk(2);	// [[1, 2], [3, 4], [5]]

// Our module can chunk by an 
// array of size (not only one fixed size)
x.chunk([2,3]); // [[1,2], [3,4,5]]
```


We can chunk the infinite-loop `Generator`
```js
//infinite-loop `Generator`
function *number(){
	for(let i = 0; ;i++) yield i;
}

//chunker
let chunker = number().ichunk(2);

for(let v in chunker){
	console.log(v);
	// [0, 1]
	// [2, 3]
	// [4, 5]
	// ...
	// ...
	// loop infinite - please press `Ctrl-B` to break
}
```


Install with:
```
npm install gf-js --save
```

## What is `GeneratorFunction(GF)`? 
  `GeneratorFunction` is `Function` can return a [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator "The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.") object. . Instead of saving all entrie data as an `Array`, the `Generator` generates the next value as needed base on the previous value. So that the `Generator` does not waste memory, and it can be generator infinite values. You can read more information in [function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
  
Eg:

The normal `GeneratorFunction` generates 2 values
```js
//The normal `GeneratorFunction` generates 2 values
function* generator(i) {
  yield i;
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20
```

The infinite-loop `GeneratorFunction` generates all positive numbers
```js
//The infinite-loop `GeneratorFunction` generates all positive numbers
function *number(){
	for(let i = 0; ;i++) yield i;
}

//This code prints unfinite number in the screen. 
//You must be break it by `Ctrl+B`
for(let item of number()){
	console.log(item);
}
```
## How to use?

Open [sample](./sample/) folder to see a lot of tutorials 

  

## API

### Initialize

Before using, you have to import it in your project first

```js
const GF = require('gf-js')
```
After that all functions is pluged-in to `Array` and `Generator` and you can use it any where.



All APIs are add-on to JavaScript [`Array`](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array) and [`GeneratorFunction`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) extension functions.

> Note: Because the `Javascript` language architecture is not good as `C#` or `Python`, the `Array` class does not inherit from `Generator`, we must deploy the functions for both and write the functions to convert between them. Almost functions start with `i` return a `Generator`, and without `i` return an `Array` 


### `GF.prototype.toArray()`
Convert `GeneratorFunction` (GF) instance to `Array` instance
Eg:
```js
function* generator(i) {
  yield i;
  yield i + 10;
}
let g = generator(5);
let arr = g.toArray();	//arr = [0,1,2,3,4,5]
```

### `Arrray.prototype.toGenerator()`
Convert `Array` instance to `Generator`
```js
let g = [1,2,3,4,5].toGenerator()
```
now `g` equal to
```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}
g = generator()
```

###  `Array.prototype.sum()` 
### `GF.prototype.sum()`
Sum all elements in this Array or GF
```js
console.log([1,2,3].sum())	//1+2+3 = 6
```

###  `Array.prototype.count()` 
### `GF.prototype.count()`
Count the number of element
```js
console.log([1,2,3].count())	//3
```

### `Array.prototype.avg()` 
### `GF.prototype.avg()`
Average of all elements in this array or GF
```js
console.log([1,2,3].avg())	// (1+2+3)/ 3 = 2
```

### `GF.prototype.forEach(callback)`
Implement [`Array.prototype.forEach(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for GF

### `GF.prototype.imapBy(callback)` 
### `GF.prototype.imapBy(callback)`
### `Array.prototype.mapBy(callback)` 
### `Array.prototype.imapBy(callback)`
Create a new array with the results of calling a provided function on every element in the calling array. Same as [`Array.prototype.map(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
The `callback` parameter is `GetCallBack`
```js
/**
 * @typedef {String|Function|Array<string>} GetCallback 
 */
```
It can be a function
```js
function *generator(n){
	for (let i =0 ; i < n; i++) yield i;
}
let g = generator(10);
let h = g.imapBy(i=>i*2).toArray();	//[0,2,4,6,8,10,12,14,16,18]
let k = g.mapBy(i=>i*3);				//[0,3,6,9,12,15,18,21,24,27]
```

Or `string` if the values of `Array` or `Generator` are key-value pair `object`
```js
const users = [
  { user: 'barney', age: 36, active: true, heigh: 10 },
  { user: 'barney', age: 36, active: true, heigh: 12 },
  { user: 'fred', age: 40, active: false, heigh: 11 },
  { user: 'barney', age: 40, active: true, heigh: 12 }
];
const usernames = users.mapBy('user'); 
// ['ronaldo','barney','fred','barney']
```

Or `Array<string>`
```js
const shortUsers = users.mapBy(['user','active'])
// [
//   { user: 'barney', active: true },
//   { user: 'barney', active: true },
//   { user: 'fred', active: false },
//   { user: 'barney', active: true }
// ]

```
See [map.spl.js](./sample/map.spl.js) for more samples.

### `Array.zip(...iterables)` 
### `GF.zip(...iterables)`
The same python build-in [`zip` function ](https://docs.python.org/3/library/functions.html#zip) 
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.zip(x,y);
//z = [[1,'a'],[2,'b'],[3,'c'],[4,'d']]
```
### `Array.izip(...iterables)` 
### `GF.izip(...iterables)` 
The same python build-in [`zip` function ](https://docs.python.org/3/library/functions.html#zip) but returns `Generator` instead of `Array`
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.izip(x,y);
for(let [a,b] of z){
	console.log(a,b)
}
```
the display is
```
	1 a
	2 b
	3 c
	4 d
```

### `Array.ichain(...iterables)` 
### `GF.ichain(...iterables)`
The same python [`itertools.chain`](https://docs.python.org/2/library/itertools.html#itertools.chain) function.
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.ichain(x,y);
for(let e of z){
	console.log(e)
}
```
the display is
```
	1
	2
	3
	4
	a
	b
	c
	d
```


### `Array.chain(...iterables)` 
### `GF.chain(...iterables)`
The same python [`itertools.chain`](https://docs.python.org/2/library/itertools.html#itertools.chain) function but returns Array instead of GF.
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.chain(x,y);
//z = [1,2,3,4,'a','b','c','d']
```
### `Array.prototype.chunk(size)` 
### `GF.prototype.chunk(size)`
Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements. Implememt lodash [`chunk`](https://lodash.com/docs/#chunk). But the `size` parameter is more flexible

The `size` parameter can be a number
```js
let x = [1,2,3,4,5,6,7];
let y = x.chunk(2);
// y = [[1,2],[3,4],[5,6],[7]]

function* generator(n) {
  for(let i = 0; i < n; i++) yield i;
}
let g = generator(7);
let h = g.chunk(2);
// h = [[0,1],[2,3],[4,5],[6]]
```
Or can be an array of numbers
```js
let y = x.chunk([2,3,4]) 
// y = [
// 	[1, 2],
// 	[3,4,5],
// 	[6,7]	// not enough 4 elements because x is too short
// ]
```

Or can be a `Generator`
```js
function *size(){
	yield 2;
	yield 3;
	yield 4;
}
let y = x.chunk(size())
// y = [
// 	[1, 2],
// 	[3,4,5],
// 	[6,7]	// not enough 4 elements because x is too short
// ] 
```

### `Array.prototype.ichunk(size)` 
### `GF.prototype.ichunk(size)`
Implememt lodash [`chunk`](https://lodash.com/docs/#chunk) but return GF instead of Array

### `Array.prototype.ifilterBy(callback)` 
### `GF.prototype.ifilterBy(callback)`
Same [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) but return GF instead of Array

### `GF.prototype.filterBy(callback)`
### `Array.prototype.filterBy(callback)`
Implement [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in GF

```js
function* generator(n) {
  for(let i = 0; i < n; i++) yield i;
}
let g = generator(7);
let h = g.filterBy(x=>x%3==0);
// h = [0,3,6]
```

### `Array.range(...args)` 
### `Array.irange(...args)`
Same python build-in [range](https://docs.python.org/2/library/functions.html#range) function.
We can user function in two types:
`range`(_stop_)
`range`(_start_,  _stop_[,  _step_])

```js
let x = Array.range(5);		//x = [0,1,2,3,4]
let y = Array.range(1,11);	//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let z = Array.range(0, -10, -1); //[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```
###  `GF.prototype.groupBy(callback=undefined)`
###  `Array.prototype.groupBy(callback=undefined)`
Group all items with the same key in the same group.
The `callback` parameter is `GetCallback`. See `mapBy` method.
```js
let x = range(10);	//x=[0,1,2,3,4,5,6,7,8,9]
let g = x.groupBy(x=>x%2);	
//g = {
//	'0':[0,2,4,6,8],
//	'1':[1,3,5,7,9]
// }
```
See [group-partition-count-distinct.spl](./sample/group-partition-count-distinct.spl) for more samples.

###  `GF.prototype.partition(callback=undefined)`
###  `Array.prototype.partition(callback=undefined)`
The same as `groupBy` but not return the keys, only array of values.
See [group-partition-count-distinct.spl](./sample/group-partition-count-distinct.spl) for more samples.

### `GF.prototype.distinctBy(callback=undefined)`
### `GF.prototype.idistinctBy(callback=undefined)`
### `Array.prototype.distinctBy(callback=undefined)` 
### `Array.prototype.idistinctBy(callback=undefined)`
Filter the difference items in this Array. The `callback` parameter is `GetCallback`. See `mapBy` method.
```js
let x = [1,2,3,4,5,6,5,7,6,8];
let d1 = x.distinct();	//d1 = [1,2,3,4,5,6,7,8]
let d2 = x.distinct(x=>x%5);	//d2 = [1,2,3,4,5];
```
See [group-partition-count-distinct.spl](./sample/group-partition-count-distinct.spl) for more samples.

### `GF.prototype.minBy(callback, includeIndex = false)`
### `Array.prototype.minBy(callback, includeIndex = false)`
### `GF.prototype.maxBy(callback, includeIndex = false)`
### `Array.prototype.maxBy(callback, includeIndex = false)`

Get the min, max by `callback`. The `callback` parameter is `GetCallback`. Instead of `Math.min` and `Math.max` functions, the return value is the original value, not the value after apply `callback`. If `includeIndex` is `true` return pair of value and index of value
```js
x = [1, 2, 3, 4, 5, 4]

console.log(x.min(), x.max())

y = [
    [1, 3, -4],
    [0],
    [-0],
    [1, 2],
    [1, 3],
    [1, 3, -5],
    [0, 5]
]

console.log(y.min(includeIndex = true))
console.log(y.max(includeIndex = false))

console.log(y.minBy(v => v[1]))
console.log(y.minBy(v => v[1]))

var users = [
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 10 },
    { 'user': 'barney', 'age': 36, 'active': true, 'heigh': 12 },
    { 'user': 'fred', 'age': 40, 'active': false, 'heigh': 11 },
    { 'user': 'barney', 'age': 40, 'active': true, 'heigh': 12 },
];
```

See [min-max.spl.js](./sample/min-max.spl.js) for more samples.
### `GF.prototype.min(includeIndex = false)`
### `Array.prototype.min(includeIndex = false)`
### `GF.prototype.max(includeIndex = false)`
### `Array.prototype.max(includeIndex = false)`
Special functions of `minBy` and `maxBy`. Not apply `callback` for item.

### `GF.prototype.argMinBy(callback)`
### `Array.prototype.argminBy(callback)`
### `GF.prototype.argmaxBy(callback)`
### `Array.prototype.argmaxBy(callback)`
Insead of returning value, the function return the index of value in `GF` or `Array`. See [min-max.spl.js](./sample/min-max.spl.js) 
```js
console.log(users.argMinBy('age'), users.minBy('age'));
console.log(users.argMaxBy('age'), users.maxBy('age'));

console.log(users.minBy('age', includeIndex = true));
console.log(users.maxBy('age', includeIndex = true));

console.log(users.minBy(['age', 'heigh']));
console.log(users.maxBy(['age', 'heigh']));
```

### `GF.prototype.argMin()`
### `Array.prototype.argMin()`
### `GF.prototype.argMax()`
### `Array.prototype.argMax()`
Special functions of `argMinBy` and `argMaxBy`. Not apply `callback` for item.


### `GF.prototype.someBy(callback)` 
### `Array.prototype.someBy(callback)` 
Apply [`Array.prototype.some(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) to GF.
```js
function *generator(){
	yield 1;
	yield 2;
	yield 5;
	yield 7;
};
let g = generator();
let has5 = g.someBy(x=>x == 5);	//true
let has7 = g.someBy(x=>x == 7);	//true
let has6 = g.someBy(x=>x == 6);	//false
```
### `GF.prototype.everyBy(callback)`
### `Array.prototype.everyBy(callback)`
Apply [`Array.prototype.every(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) to GF.
```js
function *generator(){
	yield 2;
	yield 4;
	yield 6;
	yield 8;
};
let g = generator();
let even = g.everyBy(x=>x%2==0);	//true
let mod3 = g.someBy(x=>x%3==0);	//false
```

### `GF.prototype.irepeat(number=undefined)`
### `Array.prototype.irepeat(number=undefined)`
### `GF.prototype.repeat(number=undefined)`
### `Array.prototype.repeat(number=undefined)`
Repeats all items in this `number` of times. If the `number` is `undefined`, repeat infinite.

Eg:

```js
for(let item of [1,2].repeat(5)){
    console.log(item);
}

//infinite loop
for(let item of [1,2].repeat()){
    console.log(item);
}
```
## License

[MIT](https://github.com/NodeRedis/node_redis/blob/master/LICENSE)