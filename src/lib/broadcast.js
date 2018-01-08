import {observerHandlers} from '../observer-handlers';

export function broadcast() {
    // 绑定数据变动后的观察者处理函数
    Object.keys(observerHandlers).forEach(fnName => observerHandlers[fnName].call(this, fnName));
}