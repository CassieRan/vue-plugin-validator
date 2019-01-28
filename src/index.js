import defaultRules from './rules'
import domUtils from './domUtils'
import validate from './validate'
import Verify from './verify'
import './style.css'

let blurCb, focusCb
const defaultConfig = {
    required: false,
    sync: false,
    focus: false,
}

export default {
    install(Vue, {
        blur = true,
        customRules = {},
        errorToast = false,
        warnBorder = true
    } = {}) {
        const rules = Object.assign({}, defaultRules, customRules)
        Vue.prototype._rules = rules

        Vue.mixin({
            beforeCreate: function () {
                Vue.util.defineReactive(this, '$verify', new Verify(this))
                Vue.util.defineReactive(this, '$errors', {})
            }
        })
        Vue.directive('verify', {
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind: function () {
            },
            // 当被绑定的元素插入到 DOM 中时。
            inserted: function (el, binding, vnode) {

                // 校验策略
                const strategy = binding.arg
                // 获取配置
                const config = Object.assign({}, defaultConfig, binding.modifiers, {
                    errorToast,
                    warnBorder
                })
                // 获取当前Vue实例
                const vm = vnode.context
                const value = binding.value ? binding.value : {}

                if (errorToast) {
                    // 创建错误显示节点
                    var errNode = document.createElement('span')
                    domUtils.addClass(errNode, 'validator-error')
                    domUtils.insertAfter(errNode, el)
                }

                // 保存回调函数，解绑事件时用到
                blurCb = e => validate(rules, strategy, config, el, vm)
                focusCb = e => {
                    if (errorToast) domUtils.removeClass(errNode, 'inline')
                    if (warnBorder) domUtils.removeClass(el, 'input-error')
                    if (vm.$errors[el.id]) vm.$delete(vm.$errors, el.id)
                }

                if (blur) {
                    // 失去焦点校验
                    el.addEventListener('blur', blurCb)
                }

                if (config.focus) {
                    // 获取焦点取消警告样式
                    el.addEventListener('focus', focusCb)
                }

                // 如果开启了同步校验
                if (config.sync && blur) {
                    // 输入同步校验
                    el.addEventListener('input', blurCb)
                }

                // group初始化
                const group = value.group
                if (vm.$verify.verifyQueue[group]) {
                    vm.$verify.verifyQueue[group].push({el, strategy, config, value});
                } else {
                    vm.$verify.verifyQueue[group] = [];
                    vm.$verify.verifyQueue[group].push({el, strategy, config, value});
                }
            },
            // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
            update: function () {
            },
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
            componentUpdated: function () {
            },
            // 只调用一次，指令与元素解绑时调用。
            unbind: function (el) {
                el.removeEventListener('blur', blurCb)
                el.removeEventListener('focus', focusCb)
                el.addEventListener('input', blurCb)
            }
        })
    }
}
