const insertAfter = (newElement, targetElement) => {
    const parent = targetElement.parentNode;
    // 如果最后的节点是目标元素，则直接添加
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

const trim = string => {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}
const hasClass=(el, cls) => {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

const addClass = (el, cls) =>{
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    let i = 0, j = classes.length;
    for (; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};
const removeClass = (el, cls) =>{
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    let i = 0, j = classes.length;
    for (; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
};

export default {
    insertAfter,
    addClass,
    removeClass
}
