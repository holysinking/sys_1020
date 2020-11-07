import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bus from "./utils/bus";
Vue.prototype.$bus = bus;
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入全局css和element-rest
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";
// 引入图标样式
import "@/assets/fonts/iconfont.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.config.productionTip = false;
//nprogress进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(ElementUI, {
  locale
});

//引入鉴权的方法
import has from "./utils/has";
Vue.prototype.$has = has;
Vue.prototype.$bus = bus;
Vue.use(ElementUI);
// Vue.config.productionTip = false
//定义全局自定义指令 判断是否具备相应按钮权限
Vue.directive("haspermission", {
  bind(el, binding, VNode) {
    // console.log(el)
    let buttons = localStorage.getItem("wf-permission-buttons");
    if (!has(buttons, binding.value)) {
      //禁用按钮
      // console.log(el.className)
      //先储存class类名 在这基础上加上is-disabled禁用按钮
      let className = el.className;
      el.className = className + " " + "is-disabled";
      el.disabled = true;
      // console.log(el)
    }
  }
});
//路由前置钩子（导航守卫）
router.beforeEach((to, from, next) => {
  NProgress.start();
  //用户登入之后，localStorage中有token
  if (to.path === "/login") {
    // 访问登入页面 那么放行
    next();
  } else {
    // 访问别的页面
    // 判断是否登入 判断是否有token
    const token = localStorage.getItem("stu-token");
    if (token) {
      //用户需要进入页面
      //判断vuex中sideMenu是否有值
      if (!store.state.sideMenu.length) {
        store.dispatch("FETCH_MENULIST").then(() => {
          next({
            path: to.path
          }); //这里要注意, next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。
        });
      } else {
        next();
      }
    } else {
      // 跳转到登入页
      next({
        path: "/login"
      });
    }
  }
});
//路由后置钩子处理面包屑
router.afterEach((to, from) => {
  let crumbsList = to.matched.slice(1);
  store.commit("SET_CRUMBS", crumbsList);
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
