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
        phone: null,
        country: '',
        postalCode: null,
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
