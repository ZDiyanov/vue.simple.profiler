<template>
  <div class="display__content">
    <div class="title">
      <p class="title__main">Create Profile</p>
      <span class="title__lead">Let's add some information</span>
    </div>

    <component
      :is="stepComponent"
      :form="stepSubject"
      @validate-step="checkStepStatus"
    >
      <div class="control-bar">
        <button class="control-bar__button">{{ isLastStep ? 'Create Profile' : 'Next Step' }}</button>

        <div>
          <a
            v-if="stepCounter"
            href="#"
            class="control-bar__link"
            @click.prevent="modifyStepCount()"
          >
            Back to previous step
          </a>
          <router-link
            v-else
            to="/"
            class="control-bar__link"
          >
            Back to home
          </router-link>
        </div>
      </div>
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
      isLastStep() {
        return this.stepCounter === 2;
      }
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
