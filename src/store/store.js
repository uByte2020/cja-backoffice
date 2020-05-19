import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './modules/userStore';
import SolicitacaoStore from './modules/solicitacaoStore';
import status from './../utils/statusEnum';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore: UserStore,
    solicitacaoStore: SolicitacaoStore,
  },
  state: () => ({
    perfils: [],
    modalidades: [],
    seguradoras: [],
    response: null,
  }),
  mutations: {
    setPerfils: (state, perfils) => {
      state.perfils = perfils;
    },
    setModalidades: (state, modalidades) => {
      state.modalidades = modalidades;
    },
    setSeguradoras: (state, seguradoras) => {
      state.seguradoras = seguradoras;
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
    getSeguradoras: async (context) => {
      const result = await axios.get('http://127.0.0.1:3000/api/v1/seguradoras');
      if (result.data.status === status.SUCCESS) context.commit('setSeguradoras', result.data.data.docs);
    },
    getModalidades: async (context) => {
      const result = await axios.get('http://127.0.0.1:3000/api/v1/modalidades');
      if (result.data.status === status.SUCCESS) context.commit('setModalidades', result.data.data.docs);
    },
  },
  getters: {
    getPerfils: (state) => {
      return state.perfils.filter((perfil) => perfil.perfilCode !== 0);
    },
    getSeguradoras: (state) => {
      return state.seguradoras;
    },
    getModalidades: (state) => {
      return state.modalidades;
    },
  },
});
