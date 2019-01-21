const username = {
    rule: new RegExp('^[a-zA-Z0-9_-]{0,16}$'),
    msg: '必须是1至16位长度的大写字母、小写字母或数字'
}

const password = {
    rule: new RegExp('^.*(?=.{6,})(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$'),
    msg: '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
}

const mobilePhone = {
    rule: new RegExp('^1(3|4|5|7|8)\\d{9}$'),
    msg: '无效的手机号'
}

const identifyCard = {
    rule: new RegExp('^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$'),
    msg: '无效的身份证号'
}


const positiveInt = {
    rule: new RegExp('^\d+$'),
    msg: '必须填入正整数'
}


const negativeInt = {
    rule: new RegExp('^-\d+$'),
    msg: '必须填入负整数'
}


const int = {
    rule: new RegExp('^-?\d+$'),
    msg: '必须填入整数'
}


const email = {
    rule: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    msg: '无效的邮箱地址'
}

const required = {
    rule: {
        test: function (input) {
            return input || input === 0
        }
    },
    msg: '必填项'
}

const code = {
    rule: new RegExp('^\\d{6}$'),
    msg: '验证码无效'
}


export default {
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
}

