import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import { configure, getApolloProvider } from './config';

Vue.use(VueApollo);
Vue.config.productionTip = false;

configure({
  graphqlUri: 'http://0.0.0.0:11001',
  tenantKey: 'acbm_fcp',
  apiHost: 'manage.forconstructionpros.com',
});

new Vue({
  render: h => h(App),
  apolloProvider: getApolloProvider(),
}).$mount('#app');
