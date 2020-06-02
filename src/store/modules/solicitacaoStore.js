import status from './../../utils/statusEnum';
import DocsType from './../../utils/docsType';

const userStore = {
  namespaced: true,
  state: () => ({
    solicitacoes: [],
    solicitacao: {},
  }),
  mutations: {
    setSolicitacoes: (state, solicitacoes) => {
      state.solicitacoes = solicitacoes;
    },
    setSolicitacao: (state, solicitacao) => {
      state.solicitacao = solicitacao;
    },
    freeModule: (state, empty) => {
      state.solicitacao = {};
      state.solicitacoes = [];
    },
  },
  actions: {
    setSolicitacao: (context, solicitacao) => {
      context.commit('setSolicitacao', solicitacao);
    },
    getSolicitacoes: async (context) => {
      let userPerfilCode = context.rootState.userStore.user.role.perfilCode;
      let mySolicitacoes = '';
      if (userPerfilCode >= 2) mySolicitacoes = '/mySolicitacoes';
      const result = await axios.get(`http://127.0.0.1:3000/api/v1/solicitacoes/${mySolicitacoes}`);
      if (result.data.status === status.SUCCESS) context.commit('setSolicitacoes', result.data.data.docs);
    },
    getSolicitacoesById: async (context, solicitacaoId) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/api/v1/solicitacoes/${solicitacaoId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const err = error.response.data;
            reject(err);
          });
      });
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
    getSolicitacao: (state) => {
      return state.solicitacao;
    },
    getFileURL: (state) => (docType) => {
      switch (docType) {
        case DocsType.APOLICE:
          return `http://localhost:3000/files/seguros/apolice/`;
        case DocsType.COMPROVATIVO:
          return `http://localhost:3000/files/seguros/comprovativos/`;
        case DocsType.DOCIDENTICICACAO:
          return `http://localhost:3000/files/seguros/docIdentificacaos/`;
        case DocsType.SIMULACAO:
          return `http://localhost:3000/files/seguros/simulacao/`;
      }
    },
  },
};

export default userStore;
