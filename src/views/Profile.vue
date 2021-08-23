<template>
  <div>
    <p>{{ fullName }}</p>

    <div>
      <p>Contact Info:</p>

      <ul>
        <li
          v-for="(item, key, index) in userProfile.contact"
          :key="index"
        >
          {{ key === 'country' ? countryList[item].name : item }}
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
  import countryList from '@/configs/countries';

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
    data() {
      return {
        countryList
      };
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
