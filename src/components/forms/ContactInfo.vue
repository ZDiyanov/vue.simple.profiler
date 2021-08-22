<template>
  <div>
    <form @submit.prevent="onSubmit" novalidate>
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
  import { required } from 'vuelidate/lib/validators';
  import TextField from '@/components/base/TextField';

  export default {
    components: { TextField },
    validations: {
      form: {
        address: {
          required,
        },
      }
    },
    computed: {
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
