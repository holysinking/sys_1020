import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getMenuList } from "@/api";
import recursionRoutes from "../utils/recursionRoutes";
import allRoutes from "../router/allRoutes";
import DynamicRoutes from "../router/dynamicRoutes"; //动态路由
import router from "../router"; //引入路由
//引入recursionRoutes递归函数 处理用户路由

let permissionButtons =
  JSON.parse(localStorage.getItem("wf-permission-buttons")) || {};
export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("stu-userInfo")) || {},
    sideMenu: [],
    crumbsList: [],
    stuForm: {
      class: "", //班级
      name: "", //学员的名字
      age: "", //学员的年龄
      city: "", //目前居住的城市
      degree: "", //学历
      productUrl: "", //项目地址
      description: "", //一句话对自己的评价
      headimgurl: "" //头像
    },
    permissionButtons
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    //设置侧边菜单栏数据
    SET_SIDEMENU(state, payload) {
      ///找出DynamicRoutes中路径是/的对象，将用户路由添加给当前对象的children
      state.sideMenu = payload;
      let target = DynamicRoutes.find(item => item.path === "/");
      target.children = [...state.sideMenu];
      // console.log(target);
      // console.log(DynamicRoutes);
      //将路由配置通过动态的方式加入到routes中 用addRoutes()
      router.addRoutes(DynamicRoutes);
    },
    //设置面包屑
    SET_CRUMBS(state, payload) {
      state.crumbsList = payload;
    }
  },
  actions: {
    async FETCH_MENULIST({ commit }) {
      //获取用户菜单
      //发起异步请求 获取用户菜单
      let res = await getMenuList();
      if (res && res.data) {
        //防止出现空指针
        //进行计算得到用户的菜单
        let menuList = res.data.menuList;
        let userMenu = recursionRoutes(allRoutes, menuList);
        commit("SET_SIDEMENU", userMenu);
      }
    }
  },
  getters: {},
  modules: {}
});
