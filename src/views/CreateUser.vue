<template>
  <div>
    <p>CreateUser</p>

    <a href="#" @click.prevent="setUserProfile">set dummy user profile</a>
  </div>
</template>

<script>
  import uid from 'uid';

  export default {
    data() {
      return {
        dummyUser: {
          id: uid(),
          name: {
            first: 'Zhivko',
            middle: 'Diyanov',
            last: 'Hinkov',
          },
          contact: {
            country: 'Bulgaria',
            postCode: '9300',
            address: 'Some street, 1D',
            phone: '+359877113307',
          },
          hobbies: ['Boxing', 'Basketball'],
        },
      };
    },
    methods: {
      setUserProfile() {
        return this.$store.dispatch('logger/setUserProfile', { user: this.dummyUser, persist: true })
          .catch((err) => err);
      },
    },
    metaInfo() {
      return {
        title: 'Create User'
      };
    },
  };
</script>
