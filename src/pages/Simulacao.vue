<template>
  <div class="content">
    <seguro-viagem-preco
      :simulacaoViagem="getSimulacaoViagem"
      :showDialog="showDialog"
      @set-preco="setPreco"
    ></seguro-viagem-preco>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-90">
        <div id="sv-stepers">
          <md-steppers :md-active-step.sync="active" md-linear>
            <md-step id="first" md-label="First Step" md-description="Optional" :md-done.sync="first">
              <seguradora-modalidade
                :seguradoras="getSeguradoras"
                @update-seg-mod="setSeguradoraModalidade"
              ></seguradora-modalidade>
              <md-button class="md-raised md-primary" @click="setDone({ id: 'first', index: 'second' })"
                >Continue</md-button
              >
            </md-step>

            <md-step id="second" md-label="Second Step" :md-error="secondStepError" :md-done.sync="second">
              <seguro-viagem
                :seguradora="seguradora"
                :modalidade="modalidade"
                @error="setError()"
                @is-valid="showModal"
              ></seguro-viagem>
              <!-- <md-button class="md-raised md-primary" @error="setError()">Set error!</md-button> -->
            </md-step>

            <md-step id="third" md-label="Third Step" :md-done.sync="third">
              <simulacao-result :seguro="seguro"></simulacao-result>
              <md-button class="md-raised md-primary" @click="setDone({ id: 'third' })">Done</md-button>
            </md-step>
          </md-steppers>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SeguroViagem, SeguradoraModalidade, SimulacaoResult, SeguroViagemPreco } from '@/pages';

export default {
  components: { SeguroViagem, SeguradoraModalidade, SimulacaoResult, SeguroViagemPreco },
  data: () => ({
    showDialog: false,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    modalidade: null,
    seguradora: null,
    seguro: {
      modalidade: null,
      seguradora: null,
      price: null,
      simulacao: null,
      comprovativos: null,
    },
    lastId: null,
    lastIndex: null,
    seguroViagem: {},
  }),
  methods: {
    showModal({ id, index, seguroViagem }) {
      this.seguroViagem = seguroViagem;
      this.lastId = id;
      this.lastIndex = index;
      this.showDialog = true;
    },
    setPreco({ preco }) {
      this.showDialog = false;
      this.seguro.price = preco;
      this.setDone({ id: this.lastId, index: this.lastIndex });
    },
    setDone({ id, index }) {
      this[id] = true;

      this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    },
    setError() {
      this.secondStepError = 'This is an error!';
    },
    setSeguradoraModalidade({ seguradora, modalidade }) {
      this.modalidade = modalidade;
      this.seguradora = seguradora;
      this.seguro.modalidade = modalidade;
      this.seguro.seguradora = seguradora;
    },
  },
  computed: {
    getSeguradoras() {
      return this.$store.getters.getSeguradoras;
    },
    getSimulacaoViagem() {
      return this.$store.getters.getSimulacaoViagem;
    },
  },
};
</script>
<style scoped></style>
