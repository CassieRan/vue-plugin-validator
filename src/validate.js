import domUtils from "./domUtils";

export default (rules, strategy, config, el, vm) => {
    console.dir(el)
    let res = {
        isAvaliable: true,
        msg: null
    }
    let isAvaliable
    const errNode = el.nextSibling
    // 如果是必填项
    if (config.required) {
        isAvaliable = rules['required'].rule.test(el.value)
        if (!isAvaliable) {
            // 警告样式
            if (config.errorToast) {
                errNode.innerHTML = rules['required'].msg
                domUtils.addClass(errNode, 'inline')
            }
            if (config.warnBorder) {
                domUtils.addClass(el, 'input-error')
            }
            res = {
                isAvaliable,
                msg: rules['required'].msg
            }
            vm.$set(vm.$errors, el.id, res)
            return res
        }
    }

    // 如果不需要校验策略
    if (!strategy) {
        vm.$set(vm.$errors, el.id, res)
        return res
    }

    // 其它校验
    if (!(strategy in rules)) throw `不存在${strategy}校验策略`
    strategy = rules[strategy]
    isAvaliable = strategy.rule.test(el.value)
    if (!isAvaliable) {
        // 警告样式
        if (config.errorToast) {
            errNode.innerHTML = rules[strategy].msg
            domUtils.addClass(errNode, 'inline')
        }
        if (config.warnBorder) {
            domUtils.addClass(el, 'input-error')
        }
        res = {
            isAvaliable,
            msg: strategy.msg
        }
    }
    vm.$set(vm.$errors, el.id, res)
    return res
}
