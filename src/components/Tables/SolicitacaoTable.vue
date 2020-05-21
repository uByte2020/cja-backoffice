<template>
  <div>
    <md-table v-model="solicitacoes" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Seguro">{{ item.seguro.modalidade.modalidade }}</md-table-cell>
        <md-table-cell md-label="Seguradora">{{ item.seguro.seguradora.seguradora }}</md-table-cell>
        <md-table-cell md-label="Cliente">{{ item.cliente.name }}</md-table-cell>
        <md-table-cell md-label="Tipo">{{ item.cliente.role.perfil }}</md-table-cell>
        <md-table-cell md-label="Preço">{{ item.price }}</md-table-cell>
        <md-table-cell md-label="Data Solicitada">{{ getData(item.seguro.createdAt) }}</md-table-cell>
        <md-table-cell md-label="Caducidade">{{ getData(item.validAt) }}</md-table-cell>
        <md-table-cell md-label="Docs">Ver Docs</md-table-cell>
        <md-table-cell md-label="Estado">{{ item.estado.estado }}</md-table-cell>
        <!-- <md-table-cell md-label="Opções">
          <md-button class="md-just-icon md-simple md-primary">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
          </md-button>
        </md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'solicitacao-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: '',
    },
    solicitacoes: Array,
  },
  data() {
    return {
      selected: [],
      users: [
        {
          name: 'Dakota Rice',
          salary: '$36,738',
          country: 'Niger',
          city: 'Oud-Turnhout',
        },
        {
          name: 'Minerva Hooper',
          salary: '$23,738',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
        },
        {
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Overland Park',
        },
        {
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Gloucester',
        },
        {
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
        },
        {
          name: 'Mason Porter',
          salary: '$78,615',
          country: 'Chile',
          city: 'Gloucester',
        },
      ],
    };
  },
  methods: {
    getData(date) {
      const formatDate = new Date(date);
      return `${formatDate.getFullYear()}-${formatDate.getMonth() + 1}-${formatDate.getDate()}`;
    },
  },
  mounted() {},
};
</script>
