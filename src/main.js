import {watcher,} from './lib';
import {observerHandlers} from './observer-handlers';

export default function(options) {
    let _options = Object.assign({
        data: {a: 1, b: 2}
    }, options);

    _init();

    function _init() {
        const observers = new Set();
        const observe   = fn => observers.add(fn);
        observerHandlers(observe);
        window.data = watcher(_options.data, observers);







    }

}
