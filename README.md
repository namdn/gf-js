# gf-js

Write some extensions function for [**GeneratorFunction**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction).

  # What is `GeneratorFunction`?
  `GeneratorFunction` is `Function` can return a [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator "The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.") object. You can read more information in [function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).
  
Eg:
```js
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
# How to use?

See [sample.js](./sample/sample.js)

  

# API

All APIs are add-on to JavaScript [`Array`](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array) and [`GeneratorFunction`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) extension functions.

> Note: Almost functions start with `i` return a Generator, and not 'i' return an Array 


## `GF.prototype.toArray()`
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

## `Arrray.prototype.toGenerator()`
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

##  `Array.prototype.sum()` and `GF.prototype.sum()`
Sum all elements in this Array or GF
```js
console.log([1,2,3].sum())	//1+2+3 = 6
```

## `Array.prototype.avg()` and `GF.prototype.avg()`
Average of all elements in this array or GF
```js
console.log([1,2,3].avg())	// (1+2+3)/ 3 = 2
```
## `GF.prototype.map(callback)` and `GF.prototype.imap(callback)`
Apply [`GF.prototype.map(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to GF.
```js
function *generator(n){
	for (let i =0 ; i < n; i++) yield i;
}
let g = generator(10);
let h = g.imap(i=>i*2).toArray();	//[0,2,4,6,8,10,12,14,16,18]
let k = g.map(i=>i*3);				//[0,3,6,9,12,15,18,21,24,27]
```
## 
## `Array.zip(...iterables)` or `GF.zip(...iterables)`
The same python build-in [`zip` function ](https://docs.python.org/3/library/functions.html#zip) 
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.zip(x,y);
//z = [[1,'a'],[2,'b'],[3,'c'],[4,'d']]
```
## `Array.izip(...iterables)` or `GF.izip(...iterables)` 
The same python build-in [`zip` function ](https://docs.python.org/3/library/functions.html#zip) but returns Generator instead of Array
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

## `Array.ichain(...iterables)` or `GF.ichain(...iterables)`
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


## `Array.chain(...iterables)` or `GF.chain(...iterables)`
The same python [`itertools.chain`](https://docs.python.org/2/library/itertools.html#itertools.chain) function but returns Array instead of GF.
```js
let x = [1,2,3,4];
let y = ['a','b','c','d'];
let z = Array.chain(x,y);
//z = [1,2,3,4,'a','b','c','d']
```
## `Array.prototype.chunk(size)` and `GF.prototype.chunk(size)`
Implememt lodash [`chunk`](https://lodash.com/docs/#chunk)
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

## `Array.prototype.ichunk(size)` and `GF.prototype.ichunk(size)`
Implememt lodash [`chunk`](https://lodash.com/docs/#chunk) but return GF instead of Array

## `Array.prototype.ifilter(callback)` and `GF.prototype.ifilter(callback)`
Same [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) but return GF instead of Array

## `GF.prototype.filter(callback)`
Implement [`Array.prototype.filter(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in GF

```js
function* generator(n) {
  for(let i = 0; i < n; i++) yield i;
}
let g = generator(7);
let h = g.filter(x=>x%3==0);
// h = [0,3,6]
```

## `Array.range(...args)` and `Array.irange(...args)`
Same python build-in [range](https://docs.python.org/2/library/functions.html#range) function.
We can user function in two types:
`range`(_stop_)
`range`(_start_,  _stop_[,  _step_])

```js
let x = Array.range(5);		//x = [0,1,2,3,4]
let y = Array.range(1,11);	//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let z = Array.range(0, -10, -1); //[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```
##  `Array.prototype.groupBy(callback)`
Group all items with the same key in the same group
```js
let x = range(10);	//x=[0,1,2,3,4,5,6,7,8,9]
let g = x.groupBy(x=>x%2);	
//g = {
//	'0':[0,2,4,6,8],
//	'1':[1,3,5,7,9]
// }
```
## `Array.prototype.distinct([callback])` and `Array.prototype.idistinct([callback])`
Filter the difference items in this Array. We can use `callback` to create key
```js
let x = [1,2,3,4,5,6,5,7,6,8];
let d1 = x.distinct();	//d1 = [1,2,3,4,5,6,7,8]
let d2 = x.distinct(x=>x%5);	//d2 = [1,2,3,4,5];
```
## `GF.prototype.some(callback)`
Apply [`Array.prototype.some(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) to GF.
```js
function *generator(){
	yield 1;
	yield 2;
	yield 5;
	yield 7;
};
let g = generator();
let has5 = g.some(x=>x == 5);	//true
let has7 = g.some(x=>x == 7);	//true
let has6 = g.some(x=>x == 6);	//false
```
## `GF.prototype.every(callback)`
Apply [`Array.prototype.every(callback)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) to GF.
```js
function *generator(){
	yield 2;
	yield 4;
	yield 6;
	yield 8;
};
let g = generator();
let even = g.every(x=>x%2==0);	//true
let mod3 = g.some(x=>x%3==0);	//false
```
# License

[MIT](https://github.com/NodeRedis/node_redis/blob/master/LICENSE)