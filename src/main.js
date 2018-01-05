import {
    watcher,
    isArrayLike,
    isFunction,
    isObject
} from './lib';
import {observerHandlers} from './observer-handlers';

export default class Vue {
    constructor(options) {
        this._assign(options);
        this._init();
        this._bindToThis();
    }

    // 赋值
    _assign(options) {
        this.$data    = options.data || {};
        this.$methods = options.methods || {};
    }

    _bindToThis() {
        Object.assign(this, this.$methods);
    }

    _init() {
        const observers = new Set();
        const observe   = fn => observers.add(fn);
        observerHandlers(observe);
        watcher(this, this.$data, observers);
    }
}
