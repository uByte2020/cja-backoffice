const userStore = {
  namespaced: true,
  state: () => ({
    seguro: {},
  }),
  mutations: {
    setSeguro: (state, seguro) => {
      state.seguro = seguro;
    },
  },
  actions: {
    updateSeguro: async (context, seguro) => {
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://127.0.0.1:3000/api/v1/seguros/${seguro.get('_id')}`, seguro)
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
    solicitarSeguro: async (context, seguro) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/v1/seguros', seguro)
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
    getSeguro: (state) => {
      return state.seguro;
    },
  },
};

export default userStore;
