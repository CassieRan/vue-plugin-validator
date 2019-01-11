## 仓库

## 安装

暂省略，待搭建npm私服

## 快速开始

```javascript
// main.js

import Vue from 'vue'
// import Validator from 'vue-validator'
import validator from '@/assets/validator'
 
Vue.use(validator)
```



```vue
// App.vue
<template xmlns:v-verify="http://www.w3.org/1999/xhtml">
    <div>
        <div><label for="username">用户名：</label><input id="username" type="text" v-verify:username.required.sync="{group: 'login'}" v-model="username"></div>
        <div><label for="password">手机号：</label><input id="password" type="text" v-verify:password.required="{group: 'login'}" v-model="password"></div>
        <button @click="commit">登录</button>
    </div>
</template>

<script>
    export default {
        name: "demo",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            commit() {
                const isAvaliable = this.$verify.validate('login')
                if (isAvaliable) {
                    // login option...
                }
            }
        }
    }
</script>

<style scoped lang="less">
    label {
        display: inline-block;
        width: 80px;
    }
    input {
        box-sizing: border-box;
        background: #fff;
        border-radius: 2px;
        border: none;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
        height: 44px;
        margin: 20px auto;
        width: 200px;
        outline: none;
    }

    button {
        display: block;
        box-sizing: border-box;
        background: #CE3C39;
        color: #fff;
        border-radius: 2px;
        border: none;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
        height: 44px;
        margin: 20px auto;
        width: 100px;
    }
</style>
```

- ## 使用

1. 安装插件：`Vue.use(validator[, options])`

- options.blur: Boolean, default `true`. 是否在失去光标时警告。

- options.rules: Object, default `{}`. 自定义检验规则，如与内置检验规则重名，则会覆盖。

  ```javascript
  Vue.use(validator, {
      blur: false,
      rules: {
      	mobilePhone: {
              rule: new RegExp('^1(3|4|5|7|8)\\d{9}$'),
              msg: '无效的手机号'
          }
      }
  })
  ```

2. `v-verify`指令

- 参数：检验策略，例如：username、password、mobilePhone

- 修饰符：
  - required: 必填
  - sync: 输入事件发生时同步检验

- 绑定值：Object, 可选
  - group: 表单组名，可选，为了提交表单时进行校验

示例：`v-verify:username.required.sync="{group: 'login'}"`意为输入时检验是否为空，是否符合username规则并将其归为'login'表单组。

3. 内置检验策略(待完善)

- ```javascript
  required: {
      rule: {
          test: function (input) {
              return input || input === 0
          }
      },
      msg: '*必填项'
  }
  
  username: {
      rule: new RegExp('^[a-zA-Z0-9_-]{0,16}$'),
      msg: '必须是1至16位长度的大写字母、小写字母或数字'
  }
  
  password: {
      rule: new RegExp('^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$'),
      msg: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
  }
  
  positiveInt: {
      rule: new RegExp('^\d+$'),
      msg: '必须填入正整数'
  }
  
  negativeInt: {
      rule: new RegExp('^-\d+$'),
      msg: '必须填入负整数'
  }
  
  int: {
      rule: new RegExp('^-?\d+$'),
      msg: '必须填入整数'
  }
  
  email: {
      rule: new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$'),
      msg: '无效的邮箱地址'
  }
  
  mobilePhone: {
      rule: new RegExp('^1(3|4|5|7|8)\\d{9}$'),
      msg: '无效的手机号'
  }
  
  identifyCard: {
      rule: new RegExp('^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$'),
      msg: '无效的身份证号'
  }
  ```

4. 统一校验表单组`vm.$verify.validate([group])`

   校验'group'组的所有表单元素，返回值为Boolean，如为true校验通过，如为false校验不通过





