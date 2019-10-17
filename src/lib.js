/* eslint-disable no-new */
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import './styles';

import {
  configure,
  getApolloProvider,
  getConfig,
  hasConfigured,
} from './config';
import { version } from '../package.json';

Vue.use(VueApollo);

const components = {
  scheduling: () => import(/* webpackChunkName: "scheduling" */ './components/scheduling/index.vue'),
};

const loadComponent = async ({
  el,
  name,
  props,
  on,
} = {}) => {
  if (!hasConfigured()) throw new Error('BaseCMS Management Components have not been configured. Run `bmc.configure()` before loading components.');
  if (!components[name]) throw new Error(`No BaseCMS Management Component found for '${name}'`);
  const { default: Component } = await components[name]();
  return new Vue({
    el,
    apolloProvider: getApolloProvider(),
    render: h => h(Component, { props, on }),
  });
};

const info = () => ({ version, config: getConfig(), components: Object.keys(components) });

export default {
  configure,
  loadComponent,
  info,
};
