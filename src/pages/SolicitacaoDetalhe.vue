<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Detalhes da Solicitação</h4>
            <p class="category">Solicitação: {{ solicitacao.estado.estado }}</p>
          </md-card-header>
          <md-card-content>
            <SolicitacaoViagemDetalhe :seguro-viagem="solicitacao.seguro.seguroViagem"></SolicitacaoViagemDetalhe>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="solicitante">Solicitante</label>
                  <md-input
                    v-model="solicitacao.cliente.name"
                    type="text"
                    id="solicitante"
                    name="solicitante"
                    disabled
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="mediador">Mediador</label>
                  <md-input type="text" id="mediador" name="mediador" disabled />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="seguradora">Seguradora</label>
                  <md-input
                    v-model="solicitacao.seguro.seguradora.seguradora"
                    type="text"
                    id="seguradora"
                    name="seguradora"
                    disabled
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="seguro">Seguro</label>
                  <md-input
                    v-model="solicitacao.seguro.modalidade.modalidade"
                    type="text"
                    id="seguro"
                    name="seguro"
                    disabled
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="preco">Preço (AKZ)</label>
                  <md-input
                    v-model="solicitacao.seguro.price"
                    type="text"
                    id="preco"
                    name="preco"
                    disabled
                  />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field v-show="!hasFiles(solicitacao.seguro.docIdentificacaos)">
                  <label for="docsIdentificacao">Anexar Documentos de Identificação</label>
                  <md-file
                    v-model="docIdentificacaos"
                    @change="setDocIdentificacaos"
                    name="docsIdentificacao"
                    id="docsIdentificacao"
                    multiple
                  />
                </md-field>
                <md-button
                  v-show="hasFiles(solicitacao.seguro.docIdentificacaos)"
                  class="md-raised md-success"
                >Download Docs de Identificação</md-button>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field v-show="!hasFiles(solicitacao.seguro.comprovativos)">
                  <label for="comprovativo">Anexar Comprovativo</label>
                  <md-file
                    v-model="comprovativos"
                    @change="setComprovativos"
                    name="comprovativo"
                    id="comprovativo"
                    multiple
                  />
                </md-field>
                <md-button
                  v-show="hasFiles(solicitacao.seguro.comprovativos)"
                  class="md-raised md-success"
                >Download Comprovativos</md-button>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field v-show="!solicitacao.seguro.apolice && restrictTo(0, 1)">
                  <label for="apolice">Anexar Apólice</label>
                  <md-file
                    v-model="apolice"
                    @change="setApolice"
                    name="apolice"
                    id="apolice"
                    multiple
                  />
                </md-field>
                <md-button
                  class="md-raised md-success"
                  v-show="solicitacao.seguro.apolice"
                >Download Aplice</md-button>
              </div>
            </div>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" @click="update">Actualizar</md-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SolicitacaoViagemDetalhe } from '@/pages';

export default {
  name: 'simulacao-detalhe',
  components: { SolicitacaoViagemDetalhe },
  props: ['solicitacaoId'],
  data() {
    return {
      solicitacao: {
        seguro: {
          price: null,
          simulacao: null,
          apolice: null,
          comprovativos: [],
          docIdentificacaos: [],
          estado: null,
          tipo: null,
          modalidade: {
            modalidade: null,
          },
          seguradora: {
            seguradora: null,
          },
          seguroViagem: {
            pessoas: 1,
            documentos: [],
            createdAt: null,
            plano: null,
            dataPartida: null,
            dataVolta: null,
            seguro: null,
          },
        },
        cliente: {
          name: null,
        },
        estado: { estado: null, estadoCode: null },
        validAt: null,
      },
      seguro: {
        docIdentificacaos: null,
        comprovativos: null,
        apolice: null,
      },
      docIdentificacaos: null,
      comprovativos: null,
      apolice: null,
    };
  },
  mounted() {
    this.getSolicitacaoById();
  },
  methods: {
    hasFiles(file) {
      if (Array.isArray(file)) return file.length > 0;
      return false;
    },
    setComprovativos() {
      this.seguro.comprovativos = this.comprovativos.target.files[0];
    },
    setDocIdentificacaos() {
      this.seguro.docIdentificacaos = this.docIdentificacaos.target.files[0];
    },
    setApolice() {
      this.seguro.apolice = this.apolice.target.files[0];
    },
    async update() {
      const seguro = new FormData();
      seguro.append('_id', this.solicitacao.seguro._id);
      if (this.seguro.comprovativos) seguro.append('comprovativos', this.seguro.comprovativos);
      if (this.seguro.docIdentificacaos) seguro.append('docIdentificacaos', this.seguro.docIdentificacaos);
      if (this.seguro.apolice) seguro.append('apolice', this.seguro.apolice);

      try {
        await this.$store.dispatch('updateSeguro', seguro);
        // await this.solicitar({ seguro: seguroResponse.data.doc._id, cliente: this.getUser._id });
        this.fetchSolicitacoes();
        this.$router.push('/solicitacoes');
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
    async getSolicitacaoById() {
      try {
        const response = await this.$store.dispatch('solicitacaoStore/getSolicitacoesById', this.solicitacaoId);
        this.solicitacao = response.data.doc;
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
    async fetchSolicitacoes() {
      try {
        await this.$store.dispatch('solicitacaoStore/getSolicitacoes');
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
  },
  computed: {
    getSolicitacao() {
      return this.$store.getters['userStore/getUsers'];
    },
    getSeguroViagem() {
      return this.solicitacao.seguro.seguroViagem;
    },
    restrictTo() {
      return this.$store.getters['userStore/restrictTo'];
    },
  },
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>
