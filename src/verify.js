import validate from "./validate";

class Verify {
    constructor(vm) {
        this.vm = vm
        this.verifyQueue = {}
    }
}

Verify.prototype.validate = function (group) {
    const vm = this.vm
    let verifyQueue
    if (group && this.verifyQueue[group]) {
        verifyQueue = this.verifyQueue[group];
    } else {
        verifyQueue = []
        for (let key of Object.keys(this.verifyQueue)) {
            verifyQueue = [...verifyQueue, ...this.verifyQueue[key]]
        }
    }

    return verifyQueue.map(item => {
        // 校验
        const res = validate(vm._rules, item.strategy, item.config, item.el, vm)
        return res
    }).every(item => item.isAvaliable)
}

export default Verify
