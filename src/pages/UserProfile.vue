<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form @update-user="updateUser" data-background-color="green"></edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card @update-user="updateUser"></user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from '@/pages';

export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  methods: {
    async updateUser(user) {
      try {
        let response = await this.$store.dispatch('userStore/updateMe', this.user);
      } catch (err) {
        this.notifyVue(status.DANGER, err.message);
      }
    },
  },
};
</script>
