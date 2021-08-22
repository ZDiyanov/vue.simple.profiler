<template>
  <div>
    <p>{{ fullName }}</p>

    <div>
      <p>Contact Info:</p>

      <ul>
        <li
          v-for="(item, index) in userProfile.contact"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div>
      <p>Hobbies:</p>

      <ul>
        <li
          v-for="(item, index) in userProfile.hobbies"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <a
      href="#"
      @click.prevent="switchUserProfile"
    >
      logout
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      userProfile() {
        return this.$store.getters['logger/user'];
      },
      fullName() {
        const { first, middle, last } = this.userProfile.name;

        return `${first} ${middle} ${last}`;
      }
    },
    methods: {
      switchUserProfile() {
        return this.$store.dispatch('logger/switchUserProfile')
          .catch((err) => err);
      },
    },
    metaInfo() {
      const { first, last } = this.userProfile.name;

      return {
        title: `${first} ${last}`
      };
    },
  };
</script>
