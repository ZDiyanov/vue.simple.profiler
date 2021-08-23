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
        :option-list="dummyList"
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

      <slot />
    </form>
  </div>
</template>

<script>
  import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators';
  import TextField from '@/components/base/TextField';
  import SelectField from '@/components/base/SelectField';

  // Custom phone number validator
  const phoneNumFormat = (value) => {
    const format = /^\+[0-9]+$/i;

    return !helpers.req(value) || format.test(value);
  };

  export default {
    components: {
      TextField,
      SelectField,
    },
    validations: {
      form: {
        phone: {
          required,
          phoneNumFormat,
          minLength: minLength(11),
          maxLength: maxLength(13),
        },
        country: {
          required,
        },
        address: {
          required,
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
          !this.$v.form.phone.phoneNumFormat
          || !this.$v.form.phone.minLength
          || !this.$v.form.phone.maxLength
        ) {
          errors.push('Phone number must be valid');
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
        dummyList: ['Bulgaria', 'United States'],
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
