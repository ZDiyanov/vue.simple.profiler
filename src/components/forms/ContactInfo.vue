<template>
  <div>
    <form @submit.prevent="onSubmit" novalidate>
      <text-field
        v-model="form.phone"
        type="text"
        id="phone-textfield"
        label="Phone"
        :value="form.phone"
        :error-messages="phoneErrors"
        required
      />

      <select-field
        v-model="form.country"
        id="country-selectfield"
        label="Country"
        :option-list="countryList"
        :error-messages="countryErrors"
        required
      />

      <text-field
        v-model="form.address"
        type="text"
        id="address-textfield"
        label="Address"
        :value="form.address"
        :error-messages="addressErrors"
        required
      />

      <text-field
        v-model="form.postCode"
        type="text"
        id="postCode-textfield"
        label="Post Code"
        :value="form.postCode"
        :disabled="!isCountrySet"
        :error-messages="postCodeErrors"
        required
      />

      <slot />
    </form>
  </div>
</template>

<script>
  import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators';
  import { isNonEmptyStr } from '@/utils';
  import TextField from '@/components/base/TextField';
  import SelectField from '@/components/base/SelectField';
  import countryList from '@/configs/countries';

  export default {
    components: {
      TextField,
      SelectField,
    },
    validations: {
      form: {
        phone: {
          required,
          phoneNumber(value) {
            const format = /^\+[0-9]+$/i;
            return !helpers.req(value) || format.test(value);
          },
          minLength: minLength(11),
          maxLength: maxLength(13),
        },
        country: {
          required,
        },
        address: {
          required,
        },
        postCode: {
          required,
          postCodeFormat(value) {
            if (this.isCountrySet) {
              const format = countryList[this.form.country].postCode;
              return !helpers.req(value) || format.test(value);
            }

            return true;
          },
        },
      }
    },
    computed: {
      phoneErrors() {
        const errors = [];

        if (!this.$v.form.phone.$dirty) {
          return errors;
        }
        if (!this.$v.form.phone.required) {
          errors.push('Phone number is required');
        }
        if (
          !this.$v.form.phone.phoneNumber
          || !this.$v.form.phone.minLength
          || !this.$v.form.phone.maxLength
        ) {
          errors.push('Phone number format must be valid');
        }

        return errors;
      },
      countryErrors() {
        const errors = [];

        if (!this.$v.form.country.$dirty) {
          return errors;
        }
        if (!this.$v.form.country.required) {
          errors.push('Country is required');
        }

        return errors;
      },
      addressErrors() {
        const errors = [];

        if (!this.$v.form.address.$dirty) {
          return errors;
        }
        if (!this.$v.form.address.required) {
          errors.push('Address is required');
        }

        return errors;
      },
      postCodeErrors() {
        const errors = [];

        if (!this.$v.form.postCode.$dirty) {
          return errors;
        }
        if (!this.$v.form.postCode.required) {
          errors.push('Post Code is required');
        }
        if (!this.$v.form.postCode.postCodeFormat) {
          errors.push('Post Code format must be valid');
        }

        return errors;
      },
      isCountrySet() {
        return isNonEmptyStr(this.form.country);
      },
    },
    props: {
      form: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isValid: null,
        countryList,
      };
    },
    methods: {
      onSubmit() {
        this.$v.$touch();

        if (this.$v.form.$invalid) {
          this.isValid = false;
        } else {
          this.isValid = true;
        }

        this.$emit('validate-step', { isValid: this.isValid });
      },
    },
  };
</script>
