const GF = require("../index");
require('chai').should();

const N = 10;

let arr = new Array(N).fill(null).map((_,i)=>i);

function *simple_gf(){
    for(let i = 0;i < N; i++)yield i;
}

function *empty_gf(){

}


describe('GeneratorFunction', () => {
    describe('#toArray', () => {
        it('Attack function succeful',()=>{
            simple_gf().toArray();
        });

        it('Enough number of element in GF', () => {
            simple_gf().toArray().should.eql(arr);
        });

        it('Empty GF equal to empty Array', ()=>{
            empty_gf().toArray().should.eql([])
        })
    });

    describe('#count', () => {
        
        it('Attack function succeful',()=>{
            simple_gf().count();
        });

        it('Counting enough number',()=>{
            simple_gf().count().should.equal(N);
        });

        it('Counting empty GF',()=>{
            empty_gf().count().should.equal(0);
        });
    });
    
});