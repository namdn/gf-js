const GF = require('../index');


console.log(GF.irange(2, 10).some(x=>x>10));

console.log(GF.irange(2, 10).some(x=>x>2));


console.log(GF.irange(2, 10).every(x=>x>5));
console.log(GF.irange(2, 10).every(x=>x>1));