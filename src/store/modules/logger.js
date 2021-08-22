// eslint-disable-next-line import/no-cycle
import router from '@/router';
// eslint-disable-next-line import/no-cycle
import store, { resetStores } from '@/store';
import initialState from '@/store/initialState';
import { isObj } from '@/utils';

/**
 * @description Is valid
 * @param logger
 * @returns {boolean}
 */
const isValid = (logger) => isObj(logger)
  && isObj(logger.user)
  && isObj(logger.redirects);

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial logger state');
  }

  const { user, redirects } = initialState;

  return {
    user,
    redirects,
  };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  user: ({ user }) => user,
  redirects: ({ redirects }) => redirects,
  isProfileSet: ({ user }) => user.id,
};

const actions = {
  setUserProfile: ({ state, commit }, data) => {
    const { user, persist = false } = data;
    const { id, name, contact, hobbies } = user;

    const nextUser = {
      id,
      name,
      contact,
      hobbies,
    };

    const nextLogger = {
      ...state,
      user: nextUser,
    };

    if (persist) {
      store.dispatch('persistentData/storeProfile', nextUser)
        .catch((err) => err);
    }

    commit('SET', nextLogger);

    return router.replace({ name: 'profile' });
  },
  logout: () => {
    store.dispatch('logger/reset');

    return router.replace({ name: 'home' });
  },
  reset: ({ commit }) => (
    commit('SET', initialState.logger)
  ),
  resetAll: () => resetStores(store),
  set: ({ commit }, logger) => {
    commit('SET', logger);
  }
};

const mutations = {
  SET(state, logger) {
    /* eslint-disable no-param-reassign */
    state.user = logger.user;
    state.redirects = logger.redirects;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
