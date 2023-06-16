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
export function DetailInfo(queryParams){
    console.log('我在api.js，获取详情页信息')
    return service.request({
        method:"get",
        url:`/goods?${new URLSearchParams(queryParams).toString()}`,
    })
}
export function HomeSearch(queryParams){
    console.log('我在api.js，获取首页搜索信息')
    return service.request({
        method:"get",
        url:`/search?${new URLSearchParams(queryParams).toString()}`,
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
export function ChatHistory(queryParams){
    console.log('我在api.js，获取首页搜索信息')
    return service.request({
        method:"get",
        url:`/chat/history?${new URLSearchParams(queryParams).toString()}`,
    })
}