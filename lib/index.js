'use strict';

const username = {
  rule: new RegExp('^[a-zA-Z0-9_-]{0,16}$'),
  msg: '必须是1至16位长度的大写字母、小写字母或数字'
};
const password = {
  rule: new RegExp('^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$'),
  msg: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
};
const mobilePhone = {
  rule: new RegExp('^1(3|4|5|7|8)\\d{9}$'),
  msg: '无效的手机号'
};
const identifyCard = {
  rule: new RegExp('^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$'),
  msg: '无效的身份证号'
};
const positiveInt = {
  rule: new RegExp('^\d+$'),
  msg: '必须填入正整数'
};
const negativeInt = {
  rule: new RegExp('^-\d+$'),
  msg: '必须填入负整数'
};
const int = {
  rule: new RegExp('^-?\d+$'),
  msg: '必须填入整数'
};
const email = {
  rule: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  msg: '无效的邮箱地址'
};
const required = {
  rule: {
    test: function (input) {
      return input || input === 0;
    }
  },
  msg: '必填项'
};
const code = {
  rule: new RegExp('^\\d{6}$'),
  msg: '验证码无效'
};
var defaultRules = {
  required,
  username,
  password,
  positiveInt,
  negativeInt,
  int,
  email,
  mobilePhone,
  identifyCard,
  code
};

const insertAfter = (newElement, targetElement) => {
  const parent = targetElement.parentNode; // 如果最后的节点是目标元素，则直接添加

  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
};

const addClass = (node, className) => {
  let classArr = node.className.split(' ');

  if (!classArr.includes(className)) {
    classArr.push(className);
    node.className = classArr.join(' ');
  }
};

const removeClass = (node, className) => {
  let classArr = node.className.split(' ');

  if (classArr.includes(className)) {
    classArr = classArr.filter(val => val !== className);
    node.className = classArr.join(' ');
  }
};

var domUtils = {
  insertAfter,
  addClass,
  removeClass
};

var validate = ((rules, strategy, config, el, vm) => {
  console.dir(el);
  let res = {
    isAvaliable: true,
    msg: null
  };
  let isAvaliable;
  const errNode = el.nextSibling; // 如果是必填项

  if (config.required) {
    isAvaliable = rules['required'].rule.test(el.value);

    if (!isAvaliable) {
      // 警告样式
      if (config.errorToast) {
        errNode.innerHTML = rules['required'].msg;
        domUtils.addClass(errNode, 'inline');
      }

      if (config.warnBorder) {
        domUtils.addClass(el, 'input-error');
      }

      res = {
        isAvaliable,
        msg: rules['required'].msg
      };
      vm.$set(vm.$errors, el.id, res);
      return res;
    }
  } // 如果不需要校验策略


  if (!strategy) {
    vm.$set(vm.$errors, el.id, res);
    return res;
  } // 其它校验


  if (!(strategy in rules)) throw `不存在${strategy}校验策略`;
  strategy = rules[strategy];
  isAvaliable = strategy.rule.test(el.value);

  if (!isAvaliable) {
    // 警告样式
    if (config.errorToast) {
      errNode.innerHTML = rules[strategy].msg;
      domUtils.addClass(errNode, 'inline');
    }

    if (config.warnBorder) {
      domUtils.addClass(el, 'input-error');
    }

    res = {
      isAvaliable,
      msg: strategy.msg
    };
  }

  vm.$set(vm.$errors, el.id, res);
  return res;
});

class Verify {
  constructor(vm) {
    this.vm = vm;
    this.verifyQueue = {};
  }

}

Verify.prototype.validate = function (group) {
  const vm = this.vm;
  let verifyQueue;

  if (group && this.verifyQueue[group]) {
    verifyQueue = this.verifyQueue[group];
  } else {
    verifyQueue = [];

    for (let key of Object.keys(this.verifyQueue)) {
      verifyQueue = [...verifyQueue, ...this.verifyQueue[key]];
    }
  }

  return verifyQueue.map(item => {
    // 校验
    const res = validate(vm._rules, item.strategy, item.config, item.el, vm);
    return res;
  }).every(item => item.isAvaliable);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".validator-error {\n  display: none;\n  color: rgba(245, 108, 108);\n  font-size: 14px;\n}\n\n.validator-error .inline {\n  display: inline-block !important;\n  margin-left: 10px;\n}\n\n.validator-error .block {\n  display: block !important;\n  margin-top: 10px;\n}\n\n.input-error {\n  border: 1px solid #F56C6C !important;\n  box-shadow: 0 2px 2px 0 rgba(245, 108, 108, 0.16), 0 0 0 1px rgba(245, 108, 108, 0.08) !important;\n}\n";
styleInject(css);

let blurCb, focusCb;
const defaultConfig = {
  required: false,
  sync: false,
  focus: false
};
var index = {
  install(Vue, {
    blur = true,
    customRules = {},
    errorToast = false,
    warnBorder = true
  } = {}) {
    const rules = Object.assign({}, defaultRules, customRules);
    Vue.prototype._rules = rules;
    Vue.mixin({
      beforeCreate: function () {
        Vue.util.defineReactive(this, '$verify', new Verify(this));
        Vue.util.defineReactive(this, '$errors', {});
      }
    });
    Vue.directive('verify', {
      // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      bind: function () {},
      // 当被绑定的元素插入到 DOM 中时。
      inserted: function (el, binding, vnode) {
        // 校验策略
        const strategy = binding.arg; // 获取配置

        const config = Object.assign({}, defaultConfig, binding.modifiers, {
          errorToast,
          warnBorder
        }); // 获取当前Vue实例

        const vm = vnode.context;
        const value = binding.value ? binding.value : {};

        if (errorToast) {
          // 创建错误显示节点
          var errNode = document.createElement('span');
          domUtils.addClass(errNode, 'validator-error');
          domUtils.insertAfter(errNode, el);
        }

        blurCb = e => validate(rules, strategy, config, el, vm);

        focusCb = e => {
          if (errorToast) domUtils.removeClass(errNode, 'inline');
          if (warnBorder) domUtils.removeClass(el, 'input-error');
          if (vm.$errors[el.id]) vm.$delete(vm.$errors, el.id);
        };

        if (blur) {
          // 失去焦点校验
          el.addEventListener('blur', blurCb);
        }

        if (config.focus) {
          // 获取焦点取消警告样式
          el.addEventListener('focus', focusCb);
        } // 如果开启了同步校验


        if (config.sync && blur) {
          // 输入同步校验
          el.addEventListener('input', blurCb);
        } // group初始化


        const group = value.group;

        if (vm.$verify.verifyQueue[group]) {
          vm.$verify.verifyQueue[group].push({
            el,
            strategy,
            config,
            value
          });
        } else {
          vm.$verify.verifyQueue[group] = [];
          vm.$verify.verifyQueue[group].push({
            el,
            strategy,
            config,
            value
          });
        }
      },
      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
      update: function () {},
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      componentUpdated: function () {},
      // 只调用一次，指令与元素解绑时调用。
      unbind: function (el) {
        el.removeEventListener('blur', blurCb);
        el.removeEventListener('focus', focusCb);
        el.addEventListener('input', blurCb);
      }
    });
  }

};

module.exports = index;
//# sourceMappingURL=index.js.map
