<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    metaInfo() {
      const { title } = this;

      return {
        title,
        titleTemplate(viewTitle) {
          const appTitle = 'Profile Logger';

          return viewTitle !== appTitle
            ? `${appTitle} | ${viewTitle}`
            : appTitle;
        }
      };
    }
  };
</script>

<style lang="scss">
  #app {
    text-align: center;
    color: $base-color;
    margin-top: 60px;
  }
</style>
