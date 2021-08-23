export default {
  logger: {
    user: {
      id: null,
      personal: {
        firstName: '',
        middleName: '',
        lastName: '',
        birthday: '',
      },
      contact: {
        phone: '',
        country: '',
        postCode: '',
        address: '',
      },
      hobbies: [],
    },
    redirects: {
      index: '/',
      profileNotSet: '/create',
      profileSet: '/profile',
    }
  },
  persistentData: {
    users: [],
  },
};
