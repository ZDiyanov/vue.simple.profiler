<template>
  <div>
    <form @submit.prevent="onSubmit" novalidate>
      <text-field
        v-model="form.firstName"
        type="text"
        id="first-name-textfield"
        label="First Name"
        :value="form.firstName"
        :error-messages="firstNameErrors"
        required
      />

      <text-field
        v-model="form.lastName"
        type="text"
        id="last-name-textfield"
        label="Last Name"
        :value="form.lastName"
        :error-messages="lastNameErrors"
        required
      />

      <slot />
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
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
