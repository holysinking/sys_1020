import axios from "axios"

import router from "@/router"
import ElementUI from 'element-ui';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"
axios.defaults.withCredentials = true //允许请求携带认证

//创建请求拦截器，可以给每个请求都携带上想要传递的内存

axios.interceptors.request.use(config => {
    if (config.url == "/users/login") {
        return config
    } else {
        let token = localStorage.getItem('stu-token')
        //config值的是每个请求对象
        config.headers['authorization'] = token;
        //放行
        return config
    }
}, err => {
    return Promise.reject(err)
})

//响应拦截
axios.interceptors.response.use(config => {
    let {
        data
    } = config
    if (data.code == '1004' || data.code == '10022') {
        //在当前后台1004代表token校验失败，并跳转到登录页
        //session失效10022
        ElementUI.Message.error = "登入信息失效，请重新登入"
        router.push("/login")
    }
    return config
})

axios.create({
    timeout: 4000
})

export default axios