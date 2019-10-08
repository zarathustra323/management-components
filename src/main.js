import Vue from 'vue';
import VueApollo from 'vue-apollo';
import apolloProvider from './apollo/provider';
import App from './app.vue';

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app');
