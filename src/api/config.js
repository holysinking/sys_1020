import axios from "axios"

axios.defaults.withCredentials = true //允许请求携带认证
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"

axios.create({
    timeout: 4000
})

export default axios