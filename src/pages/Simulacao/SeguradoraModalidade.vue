<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="seguradora">Seguradoras</label>
          <md-select
            v-model="seguradoraId"
            @md-selected="setSeguradora()"
            name="seguradora"
            id="seguradora"
          >
            <md-option
              v-for="seguradora in getSeguradoras"
              :key="seguradora._id"
              :value="seguradora._id"
            >{{ seguradora.seguradora }}</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="modalidade">Modalidades</label>
          <md-select
            v-model="modalidadeId"
            @md-selected="setModalidade()"
            name="modalidade"
            id="modalidade"
          >
            <md-option
              v-for="modalidade in modalidades"
              :key="modalidade._id"
              :value="modalidade._id"
            >{{ modalidade.modalidade }}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'seguradora-modalidade',
  props: {
    seguradoras: Array,
  },
  mounted() {},
  data: () => ({
    movie: 'godfather',
    country: null,
    font: null,
    modalidadeId: null,
    seguradoraId: null,
    modalidades: [],
    modalidade: null,
    seguradora: null,
  }),
  methods: {
    setSeguradora() {
      this.modalidadeId = '';
      this.seguradora = this.seguradoras.find((seg) => seg._id === this.seguradoraId);
      this.modalidades = this.seguradora.modalidades.filter((mod) => mod.isActive);
    },
    setModalidade() {
      this.modalidade = this.modalidades.find((mod) => mod._id === this.modalidadeId);
      this.$emit('update-seg-mod', { seguradora: this.seguradora, modalidade: this.modalidade });
    },
  },
  computed: {
    getModalidades() {
      return this.modalidades;
    },
    getSeguradoras() {
      return this.seguradoras.filter((seg) => seg.isActive);
    },
  },
};
</script>
