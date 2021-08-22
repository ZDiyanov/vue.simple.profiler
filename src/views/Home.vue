<template>
  <div>
    <p>Profile Logger Home</p>

    <router-link to="/create">Log a new user profile</router-link>

    <div>
      <p>Logged User Profiles:</p>

      <ul>
        <li
          v-for="(item, index) in profilesList"
          :key="index"
        >
          <a
            href="#"
            @click.prevent="setUserProfile(item)"
          >
            {{ `${item.name.first} ${item.name.last}` }}
          </a>
        </li>
      </ul>

      <a
        href="#"
        @click.prevent="clearProfileList"
      >
        Delete Existing Profiles
      </a>

      <a
        href="#"
        @click.prevent="resetApp"
      >
        Reset the app
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      profilesList() {
        return this.$store.getters['persistentData/users'];
      },
    },
    methods: {
      setUserProfile(user) {
        return this.$store.dispatch('logger/setUserProfile', { user })
          .catch((err) => err);
      },
      clearProfileList() {
        return this.$store.dispatch('persistentData/reset')
          .catch((err) => err);
      },
      resetApp() {
        return this.$store.dispatch('logger/resetAll')
          .catch((err) => err);
      }
    },
    metaInfo() {
      return {
        title: 'Welcome!'
      };
    },
  };
</script>
