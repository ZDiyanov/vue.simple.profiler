<template>
  <div class="display__content">
    <div class="title">
      <p class="title__main">{{ fullName }}</p>
      <span class="title__lead">Check the console for full list of profile details</span>
    </div>

    <div class="control-bar">
      <div>
        <a
          href="#"
          class="control-bar__button"
          @click.prevent="switchUserProfile"
        >
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      userProfile() {
        return this.$store.getters['logger/user'];
      },
      fullName() {
        const { firstName, middleName, lastName } = this.userProfile.personal;

        return `${firstName} ${middleName} ${lastName}`;
      }
    },
    created() {
      console.log(this.userProfile);
    },
    methods: {
      switchUserProfile() {
        return this.$store.dispatch('logger/switchUserProfile')
          .catch((err) => err);
      },
    },
    metaInfo() {
      const { firstName, lastName } = this.userProfile.personal;

      return {
        title: `${firstName} ${lastName}`
      };
    },
  };
</script>
