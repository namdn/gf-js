const { _decisionCallback, _getCallback } = require('./callback')

/**
 * GeneratorFunction class
 */
const GF = Object.getPrototypeOf(function* () { });

//default callback
const defaultCallback = v => v;

/**
 * Convert GeneratorFunction to Array.
 * 
 * @return {Array}
 */
GF.prototype.toArray = function () {
    return [...this];
}

/**
 * Convert Array to Generator.
 * 
 * @return {GeneratorFunction}
 */
Array.prototype.toGenerator = function* () {
    for (let v of this) yield v;
}

/**
 * count number of element.
 * 
 * @return {Number}
 */
GF.prototype.count = function () {
    let index = 0;
    for (let _ of this) index++;
    return index;
}

/**
 * The same of `Array.forEarch` function.
 * 
 * @param {Function} callback 
 */
GF.prototype.forEach = function (callback) {
    let index = 0;
    for (let v of this) {
        callback(v, index++, this);
    }
}

/**
 * The same of `Array.reduce` function.
 * 
 * @param {Function} callback 
 * @param {any} initialValue 
 */
GF.prototype.reduce = function (callback, initialValue) {
    let accumulator = initialValue;
    let index = 0;
    for (let v of this) {
        accumulator = callback(accumulator, v, index++, this);
    }

    return accumulator;
}

/**
 * Find min value in Generator
 * 
 * @param {Function} comparator Specifies a function that defines the order
 */
GF.prototype.minByComparator = function (comparator) {
    let first = this.next();
    if (first.done) return undefined;

    let target = first.value;

    do {
        let { value, done } = this.next();
        if (done) break;

        if (comparator(value, target) < 0) target = value;
    } while (true);

    return target;
}

/**
 * Find max value in Generator
 * 
 * @param {Function} comparator Specifies a function that defines the order
 */
GF.prototype.maxByComparator = function (comparator) {
    return this.minByComparator((a, b) => -comparator(a, b));
}

GF.compare = function (a, b) {
    if (a === b) return 0;
    if (!Array.isArray(a) || !Array.isArray(b)) {
        if (a > b || b === void 0) return 1;
        if (a < b || a === void 0) return -1;
        return 0;
    }
    for (let [x, y] of Array.izip(a, b)) {
        c = GF.compare(x, y);
        if (c != 0) return c;
    }
    return a.length - b.length;
}

/**
 * Same `Math.min`.
 * 
 * @param {Function} [callback] 
 */
GF.prototype._minMax = function (callback, isMin = true, includeIndex = false) {
    let first = this.next();
    if (first.done) return undefined;

    callback = _getCallback(callback, true) || defaultCallback;
    let index = 0;

    let target = first.value;
    let targetResult = callback(target, index, this);
    let targetIndex = index++;
    let direct = isMin ? 1 : -1;
    do {
        let { value, done } = this.next();
        if (done) break;

        let newResult = callback(value, index, this);
        let c = GF.compare(targetResult, newResult)

        if (direct * c > 0) {
            target = value;
            targetResult = newResult;
            targetIndex = index;
        }
        index++;
    } while (true);

    return includeIndex ? [target, targetIndex] : target;
}

GF.prototype.minBy = function (callback, includeIndex = false) {
    return this._minMax(callback, true, includeIndex);
}

GF.prototype.argMinBy = function (callback) {
    let [_, index] = this.minBy(callback, includeIndex = true);
    return index;
}

GF.prototype.min = function (includeIndex = false) {
    return this.minBy(undefined, includeIndex);
}

GF.prototype.argMin = function () {
    return this.argMinBy(undefined);
}

/**
 * Same `Math.max`.
 * 
 * @param {Function} [callback] 
 */
GF.prototype.maxBy = function (callback, includeIndex = false) {
    return this._minMax(callback, false, includeIndex);
}

GF.prototype.argMaxBy = function (callback) {
    let [_, index] = this.max(callback, includeIndex = true);
    return index;
}

GF.prototype.max = function (includeIndex = false) {
    return this.maxBy(undefined, includeIndex);
}

GF.prototype.argMax = function () {
    return this.argMaxBy(undefined);
}


/**
 * Sum all Number in GeneratorFunction.
 * The element in GeneratorFunction must be Number
 * @return {Number}
 */
GF.prototype.sum = function () {
    let total = 0;
    for (let v of this) total += v;
    return total;
}

/**
 * Avg all number of item in GeneratorFunction
 * 
 * @return {Number}
 */
GF.prototype.avg = function () {
    let total = 0.0, index = 0;
    for (let v of this) {
        total += v, index++;
    }
    return total / index;
}

/**
 * Round avg of all item in Generator
 * 
 * @return {Number}
 */
GF.prototype.round_avg = function () {
    return Math.round(this.avg());
}

/**
 * Same `Array.map`.
 * 
 * @param {Function} callback 
 */
GF.prototype.imap = function* (callback, toArray = false) {
    callback = _getCallback(callback, toArray);
    let index = 0;
    for (let v of this) {
        yield callback(v, index++, this);
    }
}

GF.prototype.imapBy = GF.prototype.imap;

/**
 * Same `Array.map`.
 * 
 * @param {Function} callback 
 */
GF.prototype.map = function (callback, toArray = false) {
    return [...this.imap(callback, toArray)];
}

GF.prototype.mapBy = GF.prototype.map;

/**
 * Same python `zip`
 * 
 * @param {Array<GeneratorFunction|Array>} iterables 
 */
GF.izip = function* (...iterables) {
    let iterators = iterables
        .map(it => Array.isArray(it) ? it[Symbol.iterator]() : it);

    while (true) {
        let nexts = iterators.map(it => it.next());
        if (nexts.some(n => n.done)) break;
        yield nexts.map(n => n.value);
    }
}

/**
 * zip to Array 
 * 
 * @param {...Array} iterables 
 */
GF.zip = (...iterables) => [...GF.izip(...iterables)];

/**
 * One chunk
 * 
 * @param {Number} size 
 */
GF.prototype.once = function* (size) {
    while (size--) {
        let { value, done } = this.next();
        if (done) break;
        yield value;
    }
}

GF.repeat = function* (value, repeat = undefined) {
    let count = 0;
    while (count++ !== repeat) yield value;
}

/**
 * Same `lodash.chunk but return GeneratorFunction instead of Array
 * 
 * @param {Number} size 
 */
GF.prototype.ichunk = function* (size) {
    let sizes = (typeof size == 'number') ? GF.repeat(size) : size;
    for (let size of sizes) {
        let once = [...this.once(size)];
        if (!once.length) break;
        yield once;
    }
}

GF.prototype.chunk = function (size) {
    return [...this.ichunk(size)];
}

/**
 * 
 * @param {Array<GeneratorFunction|Array>} iterables 
 */
GF.ichain = function* (...iterables) {
    for (let it of iterables) {
        for (let e of it)
            yield e;
    }
}

GF.chain = (...iterables) => [...GF.ichain(...iterables)];

/**
 * Same python `range` function but return GeneratorFunction instead of list(Array).
 * 
 * @param {*} args 
 */
GF.irange = function* (...args) {
    let start = 0, stop = 0;
    let step = 1;

    if (args.length === 1) {
        [stop] = args;
    } else if (args.length == 2) {
        [start, stop] = args;
        step = stop > start ? 1 : -1;
    } else {
        [start, stop, step] = args;
        console.log(start,stop,step);
    }

    if (step > 0) {
        for (let i = start; i < stop; i += step)
            yield i;
    } else {
        for (let i = start; i > stop; i += step)
            yield i;
    }
}

GF.range = (...args) => [...GF.irange(...args)];

/**
 * Same `lodash.takeWhile` but return GeneratorFunction.
 * 
 * @param {Function} callback 
 */
GF.prototype.itakeWhile = function* (callback) {
    callback = _decisionCallback(callback) || defaultCallback;
    let index = 0;
    for (let v of this) {
        if (!callback(v, index++, this)) break;
        yield v;
    }
}

GF.prototype.takeWhile = function (callback) {
    return [...this.itakeWhile(callback)];
}

/**
 * Same `lodash.dropWhile` but return GeneratorFunction.
 * 
 * @param {Function} callback 
 */
GF.prototype.idropWhile = function* (callback) {
    callback = _decisionCallback(callback) || defaultCallback;

    let start = false;
    let index = 0;

    for (let v of this) {
        if (!start && !callback(v, index++, this))
            start = true;

        if (start) yield v;
    }
}

GF.prototype.dropWhile = function (callback) {
    return [...this.idropWhile(callback)];
}

/**
 * Same `Array.find`
 * 
 * @param {Function} callback 
 */
GF.prototype.find = function (callback) {
    callback = _decisionCallback(callback);
    let index = 0;
    for (let v of this) {
        if (callback(v, index++, this))
            return v;
    }
    return undefined;
}

/**
 * Same `Array.findIndex`
 * 
 * @param {Function} callback 
 */
GF.prototype.findIndex = function (callback) {
    callback = _decisionCallback(callback);
    let index = 0;
    for (let v of this) {
        if (callback(v, index, this))
            return index;

        index++;
    }
    return -1;
}

/**
 * 
 * @param {Function} callback 
 */
GF.prototype.first = function (callback) {
    return this.find(callback || (v => 1));
}

/**
 * Same `Array.filter` but return GeneratorFunction
 * 
 * @param {Function} callback 
 */
GF.prototype.ifilter = function* (callback) {
    callback = _decisionCallback(callback);
    let index = 0;
    for (let v of this) {
        if (callback(v, index++, this))
            yield v;
    }
}

GF.prototype.ifilterBy = GF.prototype.ifilter;

GF.prototype.filter = function (callback) {
    return [...this.ifilter(callback)];
}

GF.prototype.filterBy = GF.prototype.filter;

/**
 * Same as `Array.some` 
 * 
 * @param {Function} [callback] 
 * 
 */
GF.prototype.some = function (callback) {
    callback = _decisionCallback(callback) || defaultCallback;
    let index = 0;
    for (let v of this) {
        console.log('v',v);
        if (callback(v, index++, this)) {
            return true;
        }
    }
    return false;
}

/**
 * Same as `Array.every`.
 * 
 * @param {Function} [callback] 
 */
GF.prototype.every = function (callback) {
    return !this.some(callback);
}




/**
 * Same as `Array.slice`
 * 
 * @param {Number} begin  
 * @param {Number} [end] 
 */
GF.prototype.islice = function* (begin, end) {
    if (begin >= end && end !== void 0) return;

    let index = 0;
    for (let v of this) {
        if (index++ < begin) continue;
        if ((end || end === 0) && index > end) break;
        yield v;
    }
}

GF.prototype.iskip = function (count) {
    return this.islice(count);
}

GF.prototype.itake = function (count) {
    return this.islice(0, count);
}

GF.prototype.slice = function (begin, end) {
    return [...this.islice(begin, end)];
}

GF.prototype.skip = function (count) {
    return this.slice(count);
}

GF.prototype.take = function (count) {
    return this.slice(0, count);
}


/**
 * Group element by key from execute `callback` function.
 * 
 * @param {Function} [callback] Function to execute for each element
 */
GF.prototype.groupBy = function (callback) {
    callback = _getCallback(callback) || defaultCallback;
    let groups = {};
    let index = 0;

    for (let it of this) {
        let key = callback(it, index++, this);
        let group = groups[key] = groups[key] || [];
        group.push(it);
    }
    return groups;
}


GF.prototype.partition = function (callback) {
    return Object.values(this.groupBy(callback));
}

/**
 * Counting element by key from execute `callback` function.
 * 
 * @param {Function} [callback] Function to execute for each element
 */
GF.prototype.countBy = function (callback) {
    callback = _getCallback(callback) || defaultCallback;
    let groups = {};
    let index = 0;
    for (let it of this) {
        let key = callback(it, index++, this);
        groups[key] = groups[key] || 0;
        groups[key]++;
    }
    return groups;
}

/**
 * Distinct element GeneratorFunction
 * 
 * @param {Function} [callback] Function to execute for each element
 */
GF.prototype.idistinct = function* (callback) {
    callback = _getCallback(callback) || defaultCallback;

    let index = 0;
    let s = new Set();

    for (let item of this) {
        let key = callback(item, index++, this);

        if (s.has(key)) continue;

        s.add(key);
        yield item;
    }
}

GF.prototype.idistinctBy = GF.prototype.idistinct;

GF.prototype.distinct = function (callback) {
    return [...this.idistinct(callback)];
}

GF.prototype.distinctBy = GF.prototype.distinct;

module.exports = GF;

GF.zipObject = function (keys, values) {
    let o = {};

    GF
        .izip(keys, values)
        .forEach(([p, v]) => o[p] = v)

    return o;
}

GF.prototype.iassignProbs = function (probs) {
    let keys = Object.keys(probs);
    let gvalues = Object.values(probs);
    return Array
        .izip(this, ...gvalues)
        .imap(([o, ...values]) => {
            Object.assign(o, GF.zipObject(keys, values));
            return o;
        })
}

GF.prototype.assignProbs = function (probs) {
    return [...this.iassignProbs(probs)];
}



