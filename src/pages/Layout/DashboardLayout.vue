<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>notifications</md-icon>
        <p>Solicitações</p>
      </sidebar-link>
      <sidebar-link to="/simular-seguro">
        <md-icon>bubble_chart</md-icon>
        <p>Simulacao</p>
      </sidebar-link>
      <sidebar-link to="/users">
        <md-icon>group</md-icon>
        <p>Utilizadores</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Perfil</p>
      </sidebar-link>

      <!-- 
      
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>-->
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link>-->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <!-- <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage"></fixed-plugin> -->
      <dashboard-content></dashboard-content>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from '@/pages/Layout/MobileMenu.vue';
import FixedPlugin from './Extra/FixedPlugin.vue';

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    // FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: 'green',
      sidebarBackgroundImage: require('@/assets/img/sidebar-2.jpg'),
    };
  },
  mounted() {
    this.fetchSolicitacoes();
    this.fetchUsers();
    this.fetchSeguradoras();
    this.fetchModalidades();
    this.fetchPlanos();
  },
  methods: {
    async fetchSolicitacoes() {
      try {
        await this.$store.dispatch('solicitacaoStore/getSolicitacoes');
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
    async fetchUsers() {
      try {
        await this.$store.dispatch('userStore/getUsers');
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
    async fetchSeguradoras() {
      try {
        await this.$store.dispatch('getSeguradoras');
      } catch (err) {
        this.notifyVue(status.WARNING, err.message);
      }
    },
    async fetchModalidades() {
      try {
        await this.$store.dispatch('getModalidades');
      } catch (err) {
        this.notifyVue(status.WARNING, err.message);
      }
    },
    async fetchPlanos() {
      try {
        await this.$store.dispatch('getPlanos');
      } catch (err) {
        this.notifyVue(status.WARNING, err.message);
      }
    },
  },
};
</script>
