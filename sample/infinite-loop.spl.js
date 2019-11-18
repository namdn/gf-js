const GF = require('../index');

function* gen_user() {
    for (let id = 0; ; id++) yield { id }
}

function* gen_field(field) {
    for (let i = 0; ; i++) yield `${field}${i}`
}

new_users = gen_user()
    .iassignProbs({ 
        name: gen_field('name'), 
        ege: gen_field('') 
    })
    .take(5);
console.log(new_users);

new_users1 = gen_user()
    .itake(10)
    .assignProbs({ 
        name: gen_field('name'), 
        ege: gen_field('') 
    });

console.log(new_users1);