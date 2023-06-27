import service from "@/utils/request";

export function LoginByUsername(data) {
    console.log('我在api.js，用户名登录表单发送', data)
    return service.request({
        method: "post",
        url: `/users/login/username`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function LoginByTelephone(data) {
    console.log('我在api.js，手机号登录表单发送', data)
    return service.request({
        method: "post",
        url: `/users/login/phone`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function UserInfo() {
    console.log('我在api.js，获取用户中心信息')
    return service.request({
        method: "get",
        url: `/users`,
    })
}
export function HomeInfo(page,size) {
    console.log('我在api.js，获取首页商品列表')
    return service.request({
        method: "get",
        url: `/home-page?page=${page}&size=${size}`,
    })
}
export function DetailInfo(queryParams) {
    console.log('我在api.js，获取详情页信息')
    return service.request({
        method: "get",
        url: `/goods?id=${queryParams}`,
    })
}
export function HomeSearch(page,size,keywords) {
    console.log('我在api.js，获取首页搜索信息')
    return service.request({
        method: "get",
        url: `/search?page=${page}&size=${size}&keywords=${keywords}`,
    })
}
export function Like(data) {
    console.log('我在api.js，获取加入心愿单信息');
    return service.request({
        method: "post",
        url: `/users/favorites/add`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    });
}
export function ChatHistory(queryParams) {
    console.log('我在api.js，获取悬浮聊天室历史记录')
    return service.request({
        method: "get",
        url: `/chat/history?${new URLSearchParams(queryParams).toString()}`,
    })
}
export function LoginGetCode(data) {
    console.log('我在api.js，登录获取验证码')

    return service.request({
        method: "post",
        url: `/users/sms/login`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function RegisterGetCode(data) {
    console.log('我在api.js，注册获取验证码')

    return service.request({
        method: "post",
        url: `/users/sms/register`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function ModifyGetCode(data) {
    console.log('我在api.js，修改手机号获取验证码')

    return service.request({
        method: "post",
        url: `/users/sms/modify`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function Register(data) {
    console.log('我在api.js，注册')

    return service.request({
        method: "post",
        url: `/users/register`,
        data: JSON.stringify(data), // 将参数转换为JSON字符串
        headers: {
            'Content-Type': 'application/json' // 指定请求头的Content-Type为application/json
        }
    })
}
export function AddGood(data) {
    console.log("我在api.js，添加商品")

    return service.request({
        method: "post",
        url: `/goods/add`,
        data
    })

}