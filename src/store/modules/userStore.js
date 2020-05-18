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
    logout: (context) => {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:3000/api/v1/users/logout')
          .then((response) => {
            context.commit('setUser', null);
            context.commit('setIsAuth', false);
            context.commit('setResponse', { status: response.data.status }, { root: true });
            resolve(response.data);
          })
          .catch((error) => {
            context.commit('setResponse', { status: 'error', message: 'Loggout Error' }, { root: true });
            reject(error);
          });
      });
    },
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
    isLogged: (context) => {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:3000/api/v1/users/isLogged')
          .then((response) => {
            context.commit('setUser', response.data.data.user);
            context.commit('setIsAuth', true);
            context.commit('setResponse', { status: response.data.status }, { root: true });
            console.log(response);
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
            const err = error.response.data;
            context.commit('setResponse', { status: err.status, message: err.message }, { root: true });
            reject(err);
          });
      });
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getIsAuth: (state) => {
      return state.isAuth;
    },
  },
};

export default userStore;
