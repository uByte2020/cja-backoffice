<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-card">
      <md-card-header :data-background-color="dataBackgroundColor" class="text-center">
        <h4 class="title">CJA - Mediação de Seguros</h4>
        <p class="category">Registrar-se!</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">Name</label>
            <md-input
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="form.firstName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('perfil')">
            <label for="perfil">Perfil</label>
            <md-select name="perfil" id="perfil" v-model="form.perfil" md-dense :disabled="sending">
              <md-option></md-option>
              <md-option value="M">M</md-option>
              <md-option value="F">F</md-option>
            </md-select>
            <span class="md-error" v-if="!$v.form.perfil.required">The Perfil is required</span>
          </md-field>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('password')">
              <label>Password</label>
              <md-input v-model="form.password" type="password"></md-input>
              <span class="md-error" v-if="!$v.form.password.required">The first name is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('confirmPassword')">
              <label>Confirmar Password</label>
              <md-input v-model="form.confirmPassword" type="password"></md-input>
              <span class="md-error" v-if="!$v.form.confirmPassword.required">The first name is required</span>
              <span class="md-error" v-if="!$v.form.confirmPassword.verifyPassword">Passwords diferentes</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-card-actions>
              <md-button type="submit" class="md-raised md-success" :disabled="sending">Registrar</md-button>
            </md-card-actions>
          </div>
        </div>
      </md-card-content>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
    </md-card>

    <md-snackbar :md-active.sync="userSaved">O utilizador {{ lastUser }} foi salvo com Sucesso!</md-snackbar>
  </form>
</template>
<script>
const { validationMixin, default: Vuelidate } = require('vuelidate');
const { required, email, minLength, maxLength } = require('vuelidate/lib/validators');

export default {
  name: 'sigin-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: '',
    },
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      perfil: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      perfil: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      confirmPassword: {
        required,
        // verifyPassword: (value, vm) => value === vm.form.confirmPassword,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.password = null;
      this.form.confirmPassword = null;
      this.form.perfil = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      this.userSaved = true;
      this.sending = false;
      this.clearForm();
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>
<style>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card {
  -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.16);
}
</style>
