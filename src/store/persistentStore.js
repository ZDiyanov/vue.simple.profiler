import VuexPersistence from 'vuex-persist';
import initialState from '@/store/initialState';

const { localStorage } = window;

export default new VuexPersistence({
  storage: localStorage,
  key: 'modis_profile_app',
  reducer: (state) => ({
    ...state,
    logger: {
      ...initialState.logger,
      user: {
        ...initialState.logger.user,
        id: state.logger.user.id,
        personal: state.logger.user.personal,
        contact: state.logger.user.contact,
        hobbies: state.logger.user.hobbies,
      },
    },
    persistentData: {
      ...initialState.persistentData,
      users: state.persistentData.users,
    },
  }),
});
