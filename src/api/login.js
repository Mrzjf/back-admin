import request from "../common/request.js"

//获取验证码
export function GetSms(json) {
    return request.request({
        method:'post',
        url:'/getSms/',
        data: json
    })
}

//获取用户角

//登录

//注册