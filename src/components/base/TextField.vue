<template>
  <div
    :class="[
      'textfield',
      { 'textfield--invalid': hasErrors }
    ]"
  >
    <div class="textfield__box">
      <input
        :type="inputType"
        :value="value"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :id="id"
        :ref="`${id}-input`"
        class="textfield__input"
        @input="onInput($event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      />

      <label
        :for="id"
        :class="{
          textfield__label: true,
          'textfield__label--minimized': isFocused || hasValue,
        }"
      >
        {{ label }}
      </label>

      <div class="textfield__underline"></div>
    </div>

    <div
      v-if="hasErrors"
      class="textfield__error"
    >
      <span>{{ errorMessages[0] }}</span>
    </div>
  </div>
</template>

<script>
import { isNull, isNonEmptyStr } from '@/utils';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
      validate: (val) => ['text', 'url', 'email', 'password', 'search'].indexOf(val) !== -1,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFocused: false,
      isSecured: true,
    };
  },
  computed: {
    inputType() {
      return this.isSecured ? this.type : 'text';
    },
    hasValue() {
      return !isNull(this.value) && isNonEmptyStr(this.value.toString());
    },
    hasErrors() {
      return this.errorMessages.length > 0;
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    onBlur() {
      this.$emit('blur');
      this.isFocused = false;
    },
    onFocus() {
      this.$emit('focus');
      this.isFocused = true;
    },
    focus() {
      this.$refs[`${this.id}-input`].focus();
    },
  },
};
</script>

<style lang="scss" scoped>
  .textfield {
    position: relative;
    padding: 22px 0 0;

    &__box {
      position: relative;
    }

    &__input {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 3px 12px;
      font-size: 1.25rem;
      border-width: 0;
      border-radius: 0;
      transition: border-color 200ms ease-in-out;

      &,
      &:focus {
        background: none;
        color: $base-input-color;
        border-bottom: $base-input-border-weight solid $base-input-border-color;
        outline: none;
        box-shadow: none;
        -webkit-box-shadow: none;
      }
      &:read-only {
        opacity: .6;
        cursor: not-allowed;
      }

      .textfield--invalid & {
        border-color: $base-input-color-error;
      }

      &:focus ~ .textfield__underline {
        width: 100%;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus
      &:-webkit-autofill:active {
        transition: background-color 50000s;
        -webkit-text-fill-color: $base-input-color !important;
      }

      @media screen and (min-width: map-get($responsive-breakpoints, 'sm')) {
        font-size: 1.5rem;
      }

      @media screen and (min-width: map-get($responsive-breakpoints, 'md')) {
        font-size: 1.875rem;
      }
    }

    &__label {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 2.5;
      padding: 0 .75rem;
      margin: 0;
      font-size: 1.25rem;
      outline: none;
      box-shadow: none;
      -webkit-box-shadow: none;
      transition: all 200ms ease-in-out;

      &:read-only {
        color: rgba($base-input-color, .5);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus
      &:-webkit-autofill:active {
        transition: background-color 50000s;
        -webkit-text-fill-color: $base-input-color !important;
      }

      @media screen and (min-width: map-get($responsive-breakpoints, 'sm')) {
          font-size: 1.5rem;
      }

      @media screen and (min-width: map-get($responsive-breakpoints, 'md')) {
          font-size: 1.875rem;
      }

      &--minimized {
        bottom: 100%;
        margin-bottom: -18px;
        font-size: 1rem;
        color: inherit;
      }
    }

    &__underline {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      transition: width .35s ease;
      height: $base-input-border-weight;
      background-color: $base-input-border-color-active;
    }

    &__error {
      padding: 4px 10px 0;
      text-align: left;

      span {
        font-size: 1rem;
        color: $base-input-color-error;
      }
    }
  }
</style>
