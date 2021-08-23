<template>
  <div class="display__content">
    <div class="title">
      <p class="title__main">Welcome</p>
      <span class="title__lead">This is a small demo app for MODIS</span>
    </div>

    <router-link to="/create">Log a new user profile</router-link>

    <div v-if="hasStoredProfiles">
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
            {{ `${item.personal.firstName} ${item.personal.lastName}` }}
          </a>
        </li>
      </ul>

      <a
        href="#"
        @click.prevent="clearProfileList"
      >
        Delete Existing Profiles
      </a>
    </div>
  </div>
</template>

<script>
  import { isNonEmptyArr } from '@/utils';

  export default {
    computed: {
      profilesList() {
        return this.$store.getters['persistentData/users'];
      },
      hasStoredProfiles() {
        return isNonEmptyArr(this.profilesList);
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
