<template>
  <div
    :class="[
      'selectfield',
      { 'selectfield--invalid': hasErrors }
    ]"
  >
    <div class="selectfield__box">
      <select
        :value="value"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :id="id"
        :ref="`${id}-input`"
        class="selectfield__input"
        @input="onChange($event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      >
        <option
          hidden
          disabled
          selected
          value
        ></option>
        <option
          v-for="(value, index) in optionList"
          :key="index"
          :value="value"
        >
          {{ value }}
        </option>
      </select>

      <label
        :for="id"
        :class="{
          selectfield__label: true,
          'selectfield__label--minimized': isFocused || hasValue,
        }"
      >
        {{ label }}
      </label>

      <div class="selectfield__underline"></div>

      <div class="selectfield__icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5457 9.96755H6.45426L12 15.5133L17.5457 9.96755ZM4 9H20L12 17L4 9Z" />
        </svg>
      </div>
    </div>

    <div v-if="hasErrors" class="selectfield__error">
      <span class="text-danger">{{ errorMessages[0] }}</span>
    </div>
  </div>
</template>

<script>
import { isNull, isNonEmptyStr } from '@/utils';

export default {
  props: {
    optionList: {
      type: Array,
      required: true,
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
      isFocused: false
    };
  },
  computed: {
    hasValue() {
      return !isNull(this.value) && isNonEmptyStr(this.value.toString());
    },
    hasErrors() {
      return this.errorMessages.length > 0;
    },
  },
  methods: {
    onChange(value) {
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
  },
};
</script>

<style lang="scss" scoped>
  .selectfield {
    position: relative;
    padding: 22px 0 0;

    &__box {
      position: relative;
    }

    &__input {
      position: relative;
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 3px 32px 3px 12px;
      font-size: 1.25rem;
      border-width: 0;
      border-radius: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      transition: border-color 200ms ease-in-out;
      -webkit-appearance: none;
      -moz-appearance: none;

      &,
      &:focus {
        background: none;
        color: $base-input-color;
        border-bottom: $base-input-border-weight solid $base-input-border-color;
        outline: none;
        box-shadow: none;
        -webkit-box-shadow: none;
      }

      .selectfield--invalid & {
        border-color: $base-input-color-error;
      }

      &:focus ~ .selectfield__underline {
        width: 100%;
      }

      &:focus ~ .selectfield__icon {
        color: rgba($base-input-color, 1);
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

      & option{
        color:  #333;
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
      pointer-events: none;

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

    &__icon {
      position: absolute;
      height: 22px;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 12px;
      color: rgba($base-input-color, 0.7);
      pointer-events: none;
      transition: color 200ms ease-in-out;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__error {
      padding: 4px 10px 0;

      span {
        font-size: 1rem;
      }
    }
  }
</style>
