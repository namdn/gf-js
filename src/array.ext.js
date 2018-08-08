const GF = require('./generator.ext');

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


Array.ichain = GF.ichain;
Array.chain = GF.chain;

Array.prototype.ichunk = function (size) { return  this.toGenerator().ichunk(size); }
Array.prototype.chunk = function (size) { return this.toGenerator().chunk(size); }

Array.dict = function (pairs) {
    let d = {};
    for (let [key, value] of pairs) {
        d[key] = value;
    }

    return d;
}

Array.toDict = function (callback) {
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

Array.prototype.groupBy = function (callback) {
    return this.toGenerator().groupBy(callback);
}

Array.prototype.countBy = function (callback) {
    return this.toGenerator().countBy(callback);
}

Array.prototype.idistinct = function (callback) {
    return this.toGenerator().idistinct(callback);
}

Array.prototype.distinct = function (callback) {
    return this.toGenerator().distinct(callback);
}

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