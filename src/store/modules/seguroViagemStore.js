import status from '../../utils/statusEnum';

const userStore = {
  namespaced: true,
  state: () => ({
    simulacaoViagem: [],
  }),
  mutations: {
    setSimulacaoViagem: (state, simulacaoViagem) => {
      state.simulacaoViagem = simulacaoViagem;
    },
  },
  actions: {
    simularSeguroViagem: async (context, seguro) => {
      const result = await axios.post('http://127.0.0.1:3000/api/v1/seguros/viagens/simular', seguro);
      if (result.data.status === status.SUCCESS) context.commit('setSimulacaoViagem', result.data.data.precos);
    },
    solicitarSeguroViagem: async (context, seguroViagem) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/v1/seguros/viagens', seguroViagem)
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
    getSimulacaoViagem: (state) => {
      return state.simulacaoViagem;
    },
  },
};

export default userStore;
