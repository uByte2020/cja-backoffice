<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ getUser.role }}</h6>
      <h4 class="card-title">{{ getUser.name }}</h4>
      <p class="card-description">{{ getUser.descicao }}</p>
      <!-- <md-button class="md-round md-success">Actualizar Foto</md-button> -->
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/marc.jpg'),
    },
  },
  data() {
    return {};
  },
  computed: {
    getUser() {
      return this.$store.getters['userStore/getUser'];
    },
  },
};
</script>
<style></style>
