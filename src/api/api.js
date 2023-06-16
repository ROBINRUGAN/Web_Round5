import service from "@/utils/request";

export function LoginByUsername(data){
    console.log('我在api.js，用户名登录数据', data)
    return service.request({
        method:"post",
        url:`/users/login/username`,
        data
    })
}
export function LoginByTelephone(data){
    console.log('我在api.js，手机号登录数据', data)
    return service.request({
        method:"post",
        url:`/users/login/phone`,
        data
    })
}
export function UserInfo(){
    console.log('我在api.js，获取用户信息')
    return service.request({
        method:"get",
        url:`/users/info`,
    })
}
export function HomeInfo(queryParams){
    console.log('我在api.js，获取首页信息')
    return service.request({
        method:"get",
        url:`/home-page?${new URLSearchParams(queryParams).toString()}`,
    })
}