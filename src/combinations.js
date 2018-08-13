const GF = require('./generator.ext');
require('./array.ext');

/**
 * Math product
 * 
 * @param {Array<GeneratorFunction,Array>} iterables 
 * @param {Number} repeat 
 */
GF.iproduct = function* (iterables, repeat = 1) {
    function __dot(accumulator, iterable) {
        for (let arr of accumulator) {
            yield * iterable.map(v => [...arr, v]);
        }
    }

    //convert each iterable to array
    let arrays = iterables.map(iterable => Array.isArray(iterable) ? iterable : [...iterable]);

    //repeat arrays
    let pools = [];
    while (repeat--) {
        pools = [...pools, ...arrays];
    }


    let accumulator = [[]];
    for (let iterable of pools) {
        accumulator = __dot(accumulator, iterable)
    }
    yield* accumulator;
}


/**
 * 
 * @param {*} iterables 
 * @param {*} repeat 
 */
GF.product = (iterables, repeat = 1) => [...GF.iproduct(iterables, repeat)];


/**
 * 
 * @param {Array} iterable 
 * @param {Number} r 
 */
GF.ipermutations = function* (iterable, r = undefined) {
    let pool = Array.isArray(iterable) ? iterable : [...iterable];
    let n = pool.length;

    r = r || n;
    if (r > n) return;

    let indices = GF.range(n);
    let cycles = GF.range(n, n - r, -1);
    yield indices.slice(0, r).map(i => pool[i]);

    while (n) {
        let i;
        for (i = r - 1; i >= 0; i--) {
            cycles[i] -= 1;
            if (cycles[i] == 0) {
                indices = [...indices.slice(0, i), ...indices.slice(i + 1), indices[i]];
                cycles[i] = n - i;
            } else {
                let j = cycles[i];
                [indices[i], indices[indices.length - j]] = [indices[indices.length - j], indices[i]];
                yield indices.slice(0, r).map(i => pool[i]);
                break;
            }
        }
        if (i < 0)
            break;
    }
}

/**
 * Permutations
 * 
 * @param {*} iterable 
 * @param {*} r 
 */
GF.permutations = (iterable, r) => [...GF.ipermutations(iterable, r)]

/**
 * 
 * @param {*} r 
 */
GF.prototype.ipermutations = function (r) { return GF.ipermutations(this, r); }

/**
 * 
 * @param {*} r 
 */
GF.prototype.permutations = function (r) { returnGF.permutations(this, r); }

/**
 * 
 * @param {*} iterable 
 * @param {*} r 
 */
GF.icombinations = function* (iterable, r = undefined) {
    let pool = Array.isArray(iterable) ? iterable : [...iterable];
    let n = pool.length;

    r = r || n;
    if (r > n) return;

    let indices = Array.range(r)
    yield indices.map(i => pool[i]);

    while (true) {
        let i;
        for (i = r - 1; i >= 0; i--) {
            if (indices[i] != i + n - r) break;
        }
        if (i < 0) break;

        indices[i] += 1;
        for (let j = i + 1; j < r; j++) {
            indices[j] = indices[j - 1] + 1;
        }

        yield indices.map(i => pool[i]);
    }
}

/**
 * 
 * @param {*} iterable 
 * @param {*} r 
 */
GF.combinations = function (iterable, r) { return [...GF.icombinations(iterable, r)]; }

/**
 * 
 * @param {*} r 
 */
GF.prototype.icombinations = function (r) { return GF.icombinations(this, r); }

/**
 * 
 * @param {*} r 
 */
GF.prototype.combinations = function (r) { return GF.combinations(this, r); }


Array.iproduct = GF.iproduct;
Array.product = GF.product;

Array.ipermutations = GF.ipermutations;
Array.permutations = GF.permutations;

Array.prototype.ipermutations = function (r) { return GF.ipermutations(this, r); }
Array.prototype.permutations = function (r) { return GF.permutations(this, r); }

Array.icombinations = GF.icombinations;
Array.combinations = GF.combinations;

Array.prototype.icombinations = function (r) { return GF.icombinations(this, r); }
Array.prototype.combinations = function (r) { return GF.combinations(this, r); }


module.exports = GF;
