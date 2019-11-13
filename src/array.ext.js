const GF = require('./generator.ext');
const { _decisionCallback, _getCallback } = require('./callback')

Array.prototype.sum = function () {
    return this.toGenerator().sum();
}

Array.prototype.avg = function () {
    return this.toGenerator().sum();
}


Array.prototype.round_avg = function () {
    return this.toGenerator().round_avg();
}

Array.izip = GF.izip;
Array.zip = GF.zip;

Array.repeat = GF.repeat;


Array.ichain = GF.ichain;
Array.chain = GF.chain;


Array.prototype.imap = function (callback) {
    return this.toGenerator().imap(callback);
}

Array.prototype.imapBy = Array.prototype.imap;

Array.prototype.mapBy = function (callback, toArray = false) {
    return this.toGenerator().mapBy(callback, toArray);
}

Array.prototype.ichunk = function (size) {
    return this.toGenerator().ichunk(size);
}

Array.prototype.chunk = function (size) {
    return this.toGenerator().chunk(size);
}

Array.dict = function (pairs) {
    let d = {};
    for (let [key, value] of pairs) {
        d[key] = value;
    }

    return d;
}

Array.prototype.toDict = function (callback) {
    let d = {};
    this.forEach((item, ...args) => {
        let key = callback(item, ...args);
        d[key] = item;
    });
    return d;
}

Array.object = Array.dict;

//map to Object
Object.dict = Array.dict;


Array.irange = GF.irange;
Array.range = GF.range;

Array.prototype.ifilter = function (callback) {
    return this.toGenerator().ifilter(callback);
}
Array.prototype.ifilterBy = Array.prototype.ifilter;

Array.prototype.filterBy = function (callback) {
    return this.toGenerator().filterBy(callback)
}


Array.prototype.groupBy = function (callback) {
    return this.toGenerator().groupBy(callback);
}

Array.prototype.countBy = function (callback) {
    return this.toGenerator().countBy(callback);
}

Array.prototype.minBy = function (callback, includeIndex = false) {
    return this.toGenerator().minBy(callback, includeIndex);
}

Array.prototype.min = function (includeIndex = false) {
    return this.toGenerator().min(includeIndex);
}

Array.prototype.argMinBy = function (callback) {
    return this.toGenerator().argMinBy(callback);
}

Array.prototype.argMin = function () {
    return this.toGenerator().argMin();
}

Array.prototype.maxBy = function (callback, includeIndex = false) {
    return this.toGenerator().maxBy(callback, includeIndex);
}

Array.prototype.max = function (includeIndex = false) {
    return this.toGenerator().max(includeIndex);
}

Array.prototype.argMaxBy = function (callback) {
    return this.toGenerator().argMaxBy(callback);
}

Array.prototype.argMax = function () {
    return this.toGenerator().argMax();
}

Array.prototype.idistinct = function (callback) {
    return this.toGenerator().idistinct(callback);
}

Array.prototype.idistinctBy = Array.prototype.idistinct;

Array.prototype.distinct = function (callback) {
    return this.toGenerator().distinct(callback);
}
Array.prototype.distinctBy = Array.prototype.distinct;

Array.prototype.shuffle = function () {
    let ret = [...this];
    for (let i = ret.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret;
}

/**
 * get the first item of array
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Array.prototype.first = function (callback = undefined) {
    return this.find(callback || (v => 1));
}

Array.prototype.firstBy = Array.prototype.first;

/**
 * get the last item of array
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Array.prototype.last = function (callback = undefined) {
    callback = callback || (v => 1);

    for (let i = this.length - 1; i >= 0; i--) {
        if (callback(this[i], i, this))
            return this[i];
    }
    return undefined;
}
Array.prototype.lastBy = Array.prototype.last;

Array.compare = GF.compare;

Array.prototype.compare = function (b) {
    return Array.compare(this, b);
}


/**
 * Order array by `callback` order function
 * @param  {Function} callback [description]
 * @return {[type]}            [description] 
 */
Array.prototype.orderBy = function (callback = undefined, reverse = false) {
    callback = _getCallback(callback) || (v => v);
    let direct = reverse ? -1 : 1;
    let _withIndex = this.map((e, i) => [e, i]);
    _withIndex.sort(([e1, i1], [e2, i2]) => {
        a = callback(e1, i1, this);
        b = callback(e2, i2, this);
        return Array.compare(a, b) * direct;
    });
    return _withIndex.map(([e]) => e);
}
Array.prototype.sortBy = Array.prototype.orderBy;


GF.prototype.orderBy = function (callback = undefined, reverse = false) {
    return this.toArray().orderBy(callback, reverse);
}

GF.prototype.sortBy = GF.prototype.orderBy;

Array.prototype.skip = function(count){
    return this.slice(count);
}

Array.prototype.iskip = function(count){
    return this.slice(count).toGenerator();
}

Array.prototype.take = function(count){
    return this.slice(0, count);
}

Array.prototype.itake = function(count){
    return this.slice(0, count).toGenerator();
}

Array.prototype.idropWhile = function(callback){
    return this.toGenerator().idropWhile(callback);
}

Array.prototype.dropWhile = function(callback){
    return this.toGenerator().dropWhile(callback);
}

Array.prototype.itakeWhile = function(callback){
    return this.toGenerator().itakeWhile(callback);
}

Array.prototype.takeWhile = function(callback){
    return this.toGenerator().takeWhile(callback);
}