// 工具包
class Utils {
    // 设置属性
    constructor() {
        this.test = {
            //邮箱
            email: {
                reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                msg: '邮箱格式不正确'
            },
            //昵称
            nickname: {
                reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
                msg: '昵称只支持字母、汉字、数字、_组合'
            },
            //密码
            password: {
                reg: /^[A-Za-z]\w{5,15}$/,
                msg: '密码只支持字母、数字、_组合且首字符必须为字母'
            },
            //验证码
            code: {
                reg: /^\d{6}$/,
                msg: '验证码必须为6位数字'
            },
            // 不为空
            text:{
                reg: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                msg: '填写错误不能为空或者特殊字符'
            },
            // number类型
            number:{
                reg: /\d/g,
                msg: '商品价格必须是纯数字'
            }
        }
    }

    //验证账号信息
    testNews(obj) {
        // console.log(obj)
        for (const key in obj) {
            if(!this.test[key].reg.test(obj[key])){
                return {
                    bool:false,
                    msg:this.test[key].msg
                }
            }
        }
        return {
            bool:true
        }
    }

}

// 公开出去
module.exports = new Utils()