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

    <div class="list">
      <div :class="['list__item', counterColoring]">
        {{hasHobbies ? `Your hobbies: ${hobbyCount}` : 'You have no hobbies, you should find some ;)' }}
      </div>
      <template v-if="hasHobbies">
        <div
          v-for="(item, index) in form"
          :key="index"
          class="list__item"
        >
          {{ item }}
          <a
            href="#"
            @click.prevent="removeHobby(item)"
            class="list__remove"
          >
            Remove
          </a>
        </div>
      </template>
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
      hobbyCount() {
        return this.form.length;
      },
      counterColoring() {
        const { hobbyCount } = this;
        const prefix = 'list__counter--stage-';
        let colorClass;

        if (hobbyCount === 0) colorClass = `${prefix}1`;
        if (hobbyCount >= 1) colorClass = `${prefix}2`;
        if (hobbyCount >= 5) colorClass = `${prefix}3`;
        if (hobbyCount >= 10) colorClass = `${prefix}4`;

        return colorClass;
      }
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
        this.$nextTick(() => { this.$v.hobby.$reset(); });
      },
      removeHobby(item) {
        const index = this.form.indexOf(item);

        if (index > -1) {
          this.form.splice(index, 1);
        }
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
