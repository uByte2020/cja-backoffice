<template>
  <form>
    <notifications></notifications>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Editar Perfil</h4>
        <p class="category">Complete o seu perfil</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Nome</label>
              <md-input v-model="user.name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Email</label>
              <md-input v-model="user.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Telemovel</label>
              <md-input v-model="user.telemovel" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Endereco</label>
              <md-input v-model="user.endereco" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>NIF</label>
              <md-input v-model="user.nif" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Sector de Actividade</label>
              <md-input v-model="user.sectorActividade" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Actividade</label>
              <md-input v-model="user.actividade" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Sobre</label>
              <md-textarea v-model="user.descricao"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="update">Actualizar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: 'edit-profile-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      user: {
        name: null,
        descricao: null,
        email: null,
        telemovel: null,
        endereco: null,
        photo: null,
        actividade: null,
        sectorActividade: null,
        nif: null,
      },
    };
  },
  mounted() {
    this.user.name = this.getUser.name;
    this.user.descricao = this.getUser.descricao;
    this.user.email = this.getUser.email;
    this.user.telemovel = this.getUser.telemovel;
    this.user.endereco = this.getUser.endereco.join(';');
    this.user.photo = this.getUser.photo;
    this.user.actividade = this.getUser.actividade;
    this.user.sectorActividade = this.getUser.sectorActividade;
    this.user.nif = this.getUser.nif;
  },
  computed: {
    getUser() {
      return this.$store.getters['userStore/getUser'];
    },
  },
  methods: {
    async update() {
      const user = { ...this.user };
      user.endereco = this.user.endereco.split(';');
      this.$emit('update-user', user);
    },
  },
};
</script>
<style></style>
