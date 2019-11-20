const GF = require('../index');

const N_text = 5
const N_diff = 4
const N_max = 3;

const texts = Array.irange(N_text).map(i=>`t${i+1}`);

// texts = texts.shuffle();
console.log('texts',texts);
const partitions = texts.irepeat(N_diff).chunk(N_max);
console.log('partitions:',partitions);

const  users = Array
    .range(partitions.length)
    .map(i=>({ id:i+1}))
// console.log('users',users);

Array
    .izip(users, partitions)
    .forEach(([u,task])=>u.task = task);
console.log('users',users);
