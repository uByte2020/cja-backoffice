import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from './modules/userStore';
import SolicitacaoStore from './modules/solicitacaoStore';
import SeguroStore from './modules/seguroStore';
import SeguroViagemStore from './modules/seguroViagemStore';
import status from './../utils/statusEnum';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    userStore: UserStore,
    solicitacaoStore: SolicitacaoStore,
    seguroStore: SeguroStore,
    seguroViagemStore: SeguroViagemStore,
  },
  state: () => ({
    perfils: [],
    modalidades: [],
    seguradoras: [],
    planos: [],
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
    setPlanos: (state, planos) => {
      state.planos = planos;
    },
    freeStore: (state, empty) => {
      state.perfils = [];
      state.modalidades = [];
      state.seguradoras = [];
      state.response = null;
      state.planos = [];
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
    getPlanos: async (context) => {
      const result = await axios.get('http://127.0.0.1:3000/api/v1/seguros/viagens/planos');
      if (result.data.status === status.SUCCESS) context.commit('setPlanos', result.data.data.docs);
    },
    solicitar: async (context, solicitacao) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/v1/solicitacoes', solicitacao)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const err = error.response.data;
            context.commit('setResponse', { status: err.status, message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    updateSolicitacao: async (context, { _id, estado }) => {
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://127.0.0.1:3000/api/v1/solicitacoes/${_id}`, { estado: estado })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const err = error.response.data;
            context.commit('setResponse', { status: err.status, message: err.message }, { root: true });
            reject(err);
          });
      });
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
    getPlanos: (state) => {
      return state.planos;
    },
  },
});
