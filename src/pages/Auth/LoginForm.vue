<template>
  <form>
    <md-card class="md-card">
      <md-card-header :data-background-color="dataBackgroundColor" class="text-center">
        <h4 class="title">CJA - Mediação de Seguros</h4>
        <p class="category">Entrar</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button class="md-raised md-success">Entrar</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: 'login-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
};
</script>
<style>
.md-card {
  -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
}
</style>
