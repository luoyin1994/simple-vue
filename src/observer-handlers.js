/**
 * 每次监测的数据变动后执行的函数
 * @param observe {Function}
 */
export function observerHandlers(observe) {
    observe(data => console.log(`data had changed: {a: ${data.a}, b: ${data.b}}.`));
    observe(data => console.log(`{a: ${data.a}, b: ${data.b}}`));
}
