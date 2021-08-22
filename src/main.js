import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';

import '@/plugins/meta';
import '@/plugins/vuelidate';

import '@/styles/app.scss';

// customize config
Vue.config.productionTip = false;

// instantiate app
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
