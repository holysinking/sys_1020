import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局css和element-rest
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"

Vue.config.productionTip = false;

Vue.use(ElementUI);

//按需引入
// import {Carousel} from "element-ui"

//注册组件
// Vue.component()

//路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  //用户登入之后，localStorage中有token
  let token = localStorage.getItem('stu-token')
  if (token) {
    //如果是登陆注册页面直接放行
    next()
  } else { //没token
    if (to.path === "/login") {
      next()
    } else { //访问不是登录注册页
      next({
        path: "/login"
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");