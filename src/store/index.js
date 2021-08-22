import Vue from 'vue';
import Vuex from 'vuex';
import initialState from '@/store/initialState';
import persistentStore from '@/store/persistentStore';
// eslint-disable-next-line import/no-cycle
import logger from '@/store/modules/logger';
import persistentData from '@/store/modules/persistentData';

Vue.use(Vuex);

const options = {
  plugins: [persistentStore.plugin],
  modules: {
    logger: logger(initialState.logger),
    persistentData: persistentData(initialState.persistentData),
  }
};

/**
 * @description Reset stores
 * @param store
 */
export const resetStores = (store) => {
  store.dispatch('logger/reset');
  store.dispatch('persistentData/reset');
};

export default new Vuex.Store(options);
