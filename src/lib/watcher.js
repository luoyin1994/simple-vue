import {
    isObject,
    isArray,
    broadcast
} from './index';

/**
 * 监听 data ，分别执行 observers 中的函数，并将 data 的属性双向绑定到 target 上
 * @param target
 * @param data
 * @returns {*}
 */
export function watcher(target, data) {
    for (let key in data) {
        Object.defineProperty(target, key, {
            get () {
                return data[key];
            },
            set (value) {
                if (data[key] === value) return;
                data[key]   = value;
                target[key] = value;
                broadcast.call(target);
            }
        });
    }
}