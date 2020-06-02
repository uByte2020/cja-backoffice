import status from './../../utils/statusEnum';

const userStore = {
  namespaced: true,
  state: () => ({
    isAuth: false,
    user: null,
    users: [],
  }),
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setUsers: (state, users) => {
      state.users = users;
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
            context.commit('setUsers', []);
            context.commit('setIsAuth', false);
            commit('solicitacaoStore/freeModule', null, { root: true });
            commit('freeStore', null, { root: true });
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
    getUsers: (context) => {
      if (context.state.user.role.perfilCode <= 1)
        return new Promise((resolve, reject) => {
          axios
            .get('http://127.0.0.1:3000/api/v1/users')
            .then((response) => {
              context.commit('setUsers', response.data.data.docs);
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
    updateMe: (context, user) => {
      console.log(user);
      return new Promise((resolve, reject) => {
        axios
          .patch('http://127.0.0.1:3000/api/v1/users/updateMe', user)
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
    updateUser: (context, user) => {
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://127.0.0.1:3000/api/v1/users/${user._id}`, user)
          .then((response) => {
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
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getProfilePhoto: (state) => {
      return `http://localhost:3000/img/users/${state.user.photo}`;
    },
    getIsAuth: (state) => {
      return state.isAuth;
    },
    getUsers: (state) => {
      return state.users.filter((user) => user.role.perfilCode !== 0);
    },
    getMediadores: (state) => {
      return state.users.filter((user) => user.role.perfilCode === 1);
    },
    getClientes: (state) => {
      return state.users.filter((user) => user.role.perfilCode >= 2);
    },
    countClientes: (state) => {
      return state.users.filter((user) => user.role.perfilCode >= 2).length;
    },
    getUserAuthPerfilCode: (state) => {
      return state.user.role.perfilCode;
    },
    restrictTo: (state) => (...role) => {
      return role.includes(state.user.role.perfilCode);
    },
  },
};

export default userStore;
