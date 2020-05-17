import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './modules/userStore';
import status from './../utils/statusEnum';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore: UserStore,
  },
  state: () => ({
    perfils: [],
    response: null,
  }),
  mutations: {
    setPerfils: (state, perfils) => {
      state.perfils = perfils;
    },
    setResponse: (state, response) => {
      state.response = response;
    },
  },
  actions: {
    getPerfils: async (context) => {
      const result = await axios.get('http://127.0.0.1:3000/api/v1/perfils');
      if (result.data.status === status.SUCCESS) context.commit('setPerfils', result.data.data.docs);
    },
  },
  getters: {
    getPerfils: (state) => {
      return state.perfils.filter((perfil) => perfil.perfilCode !== 0);
    },
  },
});
