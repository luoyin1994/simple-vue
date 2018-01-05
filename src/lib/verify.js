/**
 * 验证类型
 * @param value
 * @returns {Buffer|Array.<T>|string|Blob|ArrayBuffer}
 */
export function type(value) {
    return ({}).toString.call(value).slice(8, -1).toLowerCase();
}

export function isString(value) {
    return type(value) === 'string';
}

export function isObject(value) {
    return type(value) === 'object';
}

export function isSet(value) {
    return type(value) === 'set';
}

export function isMap(value) {
    return type(value) === 'map';
}

export function isArray(value) {
    return type(value) === 'array';
}

export function isFunction(value) {
    return type(value) === 'function';
}

export function isEmpty(value) {
    return value == null;
}

export function isArrayLike(value) {
    return isArray(value) || isSet(value) || isMap(value);
}