import status from './../../utils/statusEnum';

const userStore = {
  namespaced: true,
  state: () => ({
    isAuth: false,
    user: null,
  }),
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setIsAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
  },
  actions: {
    login: (context, credencial) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/v1/users/login', credencial)
          .then((response) => {
            context.commit('setUser', response.data.data.user);
            context.commit('setIsAuth', true);
            context.commit('setResponse', { status: response.data.status }, { root: true });
            resolve(response.data);
          })
          .catch((error) => {
            const err = error.response.data;
            context.commit('setResponse', { status: err.status, message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    logout: (context, credencial) => {},
    signup: (context, user) => {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/api/v1/users/signup', user)
          .then((response) => {
            context.commit('setUser', response.data.data.user);
            context.commit('setIsAuth', true);
            context.commit('setResponse', { status: response.data.status }, { root: true });
            resolve(response.data);
          })
          .catch((error) => {
            const err = error.response.data;
            context.commit('setResponse', { status: err.status, message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    isLogged: (context) => {},
  },
  getters: {},
};

export default userStore;
