export default [
  {
    path: '/',
    name: 'home',
    meta: {
      loadState: true,
      requiresProfile: false,
    },
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/Home'),
  },
];
