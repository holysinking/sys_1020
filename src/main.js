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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");