import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

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