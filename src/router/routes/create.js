export default [
  {
    path: '/create',
    name: 'create-user',
    meta: {
      loadState: true,
      requiresProfile: false,
    },
    component: () => import(/* webpackChunkName: "create-user" */ '@/views/CreateUser'),
  },
];
