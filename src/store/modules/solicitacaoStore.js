import status from './../../utils/statusEnum';

const userStore = {
  namespaced: true,
  state: () => ({
    solicitacoes: [],
  }),
  mutations: {
    setSolicitacoes: (state, solicitacoes) => {
      state.solicitacoes = solicitacoes;
    },
  },
  actions: {
    getSolicitacoes: async (context) => {
      const result = await axios.get('http://127.0.0.1:3000/api/v1/solicitacoes');
      if (result.data.status === status.SUCCESS) context.commit('setSolicitacoes', result.data.data.docs);
    },
  },
  getters: {
    getSolicitacoes: (state) => {
      return state.solicitacoes;
    },
    countSolicitacoesPendentes: (state) => {
      return state.solicitacoes.filter((el) => el.estado.estadoCode === 2).length;
    },
    countSolicitacoesAtendidas: (state) => {
      return state.solicitacoes.filter((el) => el.estado.estadoCode === 1).length;
    },
    countSolicitacoesCaducadas: (state) => {
      return state.solicitacoes.filter((el) => el.estado.estadoCode === 3).length;
    },
  },
};

export default userStore;
