import Vue from 'vue';
import Router from 'vue-router';
import multiguard from 'vue-router-multiguard';
// eslint-disable-next-line import/no-cycle
import {
  redirectProfileNotSet,
  redirectProfileSet,
  redirectFromIndex
} from './traps';
import home from './routes/home';
import notFound from './routes/notFound';
import create from './routes/create';
import profile from './routes/profile';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  saveScrollPosition: true,
  routes: [
    ...home,
    ...notFound,
    ...create,
    ...profile,
  ],
});

// configure traps
router.beforeEach(multiguard([
  redirectProfileNotSet,
  redirectProfileSet,
  redirectFromIndex,
]));

export default router;
