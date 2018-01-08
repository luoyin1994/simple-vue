import {watcher} from './lib';

export default class Vue {
    constructor(options) {
        this._assign(options);
        this._init();
    }

    // 赋值
    _assign(options) {
        this.$data    = options.data || {};
        this.$methods = options.methods || {};
    }

    _init() {
        // 监听并绑定 data 到 this
        watcher(this, this.$data);
        // 绑定 methods 到 this
        Object.assign(this, this.$methods);
    }
}
