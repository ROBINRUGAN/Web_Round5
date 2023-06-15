import service from "@/utils/request";

export function Login(data){
    console.log('登录数据', data)
    return service.request({
        method:"post",
        url:`/user/login`,
        data
    })
}