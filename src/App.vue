<template>
  <div class="app-wrapper" id="app">
    <div class="app-wrapper__logo"><img src="@/assets/logo.png" alt=""></div>
    <div class="app-wrapper__display">
      <router-view />
    </div>
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
  .app-wrapper {
    &__logo {
      padding: 4px 0 2px;
      border-bottom: 1px solid $basic-border-color;
      text-align: center;

      img {
        height: 40px;
      }

      @media screen and (min-width: map-get($responsive-breakpoints, 'lg')) {
        margin-bottom: 60px;
      }
    }

    &__display {
      position: relative;
      max-width: 960px;
      padding-bottom: 40px;

      @media screen and (min-width: map-get($responsive-breakpoints, 'lg')) {
        margin: 0 auto;
        box-shadow: 0 0 10px -1px $basic-box-shadow-color;
        border-radius: 3px;
      }
    }
  }

  .display {
    &__content {
      padding: 20px;
      text-align: center;
    }
  }

  .title {
    margin: 40px 0;
    text-align: left;

    &__main {
      margin: 0;
      font-size: 1.4rem;
      font-weight: bold;
      color: $base-color;
      text-transform: uppercase;
    }

    &__lead {
      font-size: 0.85rem;
      color: $secondary-color;
    }
  }

  .form {
    max-width: 400px;
    margin: 0 auto;

    &__row {
      margin-bottom: 10px;
    }
  }

  .control-bar {
    padding-top: 20px;

    &__button {
      width: 200px;
      height: 40px;
      margin-bottom: 10px;
      background: $highlight-color;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      border: 0;
      border-radius: 20px;
      cursor: pointer;

    }

    &__link {
      font-size: 0.8rem;
    }
  }
</style>
