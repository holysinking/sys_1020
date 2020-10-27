import axios from "axios";

import router from "../router";
import ElementUI from "element-ui";
// 通过axios.create方法 配置默认请求属性
const baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://chst.vip";
axios.defaults.baseURL = baseURL;
import NProgress from "nprogress";
axios.create({
  timeout: 4000,
  withCredentials: true // 开启携带认证
});
//创建请求拦截器，可以给每个请求都携带上想要传递的内存

//中断请求属性
export let CancelToken = axios.CancelToken;

axios.interceptors.request.use(config => {
  if (config.url === "/users/login" || config.url === "/users/regist") {
    return config;
  }
  const token = localStorage.getItem("stu-token");
  //config值的是每个请求对象
  config.headers.authorization = token;
  //放行
  return config;
});

axios.interceptors.response.use(config => {
  const {
    data
  } = config;
  if (data) {
    // 如果后台返回1004状态码 则表示校验失败 返回10022表示后台登入态失效 页面需要跳转到登入页
    if (data.code === "1004" || data.code === "10022") {
      ElementUI.Message.error("该登录信息已经失效");
      localStorage.removeItem("stu-token"); //重要
      router.push("/login");
    } else {
      // 放行
      return config;
    }
  } else {
    // 请求出现错误
    alert("请求出错");
    next();
  }
});

// export {
//   CancelToken as default
// }
export default axios;