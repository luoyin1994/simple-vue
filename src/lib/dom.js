const VIRTUAL_NODE_TYPE = 'virtualNode';

import {
    isEmpty,
    isString,
    isObject,
    isArray
} from './index';

/**
 * 创建虚拟节点
 * @param nodeName
 * @param nodeAttributes
 * @param nodeChildren
 * @returns {{nodeName: String, nodeAttributes: {}, nodeChildren: Array}}
 */
export function createVirtualNode(nodeName = '', nodeAttributes = {}, nodeChildren = []) {
    if (!isString(nodeName)) {
        throw new TypeError('arguments[0] should be a string.');
    }

    if (isEmpty(nodeAttributes)) nodeAttributes = {};
    if (isEmpty(nodeChildren)) nodeChildren = [];

    if (!isObject(nodeAttributes)) {
        throw new TypeError('arguments[1] should be an object.');
    }
    if (!isEmpty(nodeChildren) && !isArray(nodeChildren)) {
        throw new TypeError('arguments[2] should be an array.');
    }

    if (nodeChildren.length) {
        nodeChildren.forEach((child, i) => {
            if (isObject(child)) {
                nodeChildren[i] = createVirtualNode(child.nodeName, child.nodeAttributes, child.nodeChildren);
            }
            if (isArray(child)) {
                nodeChildren[i] = createVirtualNode(child[0], child[1], child[2]);
            }
        });
    }

    return {
        nodeName,
        nodeAttributes,
        nodeChildren
    };
}

/**
 * 创建真实节点
 * @param virtualNode
 * @returns {Element}
 */
export function createRealNode(virtualNode) {
    let realNode = document.createElement(virtualNode.nodeName);
    Object.keys(virtualNode.nodeAttributes).forEach(attr => {
        if (attr !== undefined) {
            realNode[attr] = virtualNode.nodeAttributes[attr];
        }
    });
    if (virtualNode.nodeChildren.length) {
        virtualNode.nodeChildren.forEach(child => {
            realNode.appendChild(createRealNode(child));
        });
    }
    return realNode;
}

/**
 * 绑定到真实的 DOM 节点上
 * @param targetID 目标 ID
 * @param realNode
 */
export function bindToRealDOM(targetID, realNode) {
    const target = document.getElementById(targetID);
    target.appendChild(realNode);
}

/**
 * 替换节点
 * @param newNode
 * @param oldNode
 * @returns {Node}
 */
export function replaceChild(targetID, newNode, oldNode) {
    const target = document.getElementById(targetID);
    return target.replaceChild(newNode, oldNode);
}