import {
    createVirtualNode,
    createRealNode,
    bindToRealDOM,
    replaceChild
} from './lib';

let virtualNodes = {};
let realNodes    = {};

/**
 * 每次监测的数据变动后执行的函数
 * @param observe {Function}
 */
export const observerHandlers = {
    createDiv: function(fnName) {
        let virtualNode = createVirtualNode('div', {id: 'div'}, [
            [
                'div', {id: 'div1'},
                [
                    ['span', {innerHTML: `我是div1中的span，我的值是data中的a：${this.a}`}]
                ]
            ],
            [
                'div', {id: 'div2'},
                [
                    ['span', {innerHTML: `我是div2中的span，我的值是data中的b：${this.b}`}]
                ]
            ]
        ]);

        let realNode = createRealNode(virtualNode);

        if (virtualNodes[fnName]) {
            console.log(realNode);
            console.log(realNodes[fnName]);
            replaceChild('app', realNode, realNodes[fnName]);
        }
        else {
            bindToRealDOM('app', realNode);
        }
        virtualNodes[fnName] = virtualNode;
        realNodes[fnName]    = realNode;
    }
};
