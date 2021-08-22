export default {
  logger: {
    user: {
      id: null,
      name: {
        first: '',
        middle: '',
        last: '',
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
