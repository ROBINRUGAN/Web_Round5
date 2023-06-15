import service from "@/utils/request";

export function LoginByUsername(data){
    console.log('我在api.js，用户名登录数据', data)
    return service.request({
        method:"post",
        url:`/users/login/username`,
        data
    })
}