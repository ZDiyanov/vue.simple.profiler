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
      display: block;
      width: 200px;
      height: 40px;
      margin: 0 auto;
      background: $highlight-color;
      text-align: center;
      line-height: 40px;
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

    div {
      margin-top: 10px;
    }
  }

  .list {
    max-width: 400px;
    margin: 0 auto;

    &__item {
      position: relative;;
      padding: 10px 4px;
      text-align: left;
      font-size: 0.8rem;
      border-bottom: 1px solid $basic-border-color;
    }

    &__remove {
      position: absolute;
      right: 10px;
    }

    &__counter {
      &--stage-1 { color: red; }
      &--stage-2 { color: orange; }
      &--stage-3 { color: yellowgreen; }
      &--stage-4 { color: green; }
    }
  }
</style>
