// eslint-disable-next-line import/no-cycle
import store from '@/store';
// eslint-disable-next-line import/no-cycle
import router from '.';

/**
 * @description Is matching
 * @param path
 * @param urlParts
 * @returns {boolean}
 */
 const isMatching = (path, ...urlParts) => {
  let hasMatch = false;

  urlParts.forEach(urlPart => {
    if (hasMatch) {
      return false;
    }

    hasMatch = path.indexOf(urlPart) > -1;
  });

  return hasMatch;
};

/**
 * @description Requires profile
 * @param to
 * @returns {boolean}
 */
const requiresProfile = (to) => to.matched.some(record => record.meta.requiresProfile);

/**
 * @description Is create profile route
 * @param path
 * @returns {boolean}
 */
 const isCreateRoute = (path) => isMatching(path, 'create');

/**
 * @description Is profile set
 * @returns {*}
 */
const isProfileSet = () => store.getters['logger/isProfileSet'];

/**
 * @description Get redirects
 * @returns {*}
 */
const getRedirects = () => router.app.$store.getters['logger/redirects'];

/**
 * @description Redirect when profile is not set
 * @param to
 * @param from
 * @param next
 */
export const redirectProfileNotSet = (to, from, next) => {
  const { profileNotSet } = getRedirects();

  if (requiresProfile(to) && !isProfileSet()) {
    return next(profileNotSet);
  }

  next();
};

/**
 * @description Redirect when profile is set
 * @param to
 * @param from
 * @param next
 */
export const redirectProfileSet = (to, from, next) => {
  const { profileSet } = getRedirects();

  if (isCreateRoute(to.path) && isProfileSet()) {
    return next(profileSet);
  }

  next();
};

/**
 * @description Redirect from index
 * @param to
 * @param from
 * @param next
 */
export const redirectFromIndex = (to, from, next) => {
  const { index, profileSet } = getRedirects();

  if (to.path === index && isProfileSet()) {
    return next(profileSet);
  }

  next();
};
