export function watcher(data, observers) {
    return new Proxy(data, {
        set (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            observers.forEach(observer => observer(data));
            return result;
        }
    });
}