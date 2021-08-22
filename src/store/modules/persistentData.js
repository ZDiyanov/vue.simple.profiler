import initialState from '@/store/initialState';
import { isArr, isObj } from '@/utils';

/**
 * @description Is valid
 * @param config
 * @returns {boolean}
 */
const isValid = (persistentData) => isObj(persistentData)
  && isArr(persistentData.users);

/**
 * @description Init state
 * @param initialState
 * @returns {*}
 */
const initState = initialState => {
  if (!isValid(initialState)) {
    throw Error('Invalid initial persistent data state');
  }

  const { users } = initialState;

  return { users };
};

/**
 * @description Getters
 * @type {*}
 */
export const getters = {
  users: ({ users }) => users,
};

const actions = {
  storeProfile: ({ state, commit }, user) => {
    const nextUsers = [
      ...state.users,
      user,
    ];

    const nextPersistentData = {
      ...state,
      users: nextUsers,
    };

    return commit('SET', nextPersistentData);
  },
  reset: ({ commit }) => (
    commit('SET', initialState.persistentData)
  ),
  set: ({ commit }, persistentData) => {
    commit('SET', persistentData);
  }
};

const mutations = {
  SET(state, persistentData) {
    /* eslint-disable no-param-reassign */
    state.users = persistentData.users;
  }
};

export default initialState => ({
  namespaced: true,
  state: initState(initialState),
  getters,
  actions,
  mutations,
});
