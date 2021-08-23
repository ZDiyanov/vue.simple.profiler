<template>
  <div>
    <p>CreateUser</p>

    <component
      :is="stepComponent"
      :form="stepSubject"
      @validate-step="checkStepStatus"
    >
      <a
        v-if="stepCounter"
        href="#"
        @click.prevent="modifyStepCount()"
      >
        Back to previous step
      </a>

      <button>Validate</button>
    </component>
  </div>
</template>

<script>
  import uid from 'uid';
  import PersonalInfoForm from '@/components/forms/PersonalInfo';
  import ContactInfoForm from '@/components/forms/ContactInfo';
  import HobbyListForm from '@/components/forms/HobbyList';

  export default {
    components: {
      PersonalInfoForm,
      ContactInfoForm,
      HobbyListForm,
    },
    data() {
      return {
        user: {
          id: uid(),
          personal: {
            firstName: '',
            middleName: '',
            lastName: '',
            birthday: '',
          },
          contact: {
            country: '',
            postCode: '',
            address: '',
            phone: '',
          },
          hobbies: [],
        },
        stepCounter: 0,
      };
    },
    computed: {
      stepComponent() {
        switch (this.stepCounter) {
          case 0:
            return PersonalInfoForm;
          case 1:
            return ContactInfoForm;
          case 2:
            return HobbyListForm;
          default:
            return PersonalInfoForm;
        }
      },
      stepSubject() {
        switch (this.stepCounter) {
          case 0:
            return this.user.personal;
          case 1:
            return this.user.contact;
          case 2:
            return this.user.hobbies;
          default:
            return this.user.personal;
        }
      },
    },
    methods: {
      checkStepStatus({ isValid }) {
        if (isValid) {
          if (this.stepCounter === 2) {
            this.setUserProfile();
            return false;
          }

          this.modifyStepCount(isValid);
        }
      },
      modifyStepCount(increment) {
        if (increment) {
          this.stepCounter += 1;
        } else {
          this.stepCounter -= 1;
        }
      },
      setUserProfile() {
        return this.$store.dispatch('logger/setUserProfile', { user: this.user, persist: true })
          .catch((err) => err);
      },
    },
    metaInfo() {
      return {
        title: 'Create User'
      };
    },
  };
</script>
