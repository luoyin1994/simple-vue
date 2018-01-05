import {
    isObject,
    isArray
} from './index';

/**
 * 监听 data ，分别执行 observers 中的函数，并将 data 的属性双向绑定到 target 上
 * @param target
 * @param data
 * @param observers
 * @returns {*}
 */
export function watcher(target, data, observers) {
    for (let key in data) {
        Object.defineProperty(target, key, {
            get () {
                return data[key];
            },
            set (value) {
                if (data[key] === value) return;
                data[key]   = value;
                target[key] = value;
                observers.forEach(observer => observer(data));
            }
        });
    }
}

/**
 * 监听 data 并分别执行 observers 中的函数
 * @param data {Object}
 * @param observers {Array|Set} 函数数组
 * @returns {Proxy}
 */
export function watcher1(data, observers) {
    return new Proxy(data, {
        set (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            observers.forEach(observer => observer(data));
            return result;
        }
    });
}