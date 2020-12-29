/* eslint-disable */
/**
 * Created by 王冬 on 2020/11/22.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */

// function AutoComplete () {
//     this.eventpool = [];
//     this.timer = null;
//
//     this.addScript = (args) => {
//         this.eventpool = [
//             ...this.eventpool,
//             ...args
//         ]
//     }
//
//     this._loop = () => {
//         console.log('任务开始');
//         const self = this;
//         this.timer = setInterval(() => {
//             this.eventpool = this.eventpool.filter(item => {
//                 const [selector, value, event] = item;
//
//                 const $selector = $(selector);
//                 // 不应该出现这种情况：【如果没找到，则保留这个到下一个 loop 循环】
//                 // if ($selector.length === 0) {
//                 //     return true;
//                 // }
//                 const type = self.checkType($selector);
//
//                 // 普通输入框（不包含 radio 和 checkbox）
//                 if (type === 'input') {
//                     // input 类型，认为一定可以直接赋值，于是直接赋值
//                     $selector.val(value);
//                     if (event === 'change') {
//                         $selector.change();
//                     }
//                     // 返回 false，清除这一条
//                     return false;
//                 }
//
//                 // 单选框
//                 if (type === 'radio') {
//                     // 需要找对应的输入框（兄弟组件）
//                     const radio = $selector.siblings(`[value=${value}]`);
//                     if (radio.length === 0) {
//                         return true;
//                     } else {
//                         radio.click();
//                         return false;
//                     }
//                 }
//
//                 if (type === 'checkbox') {
//                     value.forEach(val => {
//                         const checkbox = $selector.siblings(`[value=${val}]`);
//                         if (checkbox.length === 0) {
//                             return true;
//                         } else {
//                             checkbox.click();
//                             return false;
//                         }
//                     })
//                 }
//
//
//                 if (type === 'select') {
//                     // 用这种方式来实现，先手动赋值，然后再查看他的值。
//                     // 如果拿到的值和赋值的那个值一样，认为赋值成功
//                     // 否则赋值失败
//                     $selector.val(value);
//                     if ($selector.val() === value) {
//                         if (event === 'change') {
//                             $selector.change();
//                         }
//                         // 返回 false，清除这一条
//                         return false;
//                     } else {
//                         return true;
//                     }
//                 }
//
//             })
//
//             console.log(`剩余：${self.eventpool.length}`);
//             // 如果没有了，则自动清空
//             if (self.eventpool.length === 0) {
//                 clearInterval(this.timer);
//                 console.log('event all done');
//             }
//         }, 100)
//     }
//
//     this.checkType = ($selector) => {
    //         const tagName = $selector.get(0).tagName.toLowerCase();
//         if (tagName === 'select') {
//             return 'select'
//         } else if (tagName === 'input') {
//             // 如果是 input，虽然有很多种，但暂且都认为不需要异步加载
//             // 即使是 checkbox 和 radio 这种，暂且都认为是这样。
//             // 如果后续证明有，那么这里再额外添加。
//             if ($selector.attr("type") === 'radio') {
//                 return 'radio'
//             } else if ($selector.attr("type") === 'checkbox') {
//                 return 'checkbox'
//             }
//             return 'input'
//         }
//
//     }
//
//     this.start = () => {
//         this._loop()
//     }
// }
const $ = window.$;

class AutoComplete {
    constructor () {
        this.eventpool = [];
        this.timer = null;
    };

    addScript = (args) => {
        this.eventpool = [...this.eventpool, ...args]
    }

    _loop = () => {
        console.log('任务开始');
        const self = this;
        this.timer = setInterval(() => {
            this.eventpool = this.eventpool.filter(item => {
                const [selector, value, event] = item;

                const $selector = $(selector);
                // 不应该出现这种情况：【如果没找到，则保留这个到下一个 loop 循环】
                // if ($selector.length === 0) {
                //     return true;
                // }
                const type = self.checkType($selector);

                // 普通输入框（不包含 radio 和 checkbox）
                if (type === 'input') {
                    // input 类型，认为一定可以直接赋值，于是直接赋值
                    $selector.val(value);
                    if (event === 'change') {
                        $selector.change();
                    }
                    if (event === 'enter') {
                        $selector.trigger($.Event("keydown", {keyCode: 13}));
                    }
                    // 返回 false，清除这一条
                    return false;
                }

                // 单选框
                if (type === 'radio') {
                    // 需要找对应的输入框（兄弟组件）
                    const radio = $selector.siblings(`[value=${value}]`);
                    if (radio.length === 0) {
                        return true;
                    } else {
                        radio.click();
                        return false;
                    }
                }

                if (type === 'checkbox') {
                    value.forEach(val => {
                        const checkbox = $selector.siblings(`[value=${val}]`);
                        if (checkbox.length === 0) {
                            return true;
                        } else {
                            checkbox.click();
                            return false;
                        }
                    })
                }

                if (type === 'select') {
                    // 用这种方式来实现，先手动赋值，然后再查看他的值。
                    // 如果拿到的值和赋值的那个值一样，认为赋值成功
                    // 否则赋值失败
                    $selector.val(value);
                    if ($selector.val() === value) {
                        if (event === 'change') {
                            $selector.change();
                        }
                        if (event === 'enter') {
                            $selector.trigger($.Event("keydown", {keyCode: 13}));
                        }
                        // 返回 false，清除这一条
                        return false;
                    } else {
                        return true;
                    }
                }
            })

            console.log(`剩余：${self.eventpool.length}`);
            // 如果没有了，则自动清空
            if (self.eventpool.length === 0) {
                clearInterval(this.timer);
                console.log('event all done');
            }
        }, 100)
    }

    // 检查类型
    checkType = ($selector) => {
        console.log($selector.get(0));
        const ele = $selector.get(0);
        if (!ele) {
            return
        }

        const tagName = ele.tagName.toLowerCase();
        if (tagName === 'select') {
            return 'select'
        } else if (tagName === 'input') {
            // 如果是 input，虽然有很多种，但暂且都认为不需要异步加载
            // 即使是 checkbox 和 radio 这种，暂且都认为是这样。
            // 如果后续证明有，那么这里再额外添加。
            if ($selector.attr('type') === 'radio') {
                return 'radio'
            } else if ($selector.attr('type') === 'checkbox') {
                return 'checkbox'
            }
            return 'input'
        }
    }

    start = () => {
        this._loop()
    }
}

const ac = new AutoComplete();
ac.addScript([
    [
        '#clerk-num', 'abcd'
    ]
]);
ac.start();

// $(function () {
// const ac = new AutoComplete();
//
// ac.addScript([
//     [
//         '#a', 'normal',
//     ]
// ]);
// ac.start();
//
// // $("#start").click(ac.start);
// window.ac = ac;
// })
