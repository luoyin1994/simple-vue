const VIRTUAL_NODE_TYPE = 'virtualNode';

/**
 * 验证类型
 * @param value
 * @returns {Buffer|Array.<T>|string|Blob|ArrayBuffer}
 */
function type(value) {
    return ({}).toString.call(value).slice(8, -2);
}

function isString(value) {
    return type(value) === 'string';
}

function isObject(value) {
    return type(value) === 'object';
}

function isArray(value) {
    return type(value) === 'array';
}

function isEmpty(value) {
    return value == null;
}

/**
 * 创建虚拟节点
 * @param nodeName
 * @param nodeAttr
 * @param nodeChildren
 * @returns {{nodeName: String, nodeAttr: {}, nodeChildren: Array}}
 */
export function createVirtualNode(nodeName = '', nodeAttr = {}, nodeChildren = []) {
    if (!isString(nodeName)) {
        throw new TypeError('arguments[0] should be a string.');
    }

    if (isEmpty(nodeAttr)) nodeAttr = {};
    if (isEmpty(nodeChildren)) nodeChildren = [];

    if (!isObject(nodeAttr)) {
        throw new TypeError('arguments[1] should be an object.');
    }
    if (!isEmpty(nodeChildren) && !isArray(nodeChildren)) {
        throw new TypeError('arguments[2] should be an array.');
    }

    if (nodeChildren.length) {
        nodeChildren.forEach(child => child = createVirtualNode(child.nodeName, child.nodeAttr, child.nodeChildren));
    }

    return {
        nodeName,
        nodeAttr,
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
    Object.keys(virtualNode.nodeAttr).forEach(attr => {
        if (attr !== undefined) {
            realNode[attr] = virtualNode[attr];
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