import domUtils from "./domUtils";

export default (rules, strategy, config, el) => {
    const errNode = el.nextSibling
    let isAvaliable
    // 如果是必填项
    if (config.required) {
        isAvaliable = rules['required'].rule.test(el.value)
        if (!isAvaliable) {
            // 警告样式
            errNode.innerHTML = rules['required'].msg
            domUtils.addClass(errNode, 'inline')
            domUtils.addClass(el, 'input-error')
            return {
                isAvaliable,
                msg: rules['required'].msg
            }
        }
    }

    // 其它校验
    if (!(strategy in rules)) throw `不存在${strategy}校验策略`
    strategy = rules[strategy]
    isAvaliable = strategy.rule.test(el.value)
    if (!isAvaliable) {
        // 警告样式
        errNode.innerHTML = strategy.msg
        domUtils.addClass(errNode, 'inline')
        domUtils.addClass(el, 'input-error')
    }

    return {
        isAvaliable,
        msg: strategy.msg
    }
}
