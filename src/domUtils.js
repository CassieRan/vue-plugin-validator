const insertAfter = (newElement, targetElement) => {
    const parent = targetElement.parentNode;
    // 如果最后的节点是目标元素，则直接添加
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

const addClass = (node, className) => {
    let classArr = node.className.split(' ')
    if (!classArr.includes(className)) {
        classArr.push(className)
        node.className = classArr.join(' ')
    }
}

const removeClass = (node, className) => {
    let classArr = node.className.split(' ')
    if (classArr.includes(className)) {
        classArr = classArr.filter(val => val !== className)
        node.className = classArr.join(' ')
    }
}

export default {
    insertAfter,
    addClass,
    removeClass
}
