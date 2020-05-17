import Vue from "vue";
import Vuex from "vuex";
import UserStore from "./modules/userStore";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore: UserStore,
  },
});
