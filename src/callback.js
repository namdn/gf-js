/**
 * 
 * @param {DecisionCallback} predicate callback
 */
function _decisionCallback(predicate) {
    if (predicate === void 0) return predicate;

    if (typeof predicate === 'string' || predicate instanceof String) {
        //string predicate
        callback = v => v[predicate];
    } else if (typeof predicate === "function") {
        //do nothing
        callback = predicate;
    } else if (predicate.constructor == Object) {
        //predicate is object
        callback = (v) => {
            for (let key in predicate) {
                if (v[key] !== predicate[key])
                    return false;
            }
            return true;
        }
    } else {
        throw 'predicate type not supported'
    }
    return callback
}


/**
 * 
 * @param {GetCallback} predicate callback 
 * @param {boolean} [toArray = false] convert to Object or Array
 */
function _getCallback(predicate, toArray = false) {
    if (predicate === void 0) return predicate;
    if (typeof predicate === 'string' || predicate instanceof String) {
        //string predicate
        callback = v => v[predicate];
    } else if (typeof predicate === "function") {
        //do nothing
        callback = predicate;
    } else if (Array.isArray(predicate)) {
        //predicate is array
        callback = (v) => {
            if (toArray)
                return predicate.map(key => v[key]);

            //to object
            o = {};
            predicate.forEach(key => o[key] = v[key]);
            return o;
        }
    } else if (predicate.constructor == Object) {
        callback = (v) => {
            o = {};
            Object.entries(predicate)
                .forEach(([oldKey, newKey]) => o[newKey] = v[oldKey])
            return o;
        }
    } else {
        throw 'predicate type not supported'
    }
    return callback
}


module.exports = {
    _decisionCallback,
    _getCallback
}