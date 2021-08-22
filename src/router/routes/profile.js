export default [
  {
    path: '/profile',
    name: 'profile-details',
    meta: {
      loadState: true,
      requiresProfile: true,
    },
    component: () => import(/* webpackChunkName: "profile-details" */ '../../views/Profile'),
  },
];
