import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("stu-userInfo")) || {}
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {},
  getters: {},
  modules: {}
});