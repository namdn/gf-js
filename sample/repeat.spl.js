const GF = require('../index');

for(let item of GF.repeatValue(3,100)){
    console.log(item);
}
for(let item of [1,2].repeat()){
    console.log(item);
}