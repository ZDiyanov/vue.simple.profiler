export default [
  {
    path: '*',
    meta: {
      loadState: true,
      requiresProfile: false,
    },
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound'),
  }
];
