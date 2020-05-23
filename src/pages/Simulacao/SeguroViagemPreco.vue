<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preçario</md-dialog-title>
      <div>
        <md-table v-model="simulacaoViagem" @md-selected="onSelected">
          <md-table-row>
            <md-table-head>ID</md-table-head>
            <md-table-head>Plano</md-table-head>
            <md-table-head>Preço</md-table-head>
          </md-table-row>

          <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
            <md-table-cell>{{ item.key }}</md-table-cell>
            <md-table-cell>{{ getKeyDesc(item.key) }}</md-table-cell>
            <md-table-cell> {{ item.value }} AKZ </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="hideDialog">Continuar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'seguro-viagem-preco',
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    simulacaoViagem: Array,
  },
  data: () => ({
    selected: null,
  }),
  methods: {
    onSelected(item) {
      console.log(item);
      this.selected = item;
    },
    hideDialog() {
      this.$emit('set-preco', { preco: this.selected.value });
    },
    getKeyDesc(key) {
      if (key === 'cinco') return '5.000.000';
      else if (key === 'dez') return '10.000.000';
      else return '15.000.000';
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
