<template>
  <div class="form">
    <div class="form__row">
      <text-field
        v-model="hobby"
        type="text"
        id="first-name-textfield"
        label="Hobby"
        :value="hobby"
        :error-messages="hobbyErrors"
      />
    </div>

    <div class="form__row">
      <a href="#" @click.prevent="addHobby()">Add hobby</a>
    </div>

    <form @submit.prevent="onSubmit" novalidate>
      <input type="hidden" v-model="form">
      <slot />
      <div class="form__row">
        <span v-if="hobbyListErrors">{{ hobbyListErrors[0] }}</span>
      </div>
    </form>

    <div v-if="hasHobbies">
      <p>Hobbies:</p>
      <ul>
        <li
          v-for="(item, index) in form"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators';
  import { isNonEmptyArr } from '@/utils';
  import TextField from '@/components/base/TextField';

  export default {
    components: { TextField },
    validations: {
      hobby: {
        required,
        minLength: minLength(3),
      },
      form: {
        required,
        minLength: minLength(1),
      }
    },
    computed: {
      hobbyErrors() {
        const errors = [];

        if (!this.$v.hobby.$dirty) {
          return errors;
        }
        if (!this.$v.hobby.required) {
          errors.push('The hobby field is empty');
        }
        if (!this.$v.hobby.minLength) {
          errors.push('The hobby must be atleast 3 simbols');
        }

        return errors;
      },
      hobbyListErrors() {
        const errors = [];

        if (!this.$v.form.$dirty) {
          return errors;
        }
        if (!this.$v.form.required) {
          errors.push('You must have atleast 1 hobby');
        }

        return errors;
      },
      hasHobbies() {
        return isNonEmptyArr(this.form);
      },
    },
    props: {
      form: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        hobby: '',
        entries: [],
        isValid: null,
      };
    },
    methods: {
      addHobby() {
        this.$v.hobby.$touch();

        if (this.$v.hobby.$invalid) {
          return false;
        }

        this.form.push(this.hobby);
        this.hobby = '';
      },
      onSubmit() {
        this.$v.form.$touch();

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
