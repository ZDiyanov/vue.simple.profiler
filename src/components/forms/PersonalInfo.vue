<template>
  <div class="form">
    <form @submit.prevent="onSubmit" novalidate>
      <div class="form__row">
        <text-field
          v-model="form.firstName"
          type="text"
          id="first-name-textfield"
          label="First Name"
          :value="form.firstName"
          :error-messages="firstNameErrors"
          required
        />
      </div>

      <div class="form__row">
        <text-field
          v-model="form.lastName"
          type="text"
          id="last-name-textfield"
          label="Last Name"
          :value="form.lastName"
          :error-messages="lastNameErrors"
          required
        />
      </div>

      <div class="form__row">
        <text-field
          v-model="form.birthday"
          type="text"
          id="birthday-textfield"
          label="Date of Birth"
          :value="form.birthday"
          :error-messages="birthdayErrors"
          required
        />
      </div>

      <slot />
    </form>
  </div>
</template>

<script>
  import { required, helpers } from 'vuelidate/lib/validators';
  import { getAge } from '@/utils';
  import TextField from '@/components/base/TextField';

  export default {
    components: { TextField },
    validations: {
      form: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        birthday: {
          required,
          dateOfBirth(value) {
            const format = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            return !helpers.req(value) || format.test(value);
          },
          ageLimit(value) {
            return !helpers.req(value) || getAge(value) >= 15;
          },
        },
      }
    },
    computed: {
      firstNameErrors() {
        const errors = [];

        if (!this.$v.form.firstName.$dirty) {
          return errors;
        }
        if (!this.$v.form.firstName.required) {
          errors.push('First Name is required');
        }

        return errors;
      },
      lastNameErrors() {
        const errors = [];

        if (!this.$v.form.lastName.$dirty) {
          return errors;
        }
        if (!this.$v.form.lastName.required) {
          errors.push('Last Name is required');
        }

        return errors;
      },
      birthdayErrors() {
        const errors = [];

        if (!this.$v.form.birthday.$dirty) {
          return errors;
        }
        if (!this.$v.form.birthday.required) {
          errors.push('Date of Birth is required');
        }
        if (!this.$v.form.birthday.dateOfBirth) {
          errors.push('Date of Birth format is invalid (MM/DD/YYYY)');
        }
        if (!this.$v.form.birthday.ageLimit) {
          errors.push('You must be 15 years or older');
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
