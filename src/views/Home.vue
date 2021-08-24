<template>
  <div class="display__content">
    <div class="title">
      <p class="title__main">Welcome</p>
      <span class="title__lead">This is a small demo app for MODIS</span>
    </div>

    <router-link to="/create">Log a new user profile</router-link>

    <div class="profiles-list" v-if="hasStoredProfiles">
      <div class="list">
        <div class="list__item">Logged User Profiles:</div>
        <div
          v-for="(item, index) in profilesList"
          :key="index"
          class="list__item"
        >
          <a
            href="#"
            @click.prevent="setUserProfile(item)"
          >
            {{ `${item.personal.firstName} ${item.personal.lastName}` }}
          </a>
        </div>
      </div>

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

<style lang="scss">
  .profiles-list {
    margin-top: 40px;

    .list {
      margin-bottom: 10px;
    }
  }
</style>
