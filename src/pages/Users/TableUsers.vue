<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <div class="md-toolbar-section-start"></div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Pesquisar por Nome..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="Nenhum Utilizador Encontrado "
        :md-description="`Nenhum utilizador com o nome '${search}' encontrado. Tenta pesquisar com um nome diferente.`"
      >
        <!-- <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button> -->
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Telemovel" md-sort-by="telemovel">{{ item.telemovel }}</md-table-cell>
        <md-table-cell md-label="Perfil" md-sort-by="role.perfilCode">{{ item.role.perfil }}</md-table-cell>
        <md-table-cell md-label="Opções">
          <md-switch v-model="item.isBloqued" class="md-primary" @change="changeBloqState(item)"></md-switch>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <Pagination
      :total="users.length"
      :perPage="limit"
      @input="changePage"
      type="success"
      :value="page"
    ></Pagination>
  </div>
</template>

<script>
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.name).includes(toLower(term)));
  }

  return items;
};
import { Pagination } from '@/components';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  name: 'TableUsers',
  props: {
    users: Array,
  },
  data: () => ({
    search: null,
    searched: [],
    limit: 5,
    page: 1,
  }),
  methods: {
    changePage(page) {
      this.page = page;
      const skip = (page - 1) * this.limit;
      this.searched = [...this.users.slice(skip, skip + this.limit)];
    },
    newUser() {
      window.alert('Noop');
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    changeBloqState(item) {
      // item.isBloqued = !item.isBloqued;
    },
    fecthUsers() {
      this.changePage(1);
    },
  },
  mounted() {
    this.fecthUsers();
  },

  components: {
    Pagination,
  },
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>
